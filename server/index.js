require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const socketio = require("socket.io");
const auth = require("./middleware/auth");


//CONTROLLERS
const authCtrl = require('./controllers/user');
const notesCtrl = require('./controllers/notes')

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
// this will use your jwt token to authenticate
//app.get('/auth/user', auth , authCtrl.getUser);