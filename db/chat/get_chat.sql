SELECT * FROM chat c
JOIN users u
ON c.member_id = u.user_id
WHERE c.member_id = $1