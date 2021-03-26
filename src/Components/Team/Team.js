import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState, useEffect, useContext } from "react"
import {TeamContext} from '../../Context/TeamContext'

const Team = () => {
    const {teamMemberList, team, getTeam, addTeam, deleteTeam, getMembers, addMember, deleteMember} =useContext(TeamContext)
    const [team_name, setTeamName] = useState('')
    const [member_id, setMember] = useState('')

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
                    
                    {team?.map((team, index)=>{
                        return(
                            <div key={index}>
                                <div>
                                    {team.team_name}
                                </div>
                            </div>
                        )
                    }) || null}
                    <div>

                    </div>
                </div>

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
                            <TextField 
                                value={ team_name }
                                onChange={ (e) => setTeamName(e.target.value) }
                                id="outlined-basic" 
                                label="Team Name" 
                                name='team_name'
                                variant="outlined" 
                                autoComplete='off'
                            />
                            <button 
                                className="btn"
                                onClick={async() => {
                                    console.log(team_name)
                                    await addTeam(team_name)
                                    getTeam()
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
                                value={member_id}
                                onChange={ (e) => setMember(e.target.value) }
                                label="Search By Email"
                                margin="normal"
                                variant="outlined"
                                InputProps={{ ...params.InputProps, type: 'search' }}
                            />
                        )}
                        />
                        <button className='btn'
                        onClick={() => {
                            console.log(member_id, 'onclick')
                            addMember(member_id)
                            }}> Add Team Member</button>
                    </div>
                    
                </div>
            </div>
    
}

export default Team