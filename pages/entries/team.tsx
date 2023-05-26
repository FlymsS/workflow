import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";

import { Layout } from "@/components/layouts";
import { EntryList, NewEntry } from "@/components/ui";
import { TeamsContext } from "@/context/proyects";
import Cookies from "js-cookie";
import { Team, User } from "@/interfaces";
import { DialogTeam, DeleteMembers } from "../../components/ui";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Popover from "@mui/material/Popover";

const inter = Inter({ subsets: ["latin"] });

function TeamPage() {
  const { getActiveTeam, updateTeam, deleteTeam } = useContext(TeamsContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [team, setTeam] = useState<Team>();
  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [openMembers, setOpenMembers] = useState(false);
  const [popoverText, setPopoverText] = useState("");

  const router = useRouter();

  useEffect(() => {
    const a = getActiveTeam();
    setTeam(a);
  }, [, open]);

  const closeDialog = async (crear: boolean, desc?: string, name?: string) => {
    if (crear) {
      await updateTeam(name!, desc!);
    }
    setOpen(false);
  };

  const paintInvitateButton = () => (
    <Grid item xs={3} paddingX={1}>
      <Button
        variant="outlined"
        color="success"
        sx={{ marginTop: 2 }}
        fullWidth
        onClick={() => {
          navigator.clipboard.writeText(`http://localhost:3000/invitations/${team?._id}`)
          setOpenPopover(true);
          setPopoverText("Copiado");
        }}
        onMouseEnter={(e) => {
          setAnchorEl(e.currentTarget)
          setOpenPopover(true);
          setPopoverText("Copiar enlace");
        }}
        onMouseLeave={() => {
          setOpenPopover(false);
        }}
      >
        Invitar miembros
        <LinkIcon sx={{ marginLeft: 1 }} />
      </Button>
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
        <Typography sx={{ p: 1 }}>{popoverText}</Typography>
      </Popover>
    </Grid>
  );

  const handleDeleteTeam = async () => {
    await deleteTeam();
    router.push("/entries");
  }

  const paintOptionsToAdim = () => {
    const idUser = Cookies.get("idUser");
    if (team?.admins.includes(idUser as unknown as User) === false) return <></>;
    return (
      <Grid container>
        {paintInvitateButton()}
        <Grid item xs={3} paddingX={1}>
          <Button
            variant="outlined"
            color="warning"
            sx={{ marginTop: 2 }}
            fullWidth
            onClick={() => setOpen(true)}
          >
            Editar
            <EditIcon sx={{ marginLeft: 1 }} />
          </Button>
          {team && (
            <DialogTeam
              open={open}
              handleClose={closeDialog}
              descriptionP={team?.description}
              title={team?.name}
            />
          )}
        </Grid>
        <Grid item xs={3} paddingX={1}>
          <Button
            variant="outlined"
            color="warning"
            sx={{ marginTop: 2 }}
            fullWidth
            onClick={() => setOpenMembers(true)}
          >
            Editar miembros
            <EditIcon sx={{ marginLeft: 1 }} />
          </Button>
          <DeleteMembers
            open={openMembers}
            handleClose={() => setOpenMembers(false)}
          />
        </Grid>
        <Grid item xs={3} paddingX={1}>
          <Button
            variant="outlined"
            color="error"
            sx={{ marginTop: 2 }}
            fullWidth
            onClick={() => handleDeleteTeam()}
          >
            Borrar proyecto
            <DeleteIcon sx={{ marginLeft: 1 }} />
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <Layout title="WorkTrack">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ fontFamily: inter }}>
            {team && team.name}
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: inter }}>
            {team && team.description}
          </Typography>
          {team && paintOptionsToAdim()}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Pendientes" />
            <CardContent>
              <NewEntry />
              <EntryList status="pending" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="En progreso" />
            <CardContent>
              <EntryList status="in-progres" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Completadas" />
            <CardContent>
              <EntryList status="finished" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default TeamPage;
