SELECT * FROM chat_rooms WHERE user_id = $1 OR admin_id = $1
INSERT INTO chat_rooms
(admin_id, user_id, chat_room_name)
VALUES
($1, $2, ${1}-${2})