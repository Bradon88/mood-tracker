require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');


//CONTROLLERS
const authCtrl = require('./controllers/user');

//MIDDLEWARE
const app = express();

app.use(morgan('combined'));
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
   app.listen(SERVER_PORT, () => {
      console.log(`Listening on port: ${SERVER_PORT}`);
   });
}).catch((err) => {
   console.log(err)
})


//Endpoints

//Auth Endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.post('/auth/logout', authCtrl.logout);
app.get('/auth/user', authCtrl.getUser);