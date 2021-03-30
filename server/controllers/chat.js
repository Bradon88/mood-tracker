const RemoveDuplicates = (array, key) => {
   return array.reduce((arr, item) => {
      const removed = arr.filter(i => i[key] !== item[key]);
      return [...removed, item];
   }, []);
};

module.exports = {
   addMessage: async ( req, res ) => {
      const db = req.app.get('db');
      if( req.session.user ){
         const date = new Date()
         // const { user_id } = req.session.user
         //^ used to get team table id?
         const { chat_content } = req.body
         const { member_id } = req.params
         let [team_id] = await db.team.get_team_id_member([ member_id ])
         //team_id but what I want is admin_id from team table
         const chat = await db.chat.create_chat([ member_id, team_id.team_id, date, chat_content ])
         //get chat
         return res.status(200).send(chat)
      } else {
         return res.status(400).send('Please log in to start a chat conversation.')
      }
   }, 
   getChat: async ( req, res ) => {
      const db = req.app.get('db')
      if( req.session.user ){
         const { member_id } = req.params
         const chat = await db.chat.get_chat([ member_id ])
         return res.status(200).send(chat)
      } else {
         return res.status(400).send('Please log in to view a chat conversation.')
      }
   },

   getMyChatRooms: async ( req, res ) => {
      const db = req.app.get('db')
      if( req.session.user ){
         const { user_id } = req.session.user
         // const admin_id = user_id

         const chatRooms = [
            ...await db.chat.get_chat_rooms([ user_id ]),
         ]
         console.log(chatRooms, "controller")
         const filteredRooms = chatRooms.reduce((acc, current) => {
            const x = acc.find(item => item.chat_room_name === current.chat_room_name);
            if (!x) {
               return acc.concat([current]);
            } else {
               return acc;
            }
         }, []);
      
         return res.status(200).send(filteredRooms)
      } else {
         return res.status(400).send('Please log in to view a chat rooms.')
      }
   }
}