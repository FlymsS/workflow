import { Team, User } from '@/interfaces';
import { createContext } from 'react';

interface ContextProps {
  teams: Team [];

  //methods
  addNewTeam: (name: string, description: string) => Promise<void>
  getActiveTeam: () => Team | undefined;
  updateTeam: (name: string, description: string) => Promise<void>;
  getMembersTeam: () => Promise<User[]>;
  addMember: () => Promise<void>;
  deleteTeam: () => Promise<void>;
  addAdmin: (id: string) => Promise<void>; 
  deleteMember: (id: string) => Promise<void>;
}

export const TeamsContext = createContext({} as ContextProps);