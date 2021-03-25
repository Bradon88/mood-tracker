INSERT INTO team_members
( member_id, team_id)
VALUES 
( $1, $2 )
RETURNING *;