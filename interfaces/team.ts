import {Entry, User} from "./";

export interface Team{
  _id: string;
  name: string;
  description: string;
  users: string[];
  entries: Entry[];
  admins: User[];
}