module.exports = {
   addMessage: async ( req, res ) => {
      const db = req.app.get('db');
      if( req.session.user ){
         const date = new Date
         const { user_id } = req.session.user
         //^ used to get team table id?
         const { chat_content } = req.body
         const { member_id } = req.params
         //team_id but what I want is admin_id from team table
         await db.chat.create_chat([ member_id, team_id, date, chat_content ])
         //get chat
         return res.status(200).send(chat)
      } else {
         return res.status(400).send('Please log in to start a chat conversation.')
      }
   }, 
   
   // getChat: (req, res) => {
   //    const db = req.app.get('db')
   //    if( req.session.user ){
   //       const { user_id } = req.session.user

   // }
}