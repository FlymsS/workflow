import { Inter } from "next/font/google";

import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";

import { Layout } from "@/components/layouts";
import { EntryList, NewEntry } from "@/components/ui";

const inter = Inter({ subsets: ["latin"] });

function HomePage() {
  return (
    <Layout title="WorkTrack">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="Pendientes"/>
            <CardContent>
              <NewEntry />
              <EntryList status="pending"/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="En progreso"/>
            <CardContent>
              <EntryList status="in-progres"/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="Completadas"/>
            <CardContent>
              <EntryList status="finished"/>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  );
}

export default HomePage;
