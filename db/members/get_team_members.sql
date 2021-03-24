SELECT * FROM team_members t
JOIN users u 
ON t.member_id = u.user_id
WHERE t.team_id = $1