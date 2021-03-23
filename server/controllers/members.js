module.exports = {
    addMember: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ) {
            find user by email
            get user_id associated with email
            
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