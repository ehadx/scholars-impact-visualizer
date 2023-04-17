SELECT DISTINCT
	majors.id AS id,
    COALESCE(mi1.lang_id, mi2.lang_id) AS lang_id,
    COALESCE(mi1.title, mi2.title) AS title,
    l.code AS code
FROM majors
LEFT JOIN major_info AS mi1 ON majors.id = mi1.major_id AND mi1.lang_id = ?
LEFT JOIN major_info AS mi2 ON majors.id = mi2.major_id
JOIN languages AS l ON COALESCE(mi1.lang_id, mi2.lang_id) = l.id
