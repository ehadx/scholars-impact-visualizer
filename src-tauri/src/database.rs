use directories::UserDirs;
use sqlx::{migrate::MigrateDatabase, query, Pool, Sqlite, SqlitePool};

use crate::error::Error;

pub async fn create_database() -> Result<Pool<Sqlite>, Error> {
    let documents = UserDirs::new()
        .expect("Cannot construct a UserDirs instance")
        .document_dir()
        .expect("Cannot find documents directory on this system")
        .to_owned();
    let url = "sqlite://".to_string() + documents.to_str().unwrap() + "/scholars.db";
    let mut new_database = false;

    if !Sqlite::database_exists(&url).await.unwrap_or(false) {
        Sqlite::create_database(&url).await?;
        new_database = true;
    }
    let pool = SqlitePool::connect(&url).await?;

    if new_database {
        let mut tx = pool.begin().await?;
        query(include_str!("../queries/countries/countries.sql"))
            .execute(&mut tx)
            .await?;

        query(include_str!("../queries/countries/insert_default.sql"))
            .execute(&mut tx)
            .await?;

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
