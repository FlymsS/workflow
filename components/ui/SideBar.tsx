import { useContext } from "react";

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
import InboxIcon from "@mui/icons-material/InboxOutlined";
import MailIcon from "@mui/icons-material/MailOutlineOutlined";
import { UIContext } from "@/context/ui";

const menuItems: string[] = ["Inbox", "Started", "Send Email", "Drafts"];

export const SideBar = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}></Box>
      <Box sx={{ padding: "5px 10px" }}>
        <Typography variant="h4">Menu</Typography>
      </Box>
      <List>
        {menuItems.map((text, index) => (
          <ListItem key={text} button>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {menuItems.map((text, index) => (
          <ListItem key={text} button>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
