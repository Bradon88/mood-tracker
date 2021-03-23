DELETE FROM notes 
WHERE notes_id = $1

SELECT n.notes_id, n.notes_content, d.date
FROM notes 
ORDER BY notes_id