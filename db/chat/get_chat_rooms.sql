SELECT cr.chat_room_name, 
u.first_name, 
u.last_name, 
admin.first_name as admin_first_name,
admin.last_name as admin_last_name
FROM chat_rooms cr
JOIN users u on cr.user_id = u.user_id
JOIN users  admin on cr.admin_id = admin.user_id
WHERE cr.user_id = $1 OR cr.admin_id = $1