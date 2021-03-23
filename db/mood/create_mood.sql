INSERT INTO mood 
(user_id, team_id, mood, date, current_activity, activity_notes)
VALUES 
($1, $2, $3, $4, $5, $6)
RETURNING *;
