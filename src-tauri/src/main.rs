// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Mutex;

use tauri::{
  App, CustomMenuItem, Manager, State, SystemTray, SystemTrayMenu, SystemTrayMenuItem
};

use crate::{database::sqlite_connector::{create_user, initialize_sqlite_database, user_exists}, services::{user::get_user_name, windows::start_tracker}, types::structs::SqlitePoolConnection};

mod database;
mod services;
mod types;

fn initialize_logging() -> Result<(), fern::InitError> {
  fern::Dispatch::new()
    .format(move |out, message, record| {
      out.finish(format_args!(
        "{}[{}][{}] - {}",
        chrono::Local::now().format("[%Y-%m-%d][%H:%M:%S]"),
        record.target(),
        record.level(),
        message
      ))
    })
    .chain(std::io::stdout())
    // .chain(fern::log_file("output.log")?)
    .level(log::LevelFilter::Info)
    .apply()?;
  Ok(())
}

fn initialize_system_tray() -> SystemTray {
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let hide = CustomMenuItem::new("hide".to_string(), "Hide");
  let tray_menu = SystemTrayMenu::new()
    .add_item(quit)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(hide);
  let system_tray = SystemTray::new().with_menu(tray_menu);
  return system_tray;
}

fn start_app(app_handler: &mut App) {
  let app_handle = app_handler.app_handle();
  tauri::async_runtime::spawn(async move {
    match initialize_sqlite_database().await {
      Ok(pool) => {
        log::info!("Database initalized");
        let pool_state: State<'_,SqlitePoolConnection> = app_handle.state();
        *pool_state.connection.lock().unwrap() = Some(pool.clone()); 
        unsafe {
          match get_user_name() {
            Ok(user_name) => {
              match user_exists(&pool, &user_name).await {
                Ok(user_exist) => {
                  if !user_exist {
                    if let Err(err) = create_user(&pool, &user_name).await {
                      log::error!("{}", err)
                    }
                  }
                  start_tracker(pool.clone(), user_name).await;
                }
                Err(err) => {log::error!("{}", err)}
              }
            }
            Err(err) => {log::error!("{}", err)}
          }
        }
      }
      Err(err) => {
        log::error!("Error Initializing Database: {}", err);
        // ????
        app_handle.exit(1);
      }
    }
  });
}

fn main() {
  if let Err(err) = initialize_logging() {
    eprintln!("Error initializing logger: {}", err);
  }
  let system_tray = initialize_system_tray();
  tauri::Builder::default()
    .manage(SqlitePoolConnection{connection: Mutex::new(None)})
    .plugin(database::sqlite_connector::init())
    .plugin(services::user::init())
    .plugin(services::windows::init())
    .system_tray(system_tray)
    .setup(|app_handler| {
      start_app(app_handler);
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
