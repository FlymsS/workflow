import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
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
import MenuOutLinedIcon from "@mui/icons-material/MenuOutlined";
import sweetalert from 'sweetalert2';
import axios from "axios";
import Cookies from "js-cookie"

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = Router;

  const login = async () => {
    await axios
      .post("http://localhost:3000/api/users/login", { user:email, password })
      .then((res) => {
        Cookies.set("idUser", res.data.id);
        router.push("/entries");
      })
      .catch(({ response }) => {
        sweetalert.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.message,
        });
      });
  }

  return (
    <>
      <head>
        <title>Login</title>
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
                  type="email"
                  fullWidth
                  label="Correo o Usuario"
                  variant="standard"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  type="password"
                  fullWidth
                  label="Password"
                  variant="standard"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid
                container
                direction="row"
                spacing={2}
                paddingX={2}
                paddingY={3}
              >
                <Grid item xs={9}>
                  <Button variant="outlined" fullWidth onClick={login}>
                    Ingresar
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Link href="/registry">
                    <Button variant="text" fullWidth>
                      Registrarse
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </>
  );
}
