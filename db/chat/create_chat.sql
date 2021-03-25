INSERT INTO chat 
( member_id, team_id, date, chat_content )
VALUES 
($1, $2, $3, $4)
RETURNING *;