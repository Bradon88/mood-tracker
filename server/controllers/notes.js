module.exports = {
    getNotes: (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        db.notes.get_notes(user_id).then((notes) => {
            res.status(200).send(notes)
        })
    },

    addNotes: (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {notes_content} = req.body
        const date = new Date()
        const team = req.session.user.team_id ? req.session.user.team_id : null
        db.notes.create_notes(user_id, team, date, notes_content).then((notes) => {
            res.status(200).send(notes)
        })
    },

    updateNotes: async (req, res) => {
        const db = req.app.get('db')
        const {notes_id} = req.params
        const {notes_content} = req.body
        await db.notes.update_notes(notes_content, notes_id).then((notes) => {
            res.status(200)
        })
        const {user_id} = req.session.user
        await db.notes.get_notes(user_id).then((notes) => {
            res.status(200).send(notes)
        })
    },

    deleteNotes: async (req, res) => {
        const db = req.app.get('db')
        const {notes_id} = req.params
        await db.notes.delete_notes(notes_id).then((notes) => {
            res.status(200)
        })
        const {user_id} = req.session.user
        await db.notes.get_notes(user_id).then((notes) => {
            res.status(200).send(notes)
        })
    }
}