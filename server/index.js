require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const socketio = require("socket.io");
const auth = require("./middleware/auth");
const path = require('path')

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


// app.use(auth)


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
                  // db.chat.create_chat([
                     //    body.teamMember.member_id,
                     //    body.user.user-id,
                     //    body.date,
                     //    chat_content])
                     
                     // //get all info from database
                     // db.chat.getChat([
                        //    body.teamMember.member_id,
                        //    body.user.user-id,
                        // ])
                        
                        console.log("---chat body from sockets", body)
                        // console.log(body.message, "socket on server message")
                        // console.log('-----user off body', body.user )
                        // console.log('------team', body.teamMember)
                        io.in (socket.handshake.query.roomname).emit('receive-message', body)
                     })
      socket.on('send-message-sync',(body)=>{
         
         io.in (socket.handshake.query.roomname).emit('receive-message-sync', body)
      })
   })
   httpServer.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));
}).catch((err) => {
   console.log(err)
})

//Notes Endpoints
app.get('/api/notes', auth, notesCtrl.getNotes)
app.post('/api/notes', auth, notesCtrl.addNotes)
app.put('/api/notes/:notes_id', auth, notesCtrl.updateNotes)
app.delete('/api/notes/:notes_id', auth, notesCtrl.deleteNotes)

//Auth Endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.post('/auth/logout', authCtrl.logout);
app.get('/auth/user', authCtrl.getUser);
app.get('/auth/updateToken', authCtrl.updateToken)
// app.post('/auth/user', authCtrl.updateUser)
// this will use your jwt token to authenticate
//app.get('/auth/user', auth , authCtrl.getUser);

//MOOD ENDPOINTS
// user logs a single mood entry
app.post('/api/mood', auth, moodCtrl.addMood);
// returns mood entries for one user, based on logged-in user
app.get('/api/mood', auth, moodCtrl.getMood);
// returns mood entries for an entire team, based on logged-in user (as admin_id)
app.get('/api/member_mood', auth, moodCtrl.getMemberMood);

//TEAM ENDPOINTS
// creates a new team
app.post('/api/team', auth, teamCtrl.addTeam);
// returns team name and admin_id
app.get('/api/team', auth, teamCtrl.getTeam);
// deletes entire team by admin_id
app.delete('/api/team/:team_id', auth, teamCtrl.deleteTeam)

//TEAM MEMBERS ENDPOINTS
// adds a member to logged-in user's existing team
app.post('/api/team_member/:member_id', auth, memberCtrl.addMember);
// returns all team member information for logged-in user's existing team
app.get('/api/team_member', auth, memberCtrl.getMembers);
// deletes an individual team member by team member user_id
app.delete('/api/team_member/:member_id', auth, memberCtrl.deleteMember);
app.post('/api/search', auth, memberCtrl.searchMembers)
app.get('/api/my_team_name', auth, memberCtrl.getMyTeamName)
//member can get their team name

//CHAT ENDPOINTS
app.post('/api/chat/:member_id', auth, chatCtrl.addMessage);
// adds message to chat table for user and team admin
app.get('/api/chat/:member_id', auth, chatCtrl.getChat);
// get messsages from chat table for Admin and user chat
app.get('/api/chatrooms', auth, chatCtrl.getMyChatRooms)
//get chatrooms for your user id

app.get('/api/member_mood', auth, moodCtrl.getMemberMood);

//HOSTING
app.use(express.static(__dirname + '/../build'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})