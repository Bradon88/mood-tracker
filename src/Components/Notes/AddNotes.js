import {Component} from 'react'
import {setNotes} from '../../redux/notesReducer'
import axios from 'axios'
import {connect} from 'react-redux'
import './Notes.scss'
import TextField from '@material-ui/core/TextField';


class AddNotes extends Component {
    constructor() {
        super()
        this.state = {
            notes_content: ''
        }
    }

    handleChange = (value) => {
        this.setState({notes_content: value})
    }

    addNotes = () => {
        axios
            .post('/api/notes', {notes_content: this.state.notes_content})
            .then((results) => {
                this.props.setNotes(results.data)
                this.props.history.push('/Main/notes')
            })
    }

    render () {
        return (
            <div className='edit-note'>
                <TextField
                    className='notes-text'
                    id="outlined-multiline-static"
                    label="Note"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={this.state.notes_content}
                    onChange={(e) => this.handleChange(e.target.value)}
                />
                <div>
                    <button className='add-to-notes-btn' onClick={() => this.addNotes()}>Add to Notes</button>
                </div>
            </div>
        )
    }
}

export default connect(null, { setNotes })(AddNotes)