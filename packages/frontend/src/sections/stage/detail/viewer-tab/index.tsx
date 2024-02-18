import { IStage, IUser } from '@adp/shared'
import React, { useMemo, useState } from 'react'
import { Card, Box, TextField, Button } from '@mui/material'
import { useBoolean } from 'src/hooks/use-boolean'
import { useQuery } from '@apollo/client'
import { useResponsive } from 'src/hooks/use-responsive'
import { USERS_VIEW_STAGE } from 'src/graphql/queries'
import Iconify from 'src/components/iconify'
import UserItem from './contact-item'
import ModalAddVisualizer from './modal-add-visualizer'

type TProps = {
  stage: IStage
}

export default function ViewerTab(props: TProps) {
  const { stage } = props

  const [search, setSearch] = useState('')
  const modalAddVisualizer = useBoolean()
  const isMobile = useResponsive('down', 'sm')

  const { data, refetch } = useQuery(USERS_VIEW_STAGE, {
    variables: {
      stageId: stage.id,
    },
  })

  const users: IUser[] = useMemo(() => {
    if (!data) return []
    return data.usersViewStage
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
            gap: 2,
            flexDirection: isMobile ? 'column' : 'row',
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
            fullWidth={isMobile}
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
          No hay visualizadores asignados a esta etapa
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
          <UserItem key={user.id} user={user} stageId={stage.id} refetch={refetch} />
        ))}
      </Box>
      <ModalAddVisualizer modal={modalAddVisualizer} refetch={refetch} stage={stage} />
    </React.Fragment>
  )
}
