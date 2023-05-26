import React, { useContext } from "react";
import { useRouter } from "next/router";

import { LayoutWithoutMenu } from "@/components/layouts";
import Cookies from "js-cookie";
import mongoose from "mongoose";
import { Button, Grid, Typography } from "@mui/material";
import { TeamsContext } from "@/context/proyects";

const InvitationURL = () => {
  const router = useRouter();
  const { addMember } = useContext(TeamsContext);

  const paintContent = () => {
    if (invalidTeam()) return paintInvalidTeam();
    const idUser = Cookies.get("idUser");
    if (!idUser) {
      return paintNoLogin();
    } else {
      const idTeam = router.query.idTeam;
      Cookies.set("idTeam", idTeam as string);
      joinTeam();
      router.push("/entries");
    }
  };

  const invalidTeam = () => {
    const idTeam = router.query.idTeam;
    return mongoose.Types.ObjectId.isValid(JSON.stringify(idTeam));
  };

  const paintInvalidTeam = () => (
    <Grid justifyContent="center" alignItems="center" marginY={10}>
      <Typography variant="h1" align="center" color="error">
        El equipo no existe
      </Typography>
    </Grid>
  );

  const paintNoLogin = () => (
    <Grid container justifyContent="center" alignItems="center" marginY={10}>
      <Typography variant="h1" align="center">
        Para unirte a un equipo debes iniciar sesión primero
      </Typography>
      <Grid container xs={12} marginY={4} justifyContent={"center"} alignItems={"center"}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
        >
          Iniciar sesión
        </Button>
      </Grid>
    </Grid>
  );

  const joinTeam = () => {
    try{
      addMember();
    }catch(error){
      console.log(error);
    }
  };

  return (
    <LayoutWithoutMenu title="Invitación">{paintContent()}</LayoutWithoutMenu>
  );
};

export default InvitationURL;
