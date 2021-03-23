const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

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
      const[user] = await db.user.create_user(first_name, last_name, email, hash)
      delete user.password
      //user.team_id = null
      req.session.user = {
         ...user, 
         team_id: null
      }
      return res.status(200).send({
         user,
         token: generateJWT(user),
      })
   },

   login: async (req, res) => {
      const db = req.app.get('db');
      const {email, password} = req.body;
      const [user] = await db.user.find_user(email);
      if(!user){
         return res.status(401).send('Incorrect credentials')
      }
      const isAuthenticated = bcrypt.compareSync(password, user.password)
      if(!isAuthenticated){
         return res.status(401).send('Incorrect credentials')
      }
      delete user.password
      req.session.user = user
      return res.status(200).send({
         user,
         token: generateJWT(user),
      })
   },

   logout: (req, res) => {
      req.session.destroy()
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
      data: {
         user_id: user.user_id,
         email: user.email
      }
   }, 'MySuP3R_z3kr3t.', { expiresIn: '6h' }); // @TODO move this to an env var
}