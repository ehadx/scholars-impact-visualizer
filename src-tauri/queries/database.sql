CREATE TABLE IF NOT EXISTS languages (
    id INTEGER PRIMARY KEY,
    code TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS scholars (
    id INTEGER PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS scholar_pupils_map (
    id INTEGER PRIMARY KEY,
    mentor_id INTEGER,
    pupil_id INTEGER,
    FOREIGN KEY(mentor_id) REFERENCES scholars(id),
    FOREIGN KEY(pupil_id) REFERENCES scholars(id)
);

CREATE TABLE IF NOT EXISTS scholar_basic_info (
    id INTEGER PRIMARY KEY,
    scholar_id INTEGER,
    lang_id INTEGER,
    name TEXT,
    FOREIGN KEY(scholar_id) REFERENCES scholars(id),
    FOREIGN KEY(lang_id) REFERENCES languages(id)
);

CREATE TABLE IF NOT EXISTS scholar_profiles (
    id INTEGER PRIMARY KEY,
    lang_id INTEGER,
    additional_info TEXT,
    sync_nation TEXT
);

CREATE TABLE IF NOT EXISTS scholar_profile_country_map (
    id INTEGER PRIMARY KEY,
    profile_id INTEGER,
    country_id INTEGER,
    FOREIGN KEY(profile_id) REFERENCES scholar_profiles(id),
    FOREIGN KEY(country_id) REFERENCES countries(id)
);

CREATE TABLE IF NOT EXISTS country_notes (
    id INTEGER PRIMARY KEY,
    profile_country_map_id INTEGER,
    lang_id INTEGER,
    note TEXT,
    FOREIGN KEY (profile_country_map_id) REFERENCES scholar_profile_country_map(id),
    FOREIGN KEY (lang_id) REFERENCES languages(id)
);

CREATE TABLE IF NOT EXISTS scholar_date (
    id INTEGER PRIMARY KEY,
    scholar_profile_id INTEGER,
    day INTEGER,
    month INTEGER,
    year INTEGER NOT NULL,
    era TEXT NOT NULL,
    date_type TEXT NOT NULL,
    accuracy INTEGER,
    FOREIGN KEY(scholar_profile_id) references scholar_profiles(id)
);

CREATE TABLE IF NOT EXISTS majors (
    id INTEGER PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS major_info (
    id INTEGER PRIMARY KEY,
    major_id INTEGER,
    lang_id INTEGER,
    reference TEXT,
    title TEXT,
    FOREIGN KEY(major_id) REFERENCES majors(id),
    FOREIGN KEY(lang_id) REFERENCES languages(id)
);

CREATE TABLE IF NOT EXISTS scholar_profile_majors_map (
    id INTEGER PRIMARY KEY,
    major_id INTEGER,
    profile_id INTEGER,
    FOREIGN KEY (major_id) REFERENCES majors(id),
    FOREIGN KEY (profile_id) REFERENCES scholar_profiles(id)
);

CREATE TABLE IF NOT EXISTS scholar_profiles_map (
    id INTEGER PRIMARY KEY,
    scholar_id INTEGER,
    profile_id INTEGER,
    accuracy INTEGER,
    FOREIGN KEY (scholar_id) REFERENCES scholars(id),
    FOREIGN KEY (profile_id) REFERENCES scholar_profiles(id)
);
