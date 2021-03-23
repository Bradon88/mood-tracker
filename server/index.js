require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const socketio = require("socket.io");
const auth = require("./middleware/auth");
const moodCtrl = require('./controllers/mood')
const teamCtrl = require('./controllers/team')
const memberCtrl = require('./controllers/members')


//CONTROLLERS
const authCtrl = require('./controllers/user');

//MIDDLEWARE
const app = express();

app.use(express.json());

let {
   SERVER_PORT,
   CONNECTION_STRING,
   SESSION_SECRET,
} = process.env;

app.use(
   session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {maxAge: 1000 * 60 * 60 * 24}
   })
);

//DATABASE CONNECTION
massive({
   connectionString: CONNECTION_STRING,
   ssl: {rejectUnauthorized: false}
}).then(db => {
   app.set('db', db);
   console.log('db connected');
   const io = socketio(
      app.listen(SERVER_PORT, console.log(`Server listening on ${SERVER_PORT}`)),
      {
         cors: {
            origin: true
         }
      }
   )
   app.set('io', io)
   io.on('connection', (socket) => {
      console.log(`${socket.id} connected`)
      socket.on('disconnect', () => {
         console.log(`${socket.id} disconnected`)
      })
   
      socket.on('send-message', (body) => {
         //pass into database file create 
         //get all info from database
         console.log(body.message)
         io.emit('receive-message', body)
      })
   })
}).catch((err) => {
   console.log(err)
})


//Endpoints

//Auth Endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.post('/auth/logout', authCtrl.logout);
app.get('/auth/user', authCtrl.getUser);
// this will use your jwt token to authenticate
//app.get('/auth/user', auth , authCtrl.getUser);

//MOOD ENDPOINTS
// user logs a single mood entry
app.post('/api/mood', moodCtrl.addMood);
// returns mood entries for one user, based on logged-in user
app.get('/api/mood', moodCtrl.getMood);
// returns mood entries for an entire team, based on logged-in user (as admin_id)
app.get('/api/moods', moodCtrl.getMoods);

//TEAM ENDPOINTS
// creates a new team
app.post('/api/team', teamCtrl.addTeam);
// returns team name and admin_id
app.get('/api/team', teamCtrl.getTeam);
// deletes entire team by admin_id
app.delete('/api/team/:team_id', teamCtrl.deleteTeam)

//TEAM MEMBERS ENDPOINTS
// adds a member to logged-in user's existing team
app.post('/api/team_member', memberCtrl.addMember);
// returns all team member information
app.get('/api/team_member', memberCtrl.getMembers);
// deletes an individual team member by team member user_id
app.delete('/api/team_member/:member_id', memberCtrl.deleteMember);

