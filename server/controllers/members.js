module.exports = {
    searchMembers: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ) {
            const { email } = req.body
            const memberEmail = await db.members.find_user_by_email([ email ])
            return res.status(200).send(memberEmail)
        } else {
            return res.status(400).send('Please log in to search for members.')
        }
    },
    addMember: async ( req, res ) => {
        const db = req.app.get('db')
        //checks to see if user is signed in
        if( req.session.user ) {
                const { user_id } = req.session.user
                const { member_id } = req.params
                const [team_id] = await db.team.get_team_id([ user_id ])
                await db.members.add_member([ member_id, team_id.team_id ])
                const teamMemberList = await db.members.get_team_members([ team_id.team_id ])
                console.log(teamMemberList)
                return res.status(200).send(teamMemberList)
            } else {
            return res.status(400).send('Please sign in to add a team member.')
        }
    },
    getMembers: async ( req, res ) => {
        //need to lockdown so you can only access this if you have a team - get is_admin working??
        const db = req.app.get('db')
        if( req.session.user ) {
            const { user_id } = req.session.user
            const [team_id] = await db.team.get_team_id([ user_id ])
            const teamMemberList = await db.members.get_team_members([ team_id.team_id])
            return res.status(200).send(teamMemberList)
        } else {
            return res.status(400).send('Please log in to view team members.')
        }
    },
    deleteMember: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ) {
            const { member_id } = req.params
            const { user_id } = req.session.user
            await db.members.delete_member([ member_id ])
            const [team_id] = await db.team.get_team_id([ user_id ])
            const teamMemberList = await db.members.get_team_members([ team_id.team_id])
            return res.status(200).send(teamMemberList)
        } else {
            return res.status(400).send('Please log in to delete team members.')
        }
    }
}