DELETE FROM team
WHERE admin_id = $1
RETURNING *;