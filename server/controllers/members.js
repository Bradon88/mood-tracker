module.exports = {
    addMember: async ( req, res ) => {
        const db = req.app.get('db')
        //checks to see if user is signed in
        if( req.session.user ) {
                const { user_id } = req.session.user
                const { member_id } = req.params
                const [team_id] = await db.team.get_team([ user_id ])
                await db.members.add_member([ member_id, team_id ])
                const newTeamList = await db.team.get_team([ user_id ])
                return res.status(200).send(newTeamList)
            } else {
            return res.status(400).send('Please sign in to add a team member.')
        }
    },
    getMembers: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ) {
            
        }
    },
    deleteMember: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ) {
            
        }
    }
}