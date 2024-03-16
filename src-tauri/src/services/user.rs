use tauri::{
    plugin::{
        Builder, 
        TauriPlugin
    },
    Runtime,
};

use windows::{
    core::{
        Error as WindowsError, 
        PWSTR
    },
    Win32::System::WindowsProgramming::GetUserNameW,
};

pub unsafe fn get_user_name() -> Result<String, WindowsError>{
    let mut buffer = vec![0u16; 260];
    let mut buffer_size = buffer.len() as u32;
    GetUserNameW(PWSTR(buffer.as_mut_ptr()), &mut buffer_size as *mut u32)?;
    buffer.resize((buffer_size as usize) - 1, 0);
    let user_name = String::from_utf16_lossy(&buffer);
    log::info!("User: {}", user_name);
    return Ok(user_name)
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("user")
        .build()
}