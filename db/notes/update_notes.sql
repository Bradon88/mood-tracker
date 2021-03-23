UPDATE notes
SET notes_content = $1
WHERE notes_id = $2
RETURNING *
ORDER BY notes_id;


