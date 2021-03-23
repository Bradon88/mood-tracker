INSERT INTO chat 
(user_id, admin_id, date, chat_content)
VALUES 
($1, $2, $3, $4)
RETURNING *;