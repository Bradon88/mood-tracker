SELECT *
FROM chat
WHERE user_id = $1
AND admin_id =$2;