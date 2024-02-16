import { IProject, IUser } from '@adp/shared'
import React, { useMemo, useState } from 'react'
import { useBoolean } from 'src/hooks/use-boolean'
import { Card, Box, TextField, Button } from '@mui/material'
import { useQuery } from '@apollo/client'
import { USERS_VIEW_PROJECT } from 'src/graphql/queries'
import Iconify from 'src/components/iconify'
import UserItem from './user-item'
import ModalAddVisualizer from './modal-add-visualizer'

type TProps = {
  project: IProject
}

export default function UserTab(props: TProps) {
  const { project } = props

  const [search, setSearch] = useState('')
  const modalAddVisualizer = useBoolean()

  const { data, refetch } = useQuery(USERS_VIEW_PROJECT, {
    variables: {
      projectId: project.id,
    },
  })

  const users: IUser[] = useMemo(() => {
    if (!data) return []
    return data.usersViewProject
  }, [data])

  const filteredUsers = useMemo(() => {
    const lowerSearch = search.toLowerCase()
    return users.filter(
      (user) =>
        (user.fullname && user.fullname.toLowerCase().includes(lowerSearch)) ||
        (user.email && user.email.toLowerCase().includes(lowerSearch))
    )
  }, [users, search])

  return (
    <React.Fragment>
      <Card
        sx={{
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TextField
            size="small"
            variant="outlined"
            placeholder="Buscar visualizador"
            InputProps={{
              startAdornment: <Iconify icon="material-symbols:search" width={18} mr={1} />,
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Box
            sx={{
              display: 'flex',
              gap: 2,
            }}
          >
            <Button variant="contained" color="primary" onClick={modalAddVisualizer.onTrue}>
              <Iconify icon="ic:round-person-add" width={18} mr={1} />
              Agregar visualizador
            </Button>
          </Box>
        </Box>
      </Card>
      {filteredUsers.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            color: 'text.disabled',
          }}
        >
          No hay visualizadores asignados al proyecto
        </Box>
      )}
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {filteredUsers.map((user) => (
          <UserItem key={user.id} user={user} projectId={project.id} refetch={refetch} />
        ))}
      </Box>
      <ModalAddVisualizer modal={modalAddVisualizer} refetch={refetch} project={project} />
    </React.Fragment>
  )
}
