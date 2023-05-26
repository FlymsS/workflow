import { Entry } from "@/interfaces";
import { EntriesState } from "./";

type EntriesActionType =
  | { type: "[Entry] - add entry"; payload: Entry }
  | { type: "[Entry] - update entry"; payload: Entry }
  | { type: "[Entry] - delete entry"; payload: string }
  | { type: "[Entry] - refresh data"; payload: Entry[] }
  | { type: "[Entry] - active team status" }
  | { type: "[Entry] - disactive team status" }

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "[Entry] - add entry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case "[Entry] - update entry":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        }),
      };
    case "[Entry] - refresh data":
      return {
        ...state,
        entries: [...action.payload],
      }
    case "[Entry] - active team status":
      return {
        ...state,
        teams: true
      }
    case "[Entry] - disactive team status":
      return {
        ...state,
        teams: false
      }
    case "[Entry] - delete entry":
      return {
        ...state,
        entries: state.entries.filter((entry) => entry._id !== action.payload),
      };
    default:
      return state;
  }
};
