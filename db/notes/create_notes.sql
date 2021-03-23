INSERT INTO notes (user_id, team_id, date, notes_content)
VALUES ($1, $2, $3, $4)
RETURNING *;