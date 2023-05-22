import { DragEvent, FC, useContext } from "react"
import { useRouter } from "next/router"

import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"

import { UIContext } from "@/context/ui"
import { Entry } from "@/interfaces"

interface Props {
  entry: Entry
}
export const EntryCard: FC<Props>= ({entry}) => {

  const router = useRouter();

  const {startDragging, endDragging} = useContext(UIContext);

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    startDragging();
    e.dataTransfer.setData('text', entry._id);
  }

  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    endDragging();
  }

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  }

  return (
    <Card
      sx={{ marginBotton: 1, marginBottom: 1}}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{whiteSpace: 'pre-line'}}>{entry.description}</Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent:'end', paddingRight: 2}}>
          <Typography variant="body2">Hace 30 min</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
