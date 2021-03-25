module.exports = {
    // add a single mood entry as logged-in user
    addMood: async ( req, res ) => { 
        const db = req.app.get('db')
        if( req.session.user ){

            const date = new Date
            const { mood, current_activity, activity_notes } = req.body

            const { user_id } = req.session.user
            let team = req.session.user.team_id ? req.session.user.team_id : null
            const newMood = await db.mood.create_mood([ user_id, team, mood, date, current_activity, activity_notes ])
            return res.status(200).send(newMood)
        }
    },
    // gets mood entires of single user (logged-in user)
    getMood: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ){
            const mood = await db.mood.get_mood([ req.session.user.user_id ])
            return res.status(200).send(mood)
        } else {
            return res.status(401).send('Please log in to view mood information.')
        }
    },
    // gets mood entires of entire team, based on admin_user (user_id of logged-in user)
    getMoods: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ){

        }
    }
}