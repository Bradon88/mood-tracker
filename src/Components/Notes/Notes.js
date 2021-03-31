import {Component} from 'react'
import {setNotes} from '../../redux/notesReducer'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Note from './Note'
import './Notes.scss'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


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
      <div>
        <Link to='/Main'><ArrowBackIcon fontSize='large' className='back-arrow'/></Link>
        <div className='notes-header'>
          <p className='your-notes'>Notes</p>
          <div className='space'>
            <Link to='/Main/AddNotes' className='add-notes-link'><AddCircleIcon fontSize='large'/></Link>
          </div>
        </div>
        
        <div className='notes-main'>
          {this.props.notesReducer && this.props.notesReducer.notes.map((note) => (
            <Note note={note} key={note.note_id} setNotes={this.props.setNotes}/>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapStateToProps, { setNotes })(Notes)