SELECT DISTINCT
	s.id AS id,
    COALESCE(si1.lang_id, si2.lang_id) AS lang_id,
    COALESCE(si1.name, si2.name) AS name,
    l.code AS code
FROM scholars AS s
LEFT JOIN scholar_basic_info AS si1 ON s.id = si1.scholar_id AND si1.lang_id = ?
LEFT JOIN scholar_basic_info AS si2 ON s.id = si2.scholar_id
JOIN languages AS l ON COALESCE(si1.lang_id, si2.lang_id) = l.id
WHERE s.id = ?
