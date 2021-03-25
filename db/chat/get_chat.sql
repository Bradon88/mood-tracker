SELECT * FROM chat c
JOIN users u
ON c.member_id = u.user_id
WHERE c.team_id = $1