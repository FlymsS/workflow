import React, { FC, ReactNode, useEffect, useReducer } from "react";

import { useSnackbar } from "notistack";

import { EntriesContext, entriesReducer } from "./";
import { Entry } from "@/interfaces";
import { NewEntry } from "../../components/ui/NewEntry";
import { entriesApi } from "@/apis";

interface Props {
  children: ReactNode;
}

export interface EntriesState {
  entries: Entry[];
  teams: boolean
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
  teams: false
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    if(state.teams){
      const { data } = await entriesApi.post<Entry>("/entries/team", { description });
      dispatch({ type: "[Entry] - add entry", payload: data });
    }else{
      const { data } = await entriesApi.post<Entry>("/entries", { description });
      dispatch({ type: "[Entry] - add entry", payload: data });
    }
  };

  const updateEntry = async ({description, status, _id}: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status
      });
      dispatch({ type: "[Entry] - update entry", payload: data });
      enqueueSnackbar('Entrada actualizada',{
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin:{
          vertical: 'top',
          horizontal: 'right'
        }
      });
    } catch (err) {
      console.log({err});
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "[Entry] - refresh data", payload: data });
    dispatch({ type: "[Entry] - disactive team status"})
  };

  const refresEntriesToTeam = async () => {
    const { data } = await entriesApi.get<Entry[]>(`/entries/team`);
    dispatch({ type: "[Entry] - refresh data", payload: data });
    dispatch({ type: "[Entry] - active team status"})
  }

  useEffect(() => {
    refreshEntries();
  }, []);

  const deleteEntry = async (id: string) => {
    try {
      const { data } = await entriesApi.delete<Entry>(`/entries/${id}`);
      dispatch({ type: "[Entry] - delete entry", payload: id });
    }catch(error){
      enqueueSnackbar('Error al borrar la tarea',{
        variant: 'error',
        autoHideDuration: 1500,
        anchorOrigin:{
          vertical: 'top',
          horizontal: 'right'
        }
      });
      return;
    }
  }

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        //methods
        addNewEntry,
        updateEntry,
        refresEntriesToTeam,
        refreshEntries,
        deleteEntry
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
