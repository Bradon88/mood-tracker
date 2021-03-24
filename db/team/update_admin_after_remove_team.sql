UPDATE users
SET is_admin = false
WHERE user_id = $1;