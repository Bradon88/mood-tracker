INSERT INTO mood_users (first_name, last_name, email, password, picture, admin)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

