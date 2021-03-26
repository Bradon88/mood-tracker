import {Component} from 'react'
import {setNotes} from '../../redux/notesReducer'
import axios from 'axios'
import {connect} from 'react-redux'

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
                this.props.history.push('/notes')
            })
    }

    render () {
        return (
            <div className='add-notes-parent'>
                <input
                    value={this.state.notes_content}
                    onChange={(e) => this.handleChange(e.target.value)}
                    placeholder='Enter Notes'
                    className='enter-notes-input'
                />
                <button onClick={() => this.addNotes()} className='add-to-notes-btn'>Add to Notes</button>
            </div>
        )
    }
}

export default connect(null, { setNotes })(AddNotes)