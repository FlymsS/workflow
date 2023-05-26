import React, { FC, ReactNode, useEffect, useReducer } from "react";

import { useSnackbar } from "notistack";

import { TeamsContext, teamsReducer } from "./";
import { Team, User } from "@/interfaces";
import { NewEntry } from "../../components/ui/NewEntry";
import { teamsApi } from "@/apis";
import Cookies from "js-cookie";
import { AxiosResponse } from "axios";
import { DeleteMembers } from '../../components/ui/DeleteMembers';

interface Props {
  children: ReactNode;
}

export interface TeamsState {
  teams: Team[];
}

const Teams_INITIAL_STATE: TeamsState = {
  teams: [] as Team[],
};

export const TeamsProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(teamsReducer, Teams_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const refreshTeams = async () => {
    try{
      const { data } = await teamsApi.get<Team[]>("/teams");
      dispatch({ type: "[Team] - refresh teams", payload: data });
    }catch(err){
      dispatch({ type: "[Team] - refresh teams", payload: [] });
    }
  };

  const getActiveTeam = () => {
    const teamId = Cookies.get('idTeam');
    return state.teams.find(team => team._id === teamId);
  }

  const updateTeam = async (name: string, description: string) => {
    const { data } = await teamsApi.put<Team>(`/teams`, { description, name });
    dispatch({ type: "[Team] - update team", payload: data });
  }

  const addNewTeam = async (name: string, description: string) => {
    try{
      const { data } = await teamsApi.post<Team>("/teams", { description, name });
      dispatch({ type: "[Team] - add team", payload: data });
      enqueueSnackbar('Entrada actualizada',{
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin:{
          vertical: 'top',
          horizontal: 'right'
        }
      });
    }catch(err){
      enqueueSnackbar('Error al actualizar',{
        variant: 'error',
        autoHideDuration: 1500,
        anchorOrigin:{
          vertical: 'top',
          horizontal: 'right'
        }
      });
    }
  }

  const getMembersTeam = async (): Promise<User[]> => {
    const teamId = Cookies.get('idTeam');
    const team = state.teams.find(team => team._id === teamId);
    console.log(team);
    if(!team) return [];
    const aux2 = team.users.map(async (member) => {
      const aux = await teamsApi.get(`/users`,{params:{idUser:member}})
      return aux.data
    })
    const f = await Promise.all(aux2)
    return f;
  }

  const deleteMember = async (id: string) => {
    const idTeam = Cookies.get('idTeam');
    await teamsApi.delete(`/teams/members`,{params:{idUser:id, idTeam}});
  }

  const addAdmin = async (id: string) => {
    const idTeam = Cookies.get('idTeam');
    await teamsApi.post(`/teams/admins`,{idUser:id, idTeam});
  }

  const deleteTeam = async () => {
    const idTeam = Cookies.get('idTeam');
    try{
      await teamsApi.delete(`/teams`);
      dispatch({ type: "[Team] - delete team", payload: idTeam as unknown as string})
    }catch{
      enqueueSnackbar('Error al eliminar',{
        variant: 'error',
        autoHideDuration: 1500,
        anchorOrigin:{
          vertical: 'top',
          horizontal: 'right'
        }
      });
    }
  }

  const addMember = async () => {
    const idTeam = Cookies.get('idTeam');
    const idUser = Cookies.get('idUser');
    await teamsApi.post(`/teams/members`,{idUser, idTeam});
  }

  useEffect(() => {
    refreshTeams();
  }, []);

  return (
    <TeamsContext.Provider
      value={{
        ...state,

        //methods
        addNewTeam,
        getActiveTeam,
        updateTeam, 
        getMembersTeam,
        addMember, 
        deleteTeam, 
        addAdmin, 
        deleteMember
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};