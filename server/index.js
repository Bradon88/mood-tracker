require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const socketio = require("socket.io");
const auth = require("./middleware/auth");

//CONTROLLERS
const authCtrl = require('./controllers/user');
const notesCtrl = require('./controllers/notes');
const moodCtrl = require('./controllers/mood');
const teamCtrl = require('./controllers/team');
const memberCtrl = require('./controllers/members');
const chatCtrl = require('./controllers/chat');

//MIDDLEWARE
const app = express();
const httpServer = require("http").createServer(app);
const io = socketio(httpServer, {
   cors:{
      origin: '*'
   }
})

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
   // const io = socketio(
   //    httpServer,
   //    // app.listen(SERVER_PORT, console.log(`Server listening on ${SERVER_PORT}`)),
   //    {
   //       cors: {
   //          origin: true
   //       }
   //    }
   // )
   // Socket.io-client has an issue with when downdrading from websockets to polling
   // that it wont send handshake query params to the server
   app.set('io', io)
   io.on('connection', (socket) => {
      console.log(`${socket.id} connected`)
      console.log(`${JSON.stringify(socket.handshake.query,2,2)} socket query`)
      socket.join(socket.handshake.query.roomname)
      socket.on('disconnect', () => {
         console.log(`${socket.id} disconnected`)
      })
   
      socket.on('send-message', (body) => {
         
         //pass into database file create 
         //get all info from database
         console.log(body.message)
         io.in (socket.handshake.query.roomname).emit('receive-message', body)
      })
   })
   httpServer.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));
}).catch((err) => {
   console.log(err)
})


//Notes Endpoints
app.get('/api/notes', notesCtrl.getNotes)
app.post('/api/notes', notesCtrl.addNotes)
app.put('/api/notes/:notes_id', notesCtrl.updateNotes)
app.delete('/api/notes/:notes_id', notesCtrl.deleteNotes)

//Auth Endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.post('/auth/logout', authCtrl.logout);
app.get('/auth/user', authCtrl.getUser);
// app.post('/auth/user', authCtrl.updateUser)
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
app.post('/api/team_member/:member_id', memberCtrl.addMember);
// returns all team member information for logged-in user's existing team
app.get('/api/team_member', memberCtrl.getMembers);
// deletes an individual team member by team member user_id
app.delete('/api/team_member/:member_id', memberCtrl.deleteMember);

//CHAT ENDPOINTS
app.post('/api/chat', chatCtrl.addMessage);
// adds message to chat table for user and team admin
// app.get('/api/chat', chatCtrl.getChat);
// get messsages from chat table for Admin and user chat
