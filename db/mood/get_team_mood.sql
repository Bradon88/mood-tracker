SELECT * FROM mood
JOIN team
ON mood.team_id = team.team_id
WHERE mood.team_id = $1;