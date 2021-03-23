const user = require("./user")

module.exports = {
    // creates a team
    addTeam: async ( req, res ) => {
        const db = req.app.get('db')
        //check if user is logged in 
        if( req.session.user ){
            //check if user has a team already
            if( !req.session.user.is_admin ){
                const { team_name } = req.body
                const { user_id } = req.session.user
                const newTeam = await db.team.create_team([ team_name, user_id ])
                req.session.user = {
                    ...req.session.user,
                    is_admin: true
                }
                return res.status(200).send(newTeam)
            } else {
                return res.status(401).send('You may only have one team at a time. Please delete your current team to add a new one.')
            }
        } else {
            return res.status(401).send('Please log in to add a team.')
        }
    },
    // returns team name and admin_id
    getTeam: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ){
            const team = await db.team.get_team([ req.session.user.user_id ])
            return res.status(200).send(team)
        } else {
        return res.status(401).send('Please log in to view team information.')
        }
    },
    // deletes team
    deleteTeam: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ){
            const { team_id } = req.params
            await db.team.delete_team( team_id )
            return res.sendStatus(200)
        } else {
            return res.status(401).send('Please log in to delete a team.')
        }
    }
}