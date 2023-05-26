import { Entry } from '@/interfaces';
import { createContext } from 'react';

interface ContextProps {
  entries: Entry [];

  //methods
  addNewEntry: (description: string) => void;
  updateEntry: (entry: Entry) => void;
  refresEntriesToTeam: () => void;
  refreshEntries: () => void;
  deleteEntry: (id: string) => Promise<void>;
}

export const EntriesContext = createContext({} as ContextProps);