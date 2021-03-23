DELETE FROM notes 
WHERE notes_id = $1
RETURNING *;
-- ORDER BY notes_id;