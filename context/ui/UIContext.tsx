import { createContext } from "react";

interface ContextProps {
  sideMenuOpen: boolean;
  entring: boolean;
  isDragging: boolean;

  // Methods
  openSideMenu: () => void;
  closeSideMenu: () => void;
  isEntring: (isLoading: boolean) => void;
  startDragging: () => void;
  endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);

