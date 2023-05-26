import { useContext, useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InboxIcon from "@mui/icons-material/InboxOutlined";
import MailIcon from "@mui/icons-material/MailOutlineOutlined";
import SvgIcon from "@mui/material/SvgIcon";
import { UIContext } from "@/context/ui";
import { TeamsContext } from "@/context/proyects";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Cookies from "js-cookie";

import { DialogTeam } from "./";
import { EntriesContext } from "../../context/entries/EntriesContext";

const menuItems: string[] = ["Inbox", "Started", "Send Email", "Drafts"];

export const SideBar = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);
  const { refresEntriesToTeam, refreshEntries } = useContext(EntriesContext);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { teams, addNewTeam } = useContext(TeamsContext);

  const closeDialog = async (crear: boolean, desc?: string, name?: string) => {
    if (crear) {
      await addNewTeam(name!, desc!);
    }
    setOpen(false);
  };

  const showEntrysToTeam = (id: string) => {
    Cookies.set("idTeam", id);
    refresEntriesToTeam();
    router.push("/entries/team");
    closeSideMenu();
  };
  const showEntrysToPersonal = () => {
    refreshEntries();
    router.push("/entries");
    closeSideMenu();
  };

  const paintTeams = () => {
    return teams.map(({ name, _id }, index) => (
      <ListItem key={_id} button onClick={() => showEntrysToTeam(_id)}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    ));
  };

  return (
    <>
      <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
        <Box sx={{ width: 250 }}></Box>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4">Menu</Typography>
        </Box>
        <List>
          <ListItem key="personals" button onClick={showEntrysToPersonal}>
            <ListItemIcon>
              <SvgIcon color="primary">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText primary="Personales" />
          </ListItem>
        </List>
        <Divider />
        <ListItem key="teams">
          <ListItemText primary="Proyectos" />
        </ListItem>
        <List>
          {teams && paintTeams()}
          <ListItem key="addTeam" button onClick={() => setOpen(true)}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Agregar Proyecto" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem key="closeSession" button onClick={() => {
            Cookies.remove("idUser");
            Cookies.remove("idTeam");
            router.push("/");
          }}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItem>
        </List>
      </Drawer>
      <DialogTeam open={open} handleClose={closeDialog} />
    </>
  );
};
