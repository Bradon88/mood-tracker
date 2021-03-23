module.exports = {
    addMood: async ( req, res ) => { 
        const db = req.app.get('db')
        if( req.session.user ){
            const { mood, date, current_activity, activity_notes } = req.body
            await db.mood.create_mood([ team_id, mood, date, current_activity, activity_notes ])
            
        }
    },
    getMood: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ){
            const mood = await db.mood.get_mood([ req.session.user.user_id ])
            return res.status(200).send(mood)
        } else {
            return res.status(401).send('Please log in to view mood information.')
        }
    }
}