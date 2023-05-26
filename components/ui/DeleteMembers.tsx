import React, { useContext, useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CakeIcon from "@mui/icons-material/Cake";

import { TeamsContext } from "@/context/proyects";
import { User } from "@/interfaces";

export const DeleteMembers = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: (save: boolean) => void;
}) => {
  const { getMembersTeam, deleteMember, addAdmin } = useContext(TeamsContext);
  const [members, setMembers] = useState<User[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openPopover, setOpenPopover] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function aux() {
      const membersAux = await getMembersTeam();
      setMembers(membersAux);
    }
    aux();
  }, []);

  const handleClickDelete = async (id: string) => {
    await deleteMember(id);
  }

  const handleClickAdmin = async (id: string) => {
    await addAdmin(id);
  }

  return (
    <>
      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>Compañeros de proyecto</DialogTitle>
        <List>
          {members &&
            members.map((member) => (
              <ListItem>
                <ListItemText primary={member.name} />
                <ListItemIcon
                  className="manita"
                  onMouseEnter={
                    (e) => {
                      setAnchorEl(e.currentTarget)
                      setOpenPopover(true);
                      setMessage("Eliminar miembro");
                    }}
                  
                  onMouseLeave={() => setOpenPopover(false)}
                  onClick={() => handleClickDelete(member._id)}
                >
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemIcon 
                  className="manita"
                  onMouseEnter={
                    (e) => {
                      setAnchorEl(e.currentTarget)
                      setOpenPopover(true);
                      setMessage("Hacer admin");
                    }}
                  onMouseLeave={() => setOpenPopover(false)}
                  onClick={() => handleClickAdmin(member._id)}
                >
                  <CakeIcon />
                </ListItemIcon>
              </ListItem>
            ))}
        </List>
        <Popover
          sx={{
            pointerEvents: "none",
          }}
          open={openPopover}
          anchorEl={anchorEl}
          disableRestoreFocus
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 1 }}>{message}</Typography>
        </Popover>
      </Dialog>
    </>
  );
};
