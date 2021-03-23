INSERT INTO team
( team_name, admin_id )
VALUES
( $1, $2 )
RETURNING *;