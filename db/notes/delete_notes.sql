DELETE FROM notes 
WHERE notes_id = $1;
SELECT * FROM notes;
-- ORDER BY notes_id;