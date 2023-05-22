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
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description });
    dispatch({ type: "[Entry] - add entry", payload: data });
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
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        //methods
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
