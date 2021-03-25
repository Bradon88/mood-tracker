const user = require("./user")

module.exports = {
    // creates a team
    addTeam: async ( req, res ) => {
        const db = req.app.get('db')
        //check if user is logged in 
        if( req.session.user ){
            //check if user has a team already
            const { user_id } = req.session.user
            const [isAdmin] = await db.user.check_is_admin([ user_id ])
            console.log(isAdmin.is_admin)
            if( isAdmin.is_admin == false ){
                const { team_name } = req.body
                const [newTeam] = await db.team.create_team([ team_name, user_id ])
                req.session.user = {
                    ...req.session.user,
                    team_id: newTeam.team_id
                }
                await db.team.update_admin_after_add_team([ user_id ])
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
            const { user_id } = req.session.user
            const { team_id } = req.params
            await db.team.delete_team( team_id )
            await db.team.update_admin_after_remove_team([ user_id ])
            return res.sendStatus(200)
        } else {
            return res.status(401).send('Please log in to delete a team.')
        }
    }
}