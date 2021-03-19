DROP TABLE IF EXISTS users
DROP TABLE IF EXISTS admin_team
DROP TABLE IF EXISTS user_team
DROP TABLE IF EXISTS team
DROP TABLE IF EXISTS messages
DROP TABLE IF EXISTS chat
DROP TABLE IF EXISTS notes
DROP TABLE IF EXISTS mood


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50)  NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(2500) NOT NULL,
    picture VARCHAR(500),
    admin VARCHAR(100)
)

CREATE TABLE admin_team (
    admin_team_id SERIAL PRIMARY KEY,
    admin_id REFERENCES user_id,
    team_id REFERENCES team_id
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
    team_member REFERENCES user_id
)

CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    user_id REFERENCES user_id,
    chat_id REFERENCES chat_id
)

CREATE TABLE chat (
    chat_id SERIAL PRIMARY KEY,
    chat_content VARCHAR(500),
    user_id REFERENCES user_id,
    admin_id REFERENCES team_id
)

CREATE TABLE notes (
    notes_id SERIAL PRIMARY KEY,
    notes_content VARCHAR(500),
    date VARCHAR(50),
    user_id REFERENCES user_id,
    team_id REFERENCES team_id
)

CREATE TABLE mood (
    mood_id SERIAL PRIMARY KEY,
    mood INT,
    date VARCHAR(50),
    current_activity VARCHAR(200),
    activity_notes VARCHAR(200),
    user_id REFERENCES user_id,
    team_id REFERENCES team_id
)