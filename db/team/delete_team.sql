DELETE FROM team_members
WHERE team_id = $1;

DELETE FROM team
WHERE team_id = $1
RETURNING *;