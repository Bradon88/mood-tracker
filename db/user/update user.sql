UPDATE users
SET 
first_name = $2,
last_name = $3,
email = $4,
password = $5,
picture = $6,
is_admin = $7
WHERE user_id = $1;
