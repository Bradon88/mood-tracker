import {Component} from 'react'
import {setNotes} from '../../redux/notesReducer'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Note from './Note'


class Notes extends Component {
  constructor() {
    super()
    this.state = []
  }

  componentDidMount() {
    this.getNotes()
  }

  getNotes = () => {
    axios
      .get('/api/notes')
      .then((results) => {
        this.props.setNotes(results.data)
      })
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <div className='add-notes-link-parent'>
        <Link to='/AddNotes' className='add-notes-link'>Add Note</Link>
        <p className='your-notes'>Your Notes</p>
        {this.props.notesReducer && this.props.notesReducer.notes.map((note) => (
          <Note note={note} key={note.note_id} setNotes={this.props.setNotes}/>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapStateToProps, { setNotes })(Notes)