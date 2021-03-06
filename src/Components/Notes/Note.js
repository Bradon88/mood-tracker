import {Component} from 'react'
import {setNotes} from '../../redux/notesReducer'
import axios from 'axios'
import {connect} from 'react-redux'
import './Notes.scss'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom'

class Note extends Component {
    constructor() {
        super()
        this.state = {
            notes_content: '',
            editing: false
        }
    }

    componentDidMount = () => {
      this.setState({notes_content: this.props.note.notes_content})
    }

    handleEditToggle = () => {
        this.setState({ editing: true })
    }

    handleChange = (value) => {
        this.setState({ notes_content: value })
    }

    handleDelete = () => {
      const {notes_id} = this.props.note
        axios
          .delete(`/api/notes/${notes_id}`)
          .then((results) => {
            this.props.setNotes(results.data)
          })
          .catch((err) => console.log(err))
    }
    
    handleSave = () => {
      const {notes_id} = this.props.note
      const {notes_content} = this.state
        axios
          .put(`/api/notes/${notes_id}`, {
            notes_content
          })
          .then((results) => {
            this.props.setNotes(results.data)
            console.log(this.props)
            this.setState({ editing: false })
            this.props.history.push('/Main/notes')
          })
          .catch((err) => console.log(err))
      }


      render () {
          return this.state.editing ? (
           <div >
               <TextField
                    value={this.state.notes_content}
                    onChange={(e) => this.handleChange(e.target.value)}
                    className='notes-text'
                    id="outlined-multiline-static"
                    label="Note"
                    multiline
                    rows={4}
                    variant="outlined"
                />
                <button onClick={this.handleSave} className='add-to-notes-btn'>Save</button>
                <button onClick={() => window.location.reload(false)} className='add-to-notes-btn'>Cancel</button>
           </div>
          ) : (
              <div className='add-notes-parent'>
                <p className='notes-content'>{this.props.note.notes_content}</p>
                <div id='button-stack'>
                  <EditIcon fontSize='large' onClick={this.handleEditToggle} className='edit-delete-btn'/>
                  <DeleteOutlineIcon fontSize='large' onClick={this.handleDelete} className='edit-delete-btn'/>
                </div>

              </div>
          )
      }
}

export default connect(null, { setNotes })(Note)