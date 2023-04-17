use serde::{Deserialize, Serialize};
use sqlx::{query, sqlite::SqliteRow, Row};
use tauri::{command, State};

use crate::{languages::Language, AppState, Error};

#[derive(Serialize, Deserialize)]
pub struct Major {
    id: i64,
    lang: Language,
    title: String,
}

#[command]
pub async fn find_all_majors(
    state: State<AppState, '_>,
    lang_id: u32,
) -> Result<Vec<Major>, Error> {
    let majors = query(include_str!("../queries/majors/find_all.sql"))
        .bind(lang_id)
        .map(|r: SqliteRow| Major {
            id: r.try_get::<i64, _>("id").unwrap(),
            title: r.try_get::<String, _>("title").unwrap(),
            lang: Language {
                id: r.try_get::<i64, _>("lang_id").unwrap(),
                code: r.try_get::<String, _>("code").unwrap(),
            },
        })
        .fetch_all(&state.pool)
        .await?;

    Ok(majors)
}
