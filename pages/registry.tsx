import { ChangeEvent, useState } from "react";

import {
  AppBar,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import sweetalert from "sweetalert2";

import { User } from "../interfaces";
import { error } from 'console';
import  Router  from "next/router";

const registry = () => {
  const [data, setData] = useState<User>({} as User);
  const [complete, setComplete] = useState<boolean>(true);
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const router = Router;

  const set = (
    { target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    setData({ ...data, [type]: target.value });
    if (data.name && data.email && data.password && regex.test(data.email)) {
      setComplete(false);
    }
  };

  const handleRegistry = async () => {
    await axios.post(
      "http://localhost:3000/api/users/newUser",
      data
    )
    .then((res) => {
      sweetalert.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Ahora puedes iniciar sesión",
      });
      router.push("/");
    })
    .catch(({response}) => {
      sweetalert.fire({
        icon: "error",
        title: "Oops...",
        text: response.data.message,
      });
    });
  };

  return (
    <>
      <head>
        <title>Registro</title>
      </head>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">WorkTrack</Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent={"center"}
          style={{ minHeight: "100vh" }}
        >
          <Paper elevation={2} sx={{ padding: 5 }}>
            <Grid container direction={"column"} spacing={2}>
              <Grid item>
                <TextField
                  type="string"
                  fullWidth
                  label="Nombre de usuario"
                  variant="standard"
                  value={data.name}
                  onChange={(e) => set(e, "name")}
                />
              </Grid>
              <Grid item>
                <TextField
                  type="email"
                  fullWidth
                  label="Correo"
                  variant="standard"
                  value={data.email}
                  onChange={(e) => set(e, "email")}
                />
              </Grid>
              <Grid item>
                <TextField
                  type="password"
                  fullWidth
                  label="Password"
                  variant="standard"
                  value={data.password}
                  onChange={(e) => set(e, "password")}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={async () => await handleRegistry()}
                  disabled={complete}
                >
                  Registrarse
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default registry;
