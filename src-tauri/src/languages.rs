use serde::{Deserialize, Serialize};
use sqlx::{query_as, FromRow};
use tauri::{command, State};

use crate::{error::Error, AppState};

#[derive(Serialize, Deserialize, FromRow)]
pub struct Language {
    pub id: i64,
    pub code: String,
}

#[command]
pub async fn find_all_languages(state: State<AppState, '_>) -> Result<Vec<Language>, Error> {
    let languages = query_as::<_, Language>(include_str!("../queries/languages/find_all.sql"))
        .fetch_all(&state.pool)
        .await?;
    Ok(languages)
}
