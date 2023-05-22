import { ChangeEvent, useContext, useState } from "react";

import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const {addNewEntry} = useContext(EntriesContext);
  const {entring, isEntring} = useContext(UIContext);

  const onTextFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  }

  const onSave = () => {
    if (inputValue.length === 0) return 
    addNewEntry(inputValue);
    setInputValue('');
    setTouched(false);
    isEntring(false);
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2}}>
      {entring ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={ inputValue.length === 0 && touched && "Ingresa un valor"}
            error={ inputValue.length === 0 && touched }
            value={inputValue}
            onChange={onTextFieldChange}
            onBlur={() => setTouched(true)}
          />
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button variant="text" onClick={() => isEntring(false)}>Cancelar</Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button startIcon={<AddIcon />} fullWidth variant="outlined" onClick={() => isEntring(true)}>
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
