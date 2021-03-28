import axios from 'axios'
import React, {createContext, useState, useEffect} from 'react'

export const TeamContext = createContext(null)
export const TeamProvider=(props) => {
   const [team, setTeam] = useState();
   const [teamMemberList, setTeamMemberList] = useState();
   const [chatRooms, setChatRooms] = useState ();
   const [myTeamName, setMyTeamName] = useState ();

   // useEffect(() => {
   //    getTeam()
   //    getMembers()
   // }, [])


   const addTeam = async (team_name) => {
      console.log(team_name, 'before axios call')
      return await axios
      .post("/api/team", {team_name})
      // .then((res) => {
      //    setTeam(res.data)
      // })
      .catch(() => console.log('Failed to create a new team.'))
      console.log('teamContext--addTeam', team_name)
   }
   const getTeam = () =>{
      axios
      .get("/api/team")
      .then((res) => {
         setTeam(res.data)
      })
         .catch(() => console.log("Failed to get team."))
   }

   const deleteTeam = async (team_id) => {
      console.log('team context delete team------',team_id)
      await axios
      .delete(`/api/team/${team_id}`)
      }

   const addMember = async (member_id) => {
      await axios
      .post(`/api/team_member/${member_id}`)
      .then((res) => {
         setTeamMemberList(res.data)
      })
      .catch(() => console.log('Failed to add team member.'))
   }

   const getMembers = () =>{
      axios
      .get("/api/team_member")
      .then((res) => {
         setTeamMemberList(res.data)
      })
         .catch(() => console.log("Failed to get team."))
   }

   const deleteMember = async (member_id) => {
      axios
      .delete(`/api/team_member/${member_id}`)
      .then((res) => {
         setTeamMemberList(res.data)
      })
   }

   const getMyTeamName = () => {
      axios
      .get("/api/my_team_name")
      .then((res) => {
         setMyTeamName(res.data)
      })
   }
   const getMyChatRooms = () => {
      axios
      .get("/api/chatrooms")
      .then((res) => {
         setChatRooms(res.data)
      })

   }
   // getChatRoomFromUser=(user_id) => {
   //    axios
      
   // }
   

   return (
      <TeamContext.Provider value={{myTeamName, chatRooms, team, teamMemberList, getTeam, addTeam, deleteTeam, getMembers, addMember, deleteMember, getMyChatRooms, getMyTeamName}}>
         {props.children}
      </TeamContext.Provider>
   )
}