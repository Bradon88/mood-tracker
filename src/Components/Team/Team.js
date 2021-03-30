import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState, useEffect, useContext } from "react";
import { TeamContext } from "../../Context/TeamContext";
import { AuthContext } from "../../Context/AuthContext";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import SentimentDissatisfied from '@material-ui/icons/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied'
import axios from "axios";
// import { getMembers } from "../../../server/controllers/members";


    

 

    

const Team = () => {
    const {
        teamMemberList,
        team,
        getTeam,
        addTeam,
        deleteTeam,
        getMembers,
        addMember,
        deleteMember,
    } = useContext(TeamContext);
    const [team_name, setTeamName] = useState("");
    const { user, updateToken} = useContext(AuthContext);
    const [email, setMemberEmail] = useState("");
    const [dropDown, setDropDown] = useState([]);
    const [member_id, setMemberID] = useState();
    const [mood, setMood] = useState([])
  //check if is_admin = false in DidMount

    useEffect(() => {
        getTeam();
        axios.post("/api/search", { email }).then((res) => {
        setDropDown(res.data);
        });
        getMembers()
        
    },[])
    
        // getMembers();
        // axios.get('/api/mood/member_mood', {member_id}).then((res) => {
        //     setMood(res.data)
        // })
        // getMembers();

    // const moods = mood.map((m) => m.mood)

    // const moodOne = moods.reduce((a, mood) => a+(mood.slice(0, 2) === '1' ? 1 : 0), 0)
    // const moodTwo = moods.reduce((a, mood) => a+(mood.slice(0, 2) === '2' ? 1 : 0), 0)
    // const moodThree = moods.reduce((a, mood) => a+(mood.slice(0, 2) === '3' ? 1 : 0), 0)
    // const moodFour = moods.reduce((a, mood) => a+(mood.slice(0, 2) === '4' ? 1 : 0), 0)
    // const moodFive = moods.reduce((a, mood) => a+(mood.slice(0, 2) === '5' ? 1 : 0), 0)
    
    console.log(dropDown, 'dropdown Teamsjs')
    console.log(team, 'teamjs component')
    return (
        <div>
        <div>
            {team?.map((team, index) => {
            return (
                <div key={index}>
                <h1>{team.team_name}</h1>
                <h2>{team.team_id}</h2>
                <button className="btn" onClick={ async () => {
                    await deleteTeam(team.team_id)
                    getTeam()
                    updateToken()
                }}>Delete Team</button>
                </div>
            );
            }) || null}
            <div></div>
        </div>
        {user.is_admin ? (''): (
            <div>
            <h2>Create a team to view and manage team member mood logs!</h2>
            <button className="btn">Add Team</button>
            </div>
        )}

        {user.is_admin ? ('') : (
            <div>
            <div>
                <h2>What would you like to name your team?</h2>
                <TextField
                value={team_name}
                onChange={(e) => setTeamName(e.target.value)}
                id="outlined-basic"
                label="Team Name"
                name="team_name"
                variant="outlined"
                autoComplete="off"
                />
                <button
                className="btn"
                onClick={async () => {
                    console.log(team_name);
                    await addTeam(team_name);
                    updateToken();
                    getTeam();
                    setTeamName("");
                }}
                >
                Create Team
                </button>
            </div>
            </div>
        )}
        {user.is_admin ? (
            <div>
            <h2>Add members to your team!</h2>
            <h2>Search for team members by email:</h2>
            <div style={{ width: 300 }}>
            <Autocomplete
                id="free-solo-2-demo"
                disableClearable
                getOptionLabel={(option) => option.email}
                options={dropDown}
                onChange={(event, value) => {
                    setMemberEmail(value.email)
                    setMemberID(value.user_id)
                    console.log(value.user_id)
                }}
                renderInput={(params) => (
                <TextField
                    {...params}
                    value={email}
                    label="Search By Email"
                    margin="normal"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: "search" }}
                />
                )}
            />
            <button
    
                className="btn"
                onClick={() => {
                addMember(member_id);
                console.log(member_id)
                }}
            >
                {" "}
                Add Team Member
            </button>
            </div>
            <div>
                <h1>Team Members</h1>
                {teamMemberList?.map((member, index) => {

                const moods = member.moods.map((m) => m.mood)

                const moodOne = moods.reduce((a, mood) => a+(mood.slice(0, 2) === '1' ? 1 : 0), 0)
                const moodTwo = moods.reduce((a, mood) => a+(mood.slice(0, 2) === '2' ? 1 : 0), 0)
                const moodThree = moods.reduce((a, mood) => a+(mood.slice(0, 2) === '3' ? 1 : 0), 0)
                const moodFour = moods.reduce((a, mood) => a+(mood.slice(0, 2) === '4' ? 1 : 0), 0)
                const moodFive = moods.reduce((a, mood) => a+(mood.slice(0, 2) === '5' ? 1 : 0), 0)

                    return (
                        <div key={index} >
                            <h2>{ member.first_name } { member.last_name } {member.member_id}
                            <br></br>
                             </h2>
                                <SentimentVeryDissatisfiedIcon style={{ color:' #bf5c43'}}/>  {moodOne}
                                <SentimentDissatisfied style={{color:'#ee8959' }}/> {moodTwo}
                                <SentimentSatisfiedIcon style={{color:'#efb366'}}/> {moodThree}
                                <SentimentSatisfiedAltIcon style={{color:'#e9cf6a'}}/> {moodFour}
                                <SentimentVerySatisfiedIcon style={{color:'#babb74'}}/> {moodFive}
                                
                        <div>
                        <br></br>
                <DeleteOutlineIcon style={{color: '#39b8a9'}} onClick={() => { deleteMember( member.member_id )}}/>
                {teamMemberList?.map((member, index) => {
                    return (
                        <div key={index} >
                                <div>
                                    <h2>{ member.first_name } { member.last_name }</h2>
                                    <h3>{ member.email }</h3>
                                </div>
                                
                        </div>
                        );
                    }) || null}
                        </div>
                        </div>
                    );
                }) || null}
            </div>
        </div>
        
        ): null}
        
        </div>
    );
};

export default Team;
