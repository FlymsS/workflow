import { Team } from "@/interfaces";
import { TeamsState } from ".";

type TeamsActionType =
  | { type: "[Team] - add team"; payload: Team }
  | { type: "[Team] - refresh teams"; payload: Team[]}
  | { type: "[Team] - update team"; payload: Team}
  | { type: "[Team] - delete team"; payload:  string }

export const teamsReducer = (
  state: TeamsState,
  action: TeamsActionType
): TeamsState => {
  let newTeams: Team[];
  let newTeam: Team;
  switch (action.type) {
    case "[Team] - refresh teams":
      return {
        ...state,
        teams: action.payload,
      };
    case "[Team] - add team":
      return {
        ...state,
        teams: [...state.teams, action.payload],
      };
    case "[Team] - update team":
      newTeam = action.payload;
      newTeams = getNewTeams(state.teams, newTeam);
      return {
        ...state,
        teams: newTeams,
      };
    case "[Team] - delete team":
      return {
        ...state,
        teams: state.teams.filter(team => team._id !== action.payload)
      }
    default:
      return state;
  }
};

const getNewTeams = (teams: Team[], newTeam: Team) => {
  const newTeams = teams.map((team) => {
    if (team._id === newTeam._id) {
      return newTeam;
    }
    return team;
  });
  return newTeams;
}