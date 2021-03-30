import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState, useEffect, useContext } from "react";
import { TeamContext } from "../../Context/TeamContext";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

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

  //check if is_admin = false in DidMount

    useEffect(() => {
        getTeam();
        axios.post("/api/search", { email }).then((res) => {
        setDropDown(res.data);
        });
        getMembers()
    },[]);

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
                onChange={(value) => {
                    setMemberEmail(value.email)
                    setMemberID(value.user_id)}}
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
                }}
            >
                {" "}
                Add Team Member
            </button>
            </div>
            <div>
                <h1>Team Members</h1>
                {teamMemberList?.map((member, index) => {
                    return (
                        <div key={index} >
                            <h2>{ member.first_name } { member.last_name }</h2>
                        <div>
                
                {teamMemberList?.map((member, index) => {
                    return (
                        <div key={index} >
                                <div>
                                    <h2>{ member.first_name } { member.last_name }</h2>
                                    <h3>{ member.email }</h3>
                                </div>
                                <button className="btn" onClick={() => { deleteMember( member.member_id )}}>Delete member</button>
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
