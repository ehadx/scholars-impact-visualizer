// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use sqlx::{migrate::MigrateDatabase, query, Pool, Sqlite, SqlitePool};
use tauri::{async_runtime, generate_handler, Builder};
use tokio::{main, runtime::Handle};

use crate::{
    error::Error,
    languages::find_all_languages,
    majors::find_all_majors,
    scholars::{create_scholar, create_scholar_multi_lang, find_all_scholars},
};

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
            find_all_languages
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}

async fn create_database() -> Result<Pool<Sqlite>, Error> {
    let documents = directories::UserDirs::new()
        .expect("Cannot construct a UserDirs instance")
        .document_dir()
        .expect("Cannot find documents directory on this system")
        .to_owned();
    let url = "sqlite://".to_string() + documents.to_str().unwrap() + "/scholars.db";
    println!("{}", url);
    let mut new_database = false;
    if !Sqlite::database_exists(&url).await.unwrap_or(false) {
        Sqlite::create_database(&url).await?;
        new_database = true;
    }
    let pool = SqlitePool::connect(&url).await?;

    if new_database {
        let mut tx = pool.begin().await?;
        query(include_str!("../queries/database.sql"))
            .execute(&mut tx)
            .await?;

        query(include_str!("../queries/languages/insert_default.sql"))
            .execute(&mut tx)
            .await?;
        tx.commit().await?;
    }

    Ok(pool)
}
