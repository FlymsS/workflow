import React, { ChangeEvent, FC, useContext, useState } from "react";
import { GetServerSideProps } from "next";

import { Layout } from "@/components/layouts";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
} from "@mui/material";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutLinedIcon from "@mui/icons-material/DeleteOutlined";

import { Entry, EntryStatus } from "@/interfaces";
import { useMemo } from "react";
import { redirect } from "next/dist/server/api-utils";
import { dbEntries } from "@/database";
import { EntriesContext } from "@/context/entries";
import { useRouter } from "next/router";

const validStatus: EntryStatus[] = ["pending", "in-progres", "finished"];

interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = ({entry}) => {
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const {updateEntry} = useContext(EntriesContext);
  const router = useRouter();

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    if(inputValue.trim().length == 0) return;
    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    }
    updateEntry(updatedEntry);
    router.push("/");
  };

  return (
    <Layout title="...">
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada:`}
              subheader={`Creada hace: ${entry.createAt} minutos`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onChange={onTextFieldChanged}
                helperText={isNotValid && "Ingrese un valor "}
                onBlur={() => setTouched(true)}
                error={isNotValid}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((statusTemp) => (
                    <FormControlLabel
                      key={statusTemp}
                      value={statusTemp}
                      control={<Radio />}
                      label={capitalize(statusTemp)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length == 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "red",
        }}
      >
        <DeleteOutLinedIcon />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry
    },
  };
};

export default EntryPage;
