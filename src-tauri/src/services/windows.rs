use std::time::Duration;
use sqlx::SqlitePool;
use tokio::time::interval;
use crate::{database::sqlite_connector::{application_exists, application_window_exists, create_application, create_application_window, create_usage_logs, select_application_by_executable_name, select_application_window_by_window_name, select_usage_log_by_window_id, select_user_by_name, update_usage_logs_time, usage_logs_exists}, types::{constants::MONITOR_INTERVAL, enums::SerializedError}};

use tauri::{
    plugin::{
        Builder, 
        TauriPlugin
    },
    Runtime,
};

use windows::{
    core::Error as WindowsError,
    Win32::{
        Foundation::{
            CloseHandle, 
            HWND
        }, 
        System::ProcessStatus::GetModuleFileNameExW, 
        System::Threading::{
            OpenProcess, 
            PROCESS_QUERY_INFORMATION, 
            PROCESS_VM_READ
        }, UI::WindowsAndMessaging::{
            GetForegroundWindow, 
            GetWindowTextW, 
            GetWindowThreadProcessId
        }
    }
};

unsafe fn get_window_executable_name_with_process_id(process_id:u32) -> Result<String, WindowsError>{
    let process_handle = OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, false, process_id)?;
    let mut buffer = vec![0u16; 260];
    let executable_name_buffer_size = GetModuleFileNameExW(process_handle, None, &mut buffer);
    let _ = CloseHandle(process_handle);
    buffer.truncate(executable_name_buffer_size as usize);
    let window_executable_name = String::from_utf16_lossy(&buffer)
        .split('\\')
        .last()
        .map(|s| s.to_string());
    log::info!("Executable: {}", window_executable_name.clone().unwrap());
    match window_executable_name {
        Some(window_executable_name) => {return  Ok(window_executable_name);}
        None => {return Ok(String::new());}
    }
}

unsafe fn get_foreground_window_name_with_handle(window_handle: HWND) -> Result<String, WindowsError>{
    let mut buffer = vec![0u16; 260];
    let window_name_buffer_size = GetWindowTextW(window_handle, &mut buffer);
    buffer.truncate(window_name_buffer_size as usize);
    let window_name = String::from_utf16_lossy(&buffer);
    log::info!("Window: {}", window_name.clone());
    return Ok(window_name);
}

async unsafe fn track_windows(pool: &SqlitePool, application_id: &mut Option<i64>, window_id: &mut Option<i64>) -> Result<(), SerializedError>{
    let window_handle = GetForegroundWindow();
    let mut process_id = 0;
    GetWindowThreadProcessId(window_handle.clone(), Some(&mut process_id));
    let window_executable_name = get_window_executable_name_with_process_id(process_id)?;
    if !application_exists(pool, &window_executable_name).await? {
        *application_id = Some(create_application(pool, &window_executable_name).await?);
    } else {
        *application_id = Some(select_application_by_executable_name(pool, &window_executable_name).await?.application_id);
    }
    let window_name = get_foreground_window_name_with_handle(window_handle.clone())?;
    if !application_window_exists(pool, application_id.clone(), &window_name).await? {
        *window_id = Some(create_application_window(pool, application_id.clone(), &window_name).await?);
    } else {
        *window_id = Some(select_application_window_by_window_name(pool, &window_name).await?.window_id);
    }
    return Ok(());
}

async fn manage_usage_logs(pool: &SqlitePool, user_name: &str, window_id: Option<i64>) -> Result<(), SerializedError> {
    let user = select_user_by_name(pool, user_name).await?;
    if let Some(id) = window_id {
        if usage_logs_exists(pool, id).await? {
            if let Ok(usage_log) = select_usage_log_by_window_id(pool, id).await {
                update_usage_logs_time(pool, usage_log.log_id, MONITOR_INTERVAL as i64).await?;
            }
        } else {
            create_usage_logs(pool, user.user_id, id).await?;
        }

    }
    return Ok(());
}

pub async fn start_tracker(pool: SqlitePool, user_name: String) {
    let mut interval = interval(Duration::from_secs(MONITOR_INTERVAL));
    loop {
        interval.tick().await;
        let mut application_id:Option<i64> = None;
        let mut window_id:Option<i64> = None;
        unsafe {
            if let Err(err) = track_windows(&pool, &mut application_id, &mut window_id).await {
                 log::error!("{}", err);
            }
        }
        log::info!("{}", application_id.unwrap_or(0));
        log::info!("{}", window_id.unwrap_or(0));
        if let Err(err) = manage_usage_logs(&pool, &user_name, window_id).await {
            log::error!("{}", err);
        };
    }
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("windows")
        .build()
}