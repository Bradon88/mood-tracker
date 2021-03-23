module.exports = {
    getNotes: (req, res) => {
        const db = req.app.get('db')
        db.notes.get_notes().then((notes) => {
            res.status(200).send(notes)
        })
    },

    addNotes: (req, res) => {
        const db = req.app.get('db')
        const {notes_content} = req.body
        const {user_id} = req.session.user
        db.notes.create_notes(notes_content, user_id).then((notes) => {
            res.status(200).send(notes)
        })
    },

    updateNotes: (req, res) => {
        const db = req.app.get('db')
        const {notes_id} = req.params
        const {notes_content} = req.body
        db.notes.update_notes(notes_content, notes_id).then((notes) => {
            res.status(200).send(notes)
        })
    },

    deleteNotes: (req, res) => {
        const db = req.app.get('db')
        const {notes_id} = req.params
        db.notes.delete_notes(notes_id).then((notes) => {
            res.status(200).send(notes)
        })
    }
}