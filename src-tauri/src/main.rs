// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use sqlx::{Pool, Sqlite};
use tauri::{async_runtime, generate_handler, Builder};
use tokio::{main, runtime::Handle};

use crate::{
    countries::find_all_countries,
    database::create_database,
    error::Error,
    languages::find_all_languages,
    majors::find_all_majors,
    scholars::{create_scholar, create_scholar_multi_lang, find_all_scholars},
};

mod countries;
mod database;
mod error;
mod languages;
mod majors;
mod profiles;
mod scholars;

pub struct AppState {
    pool: Pool<Sqlite>,
}

#[main]
async fn main() -> Result<(), Error> {
    async_runtime::set(Handle::current());
    let pool = create_database().await?;
    Builder::default()
        .manage(AppState { pool })
        .invoke_handler(generate_handler![
            find_all_scholars,
            create_scholar,
            create_scholar_multi_lang,
            find_all_majors,
            find_all_languages,
            find_all_countries,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
