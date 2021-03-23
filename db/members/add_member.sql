INSERT INTO team_members
( user_id, team_id )
VALUES 
( $1, $2 )
RETURNING *;