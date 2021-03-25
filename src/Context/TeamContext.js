import axios from 'axios'
import React, {createContext, useState, useEffect} from 'react'

export const TeamContext = createContext(null)
export const TeamProvider=(props) => {
   const [team_name, setTeam_Name] = useState();
   const [teamMemberList, setTeamMemberList] = useState();


   const addTeam = async (body) => {
      console.log(team_name, 'before axios call')
      await axios
      .post("/api/team", body)
      .then((res) => {
         setTeam_Name(res.data)
      })
      .catch(() => console.log('Failed to create a new team.'))
      console.log('teamContext--addTeam', team_name)
   }
   const getTeam = async () =>{
      await axios
      .get("/api/team")
      .then((res) => {
         setTeam_Name(res.data)
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

   const getMembers = async () =>{
      await axios
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

   return (
      <TeamContext.Provider value={{team_name, teamMemberList, getTeam, addTeam, deleteTeam, getMembers, addMember, deleteMember}}>
         {props.children}
      </TeamContext.Provider>
   )
}