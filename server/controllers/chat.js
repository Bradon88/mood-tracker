module.exports = {
   addMessage: ( req, res ) => {
      const db = req.app.get('db');
      const {user_id, admin_id, chat_content} = req.body;
      const date = new Date;

      if(user_id){
         db.chat.create_chat([
            user_id,
            admin_id,
            date,
            chat_content
         ])
         .then(chat => res.status(200).send(chat))
      } else {
         res.status(403).send('please log in');
      }
   }, 
   
   getChat: (req, res) => {
      const db = req.app.get('db')
      const {user_id, admin_id} = req.body;
      if(user_id){
         db.chat.get_chat(user_id, admin_id)
         .then((chat) => {
            res.status(200).send(chat)
         })
      } else {
         res.status(403).send('please log in');
      }
   },
}