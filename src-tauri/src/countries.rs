use serde::{Deserialize, Serialize};
use sqlx::{query_as, FromRow};
use tauri::{command, State};

use crate::{error::Error, AppState};

#[derive(Serialize, Deserialize, FromRow)]
#[serde(rename_all = "camelCase")]
pub struct Country {
    id: i64,
    alpha_2: String,
    alpha_3: String,
    ar: String,
    en: String,
}

#[command]
pub async fn find_all_countries(state: State<AppState, '_>) -> Result<Vec<Country>, Error> {
    let countries = query_as::<_, Country>(include_str!("../queries/countries/find_all.sql"))
        .fetch_all(&state.pool)
        .await?;
    Ok(countries)
}
