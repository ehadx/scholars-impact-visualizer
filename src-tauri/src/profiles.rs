use serde::{Deserialize, Serialize};

use crate::{languages::Language, majors::Major};

#[derive(Serialize, Deserialize)]
pub struct Profile {
    id: i64,
    lang: Language,
    mojor_reference: String,
    geographic_location: String,
    sync_nation: String,
    additional_info: String,
    majors: Vec<Major>,
}

#[derive(Serialize, Deserialize)]
struct ProfileAssociation {
    profile: Profile,
    accuracy: u8,
}
