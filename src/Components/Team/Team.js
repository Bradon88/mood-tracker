import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState, useEffect, useContext } from "react";
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
    const { user } = useContext(AuthContext);
    const [email, setMemberEmail] = useState("");
    const [dropDown, setDropDown] = useState([]);
    const [member_id, setMemberID] = useState();

  //check if is_admin = false in DidMount

    useEffect(() => {
        getTeam();
        axios.post("/api/search", { email }).then((res) => {
        setDropDown(res.data);
        });
    // getMembers()
    }, []);

    console.log(dropDown, 'dropdown Teamsjs')
    return (
        <div>
        <div>
            {team?.map((team, index) => {
            return (
                <div key={index} className="title">
                <h1 className="team-name">{team.team_name}</h1>
                </div>
            );
            }) || null}
            <div></div>
        </div>
        {user.is_admin ? (
            <div>
            <h2>Create a team to view and manage team member mood logs!</h2>
            <button className="btn">Add Team</button>
            </div>
        ) : null}

        {user.is_admin ? (
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
                    getTeam();
                    setTeamName("");
                }}
                >
                Create Team
                </button>
            </div>
            </div>
        ) : null}

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
        </div>
        </div>
    );
};

export default Team;
