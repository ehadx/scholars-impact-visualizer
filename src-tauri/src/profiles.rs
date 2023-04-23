use serde::{Deserialize, Serialize};

use crate::{countries::Country, languages::Language, majors::Major};

#[derive(Serialize, Deserialize)]
pub struct Profile {
    id: i64,
    lang: Language,
    mojor_reference: String,
    countries: Vec<Country>,
    sync_nation: String,
    additional_info: String,
    majors: Vec<Major>,
}

#[derive(Serialize, Deserialize)]
struct ProfileAssociation {
    profile: Profile,
    accuracy: u8,
}
