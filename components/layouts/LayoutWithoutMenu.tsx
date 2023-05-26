import { AppBar, Toolbar, Typography } from '@mui/material'
import React, { FC, ReactNode } from 'react'

interface Props {
  title? : string,
  children: React.ReactNode
}

export const LayoutWithoutMenu:FC<Props> = ({title, children}) => {
  return (
    <>
      <head>
        <title>{title}</title>
      </head>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">WorkTrack</Typography>
        </Toolbar>
      </AppBar>
      {children}
    </>
  )
}
