import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState, useEffect, useContext } from "react"
import {TeamContext} from '../../Context/TeamContext'

const Team = () => {
    const {teamMemberList, getTeam, addTeam, deleteTeam, getMembers, addMember, deleteMember} =useContext(TeamContext)
    const [team_name, setTeamName] = useState('')

    //check if is_admin = false in DidMount


    useEffect(() => {
        getTeam()
        // getMembers()
    }, [])

    

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
                    
                    <div >
                        <div>
                            <h2>What would you like to name your team?</h2>
                            <input 
                                // id="outlined-basic" 
                                // label="Team Name" 
                                // name='team_name'
                                // variant="outlined" 
                                // autoComplete='off'
                                value={ team_name }
                                onChange={ (e) => setTeamName(e.target.value) }/>
                            <button 
                                className="btn"
                                onClick={() => {
                                    addTeam(team_name)
                                    setTeamName('')
                                    }}
                                >Create Team
                            </button>
                        </div>
                    </div>

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

export default Team