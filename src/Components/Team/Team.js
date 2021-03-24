import axios from 'axios';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


class Team extends Component {
    constructor(){
        super()
        this.state = {
            team_name: ''
        }
    }

    //check if is_admin = false in DidMount

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addTeam = async (e) => {
        const { team_name } = this.state
        try {
            const name = await axios.post('/api/team', { team_name })
            this.setState({
                team_name: name.data
            })
            console.log(name)
        } catch {
            alert('Failed to create a new team.')
        }
    }

    render(){

        const top100Films = [
            { title: 'The Shawshank Redemption', year: 1994 },
            { title: 'The Godfather', year: 1972 }]
        
        return <div>
                    
                    <div>
                        <h2>Create a team to view and manage team member mood logs!</h2>
                        <button 
                            className="btn"
                            >Add Team
                        </button>
                    </div>
                    
                    <form onSubmit={ this.addTeam }>
                        <div>
                            <h2>What would you like to name your team?</h2>
                            <TextField 
                                id="outlined-basic" 
                                label="Team Name" 
                                name='team_name'
                                variant="outlined" 
                                autoComplete='off'
                                value={ this.state.team_name }
                                onChange={ this.changeHandler }/>
                            <button 
                                className="btn"
                                type='submit'
                                >Create Team
                            </button>
                        </div>
                    </form>

                <div>
                    <h2>Search for team members by email:</h2>
                    <div style={{ width: 300 }}>
                        <Autocomplete
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            options={top100Films.map((option) => option.title)}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search By Email"
                                margin="normal"
                                variant="outlined"
                                InputProps={{ ...params.InputProps, type: 'search' }}
                            />
                        )}
                        />
                        <button className='btn'> Add Team Member</button>
                    </div>
                    
                </div>
            </div>
    }
}

export default Team