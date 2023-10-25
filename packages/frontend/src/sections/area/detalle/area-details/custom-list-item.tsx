import React from 'react'
import { Typography, Box } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

type CustomListProps = {
  title: string
  value: string
}

export default function CustomListItem(props: CustomListProps) {
  const { title, value } = props
  return (
    <ListItem>
      <ListItemText
        primary={
          <Box>
            <Typography variant="body1" sx={{ display: 'inline' }}>
              {title}:
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 'bold', display: 'inline', marginLeft: '8px' }}
            >
              {value}
            </Typography>
          </Box>
        }
      />
    </ListItem>
  )
}
