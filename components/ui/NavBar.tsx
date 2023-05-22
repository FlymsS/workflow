import { useContext } from "react";
import NextLink from "next/link";

import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material";
import MenuOutLinedIcon from "@mui/icons-material/MenuOutlined";

import { UIContext } from "../../context/ui/UIContext";

export const NavBar = () => {
  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuOutLinedIcon />
        </IconButton>
        <NextLink href="/">
          <Link underline="none" color="white">
            <Typography variant="h6">WorkTrack</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
