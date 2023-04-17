use serde::{Deserialize, Serialize};
use sqlx::{query, sqlite::SqliteRow, QueryBuilder, Row, Sqlite, SqliteExecutor};
use tauri::{command, State};

use crate::{languages::Language, AppState, Error};

#[derive(Serialize, Deserialize)]
pub struct Scholar {
    id: i64,
    lang: Language,
    name: String,
}

#[derive(Serialize, Deserialize)]
pub struct ScholarInfo {
    lang: Language,
    name: String,
}

#[derive(Serialize, Deserialize)]
pub struct ScholarDate {
    id: i64,
    day: Option<i64>,
    month: Option<i64>,
    year: i64,
    era: String,
    date_type: String,
}

#[command]
pub async fn find_all_scholars(
    state: State<AppState, '_>,
    lang_id: i64,
) -> Result<Vec<Scholar>, Error> {
    let scholars = query(include_str!("../queries/scholars/find_all.sql"))
        .bind(lang_id)
        .map(|r: SqliteRow| extract_scholar(r))
        .fetch_all(&state.pool)
        .await?;
    Ok(scholars)
}

#[command]
pub async fn create_scholar(
    state: State<AppState, '_>,
    scholar: Scholar,
    lang_id: i64,
) -> Result<Scholar, Error> {
    let mut tx = state.pool.begin().await?;
    let result = query(include_str!("../queries/scholars/create_one.sql"))
        .execute(&mut tx)
        .await?;
    let id = result.last_insert_rowid();

    let _ = query(include_str!("../queries/scholars/create_info.sql"))
        .bind(id)
        .bind(scholar.lang.id)
        .bind(scholar.name)
        .execute(&mut tx);

    let scholar = find_scholar_by_id(&mut tx, id, lang_id).await?.unwrap();
    tx.commit().await?;

    Ok(scholar)
}

#[command]
pub async fn create_scholar_multi_lang(
    state: State<AppState, '_>,
    info: Vec<ScholarInfo>,
    lang_id: i64,
) -> Result<Scholar, Error> {
    let mut tx = state.pool.begin().await?;
    let result = query(include_str!("../queries/scholars/create_one.sql"))
        .execute(&mut tx)
        .await?;
    let id = result.last_insert_rowid();

    let mut qb: QueryBuilder<Sqlite> =
        QueryBuilder::new("INSERT INTO scholar_basic_info (scholar_id, lang_id, name) ");
    qb.push_values(&info, |mut b, info| {
        b.push_bind(id)
            .push_bind(info.lang.id)
            .push_bind(&info.name);
    })
    .build()
    .execute(&mut tx)
    .await?;

    let scholar = find_scholar_by_id(&mut tx, id, lang_id).await?.unwrap();
    tx.commit().await?;
    Ok(scholar)
}

async fn find_scholar_by_id<'a>(
    ex: impl SqliteExecutor<'a>,
    id: i64,
    lang_id: i64,
) -> Result<Option<Scholar>, Error> {
    let scholar = query(include_str!("../queries/scholars/find_by_id.sql"))
        .bind(lang_id)
        .bind(id)
        .map(|r: SqliteRow| extract_scholar(r))
        .fetch_optional(ex)
        .await?;
    Ok(scholar)
}

fn extract_scholar(r: SqliteRow) -> Scholar {
    Scholar {
        id: r.try_get::<i64, _>("id").unwrap(),
        name: r.try_get::<String, _>("name").unwrap(),
        lang: Language {
            id: r.try_get("lang_id").unwrap(),
            code: r.try_get::<String, _>("code").unwrap(),
        },
    }
}
