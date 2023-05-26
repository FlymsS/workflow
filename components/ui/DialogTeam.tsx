import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


export const DialogTeam = ({
  open,
  handleClose,
  descriptionP,
  title
}: {
  open: boolean;
  handleClose: (save: boolean, desc?: string, name?: string) => void;
  descriptionP?: string;
  title?: string;
})=> {
  const [name, setName] = React.useState(title);
  const [description, setDescription] = React.useState(descriptionP || "");

  const paintInputs = () => (
    <>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Nombre del equipo"
        type="text"
        fullWidth
        variant="standard"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        margin="dense"
        autoFocus
        id="description"
        label="Descripción"
        type="text"
        fullWidth
        variant="standard"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </>
  );

  return (
    <div>
      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogContent>
          {paintInputs()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Cancelar</Button>
          <Button onClick={() => handleClose(true, description, name)}>{name ? "Guardar" : "Crear"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
