DROP TABLE IF EXISTS users
DROP TABLE IF EXISTS user_team
DROP TABLE IF EXISTS team
DROP TABLE IF EXISTS chat
DROP TABLE IF EXISTS notes
DROP TABLE IF EXISTS mood
DROP TABLE IF EXISTS mood_users


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50)  NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(2500) NOT NULL,
    picture VARCHAR(500),
    is_admin BOOLEAN
)

CREATE TABLE user_team (
    user_team_id SERIAL PRIMARY KEY,
    user_id REFERENCES user_id,
    team_id REFERENCES team_id
)

CREATE TABLE team (
    team_id SERIAL PRIMARY KEY,
    team_name VARCHAR(200),
    admin_id REFERENCES user_id,
)

CREATE TABLE chat (
    chat_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    admin_id INT REFERENCES team(team_id),
    date TIMESTAMP,
    chat_content VARCHAR(500)
)

CREATE TABLE notes (
    notes_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    team_id INT REFERENCES team(team_id),
    date TIMESTAMP,
    notes_content VARCHAR(500)
)

CREATE TABLE mood (
    mood_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    team_id INT REFERENCES team(team_id),
    mood VARCHAR(20),
    date TIMESTAMP,
    current_activity VARCHAR(200),
    activity_notes VARCHAR(200),
)