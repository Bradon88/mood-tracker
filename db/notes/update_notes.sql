UPDATE notes
SET notes_content = $2,
WHERE user_id = $1;

SELECT n.notes_id, n.notes_content, d.date
FROM notes 
ORDER BY notes_id