import {Entry} from "./"

export interface User{
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  team: string;
  entries: Entry[];
}