const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')


const {NODEMAILER_EMAIL, NODEMAILER_PASSWORD} = process.env

module.exports = {

   register: async (req, res) => {
      const db = req.app.get('db');
      const {first_name, last_name, email, password} = req.body;
      console.log('before', req.body)
      const [result] = await db.user.find_user(email);
      if(result){
         return res.status(409).send('Username taken');
      }
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
      let [user] = await db.user.create_user(first_name, last_name, email, hash)
      delete user.password
      //user.team_id = null
      console.log(req.session.user)
      //NODEMAILER
      try {
         const transporter = nodemailer.createTransport({
            service: 'mail.com',
            auth: {
               user: NODEMAILER_EMAIL,
               pass: NODEMAILER_PASSWORD
            }
         })
         await transporter.sendMail({
            from: NODEMAILER_EMAIL,
            to: email,
            subject: "Account Created!",
            html: `
            <body style='background-color:teal; height:100vh; width:100vw; margin: 0;'>
            <div style='background-color:sandybrown; height:50%; width:100vw; display: flex; justify-content: center; align-items: center; margin: 0;'>
               <div style='background-color: white; height: 400px; width: 700px; margin-top: 300px; display: flex; justify-content: center; align-items: center; flex-direction: column;'>
                  <h1 style='font-weight:bolder;'>Thank you for joining Mood Tracker!</h1>
                  <h3 style='font-weight:bolder;'>This email is to confirm that your account has been created.</h3>
               </div>
            </div>
         </body>
            `
         })
      } catch(err) {
         console.log(err)
   }
   
      //END OF NODEMAILER
      user = {
         ...user, 
         team_id: null,
         is_admin: false
      }
      return res.status(200).send({
         user,
         token: generateJWT(user),
      })
   },

   login: async (req, res) => {
      const db = req.app.get('db');
      const {email, password} = req.body;
      let [user] = await db.user.find_user(email);
      if(!user){
         return res.status(401).send('Incorrect credentials')
      }
      const isAuthenticated = bcrypt.compareSync(password, user.password)
      if(!isAuthenticated){
         return res.status(401).send('Incorrect credentials')
      }
      delete user.password
      return res.status(200).send({
         user,
         token: generateJWT(user),
      })
   },

   logout: (req, res) => {
      // req.session.destroy()
      res.sendStatus(200)
   },
   
   getUser: (req, res) => {
      if(!req.session.user){
         return res.status(401).send('Please log in')
      }
      // This is the next thing that needs to be implemented to make users auth work kinda properly
      // if token is valid get user_id from the token and fetch the user from the db.
      // then respond to the client with the user object
      return res.status(200).send(req.session.user)
   }
}

function generateJWT(user) {

   return jwt.sign({
      user
   }, 'MySuP3R_z3kr3t.', { expiresIn: '6h' }); // @TODO move this to an env var
}