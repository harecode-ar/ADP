'use client'

import React, { useState, memo, useCallback } from 'react'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { useTheme } from '@mui/material/styles'
import {
  Box,
  List,
  Stack,
  InputBase,
  IconButton,
  Dialog,
  InputAdornment,
  Typography,
} from '@mui/material'
import { dialogClasses } from '@mui/material/Dialog'
import { useBoolean } from 'src/hooks/use-boolean'
import { useResponsive } from 'src/hooks/use-responsive'
import { useEventListener } from 'src/hooks/use-event-listener'
import { useAuthContext } from 'src/auth/hooks'
import Label from 'src/components/label'
import Iconify from 'src/components/iconify'
import Scrollbar from 'src/components/scrollbar'
import { useRouter } from 'src/routes/hooks'
import { hasRole, hasPermission } from 'src/utils/nav-config'
import ResultItem from './result-item'
import { useNavData } from '../../dashboard/config-navigation'
import { applyFilter, groupedData, getAllItems } from './utils'

function Searchbar() {
  const theme = useTheme()

  const router = useRouter()

  const search = useBoolean()

  const lgUp = useResponsive('up', 'lg')

  const [searchQuery, setSearchQuery] = useState('')

  const navData = useNavData()

  const { role, permissions } = useAuthContext()

  const filteredNavData = navData
    .filter((item) => hasRole(item.roles, role) && hasPermission(item.permissions, permissions))
    .map((item) => ({
      ...item,
      items: item.items.filter(
        (subItem) => hasRole(subItem.roles, role) && hasPermission(subItem.permissions, permissions)
      ),
    }))

  const handleClose = useCallback(() => {
    search.onFalse()
    setSearchQuery('')
  }, [search])

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'k' && event.metaKey) {
      search.onToggle()
      setSearchQuery('')
    }
  }

  useEventListener('keydown', handleKeyDown)

  const handleClick = useCallback(
    (path: string) => {
      if (path.includes('http')) {
        window.open(path)
      } else {
        router.push(path)
      }
      handleClose()
    },
    [handleClose, router]
  )

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchQuery(event.target.value)
  }, [])

  const dataFiltered = applyFilter({
    inputData: getAllItems({ data: filteredNavData }),
    query: searchQuery,
  })

  const notFound = searchQuery && !dataFiltered.length

  const renderItems = () => {
    const data = groupedData(dataFiltered)

    return Object.keys(data)
      .sort((a, b) => -b.localeCompare(a))
      .map((group, index) => (
        <List key={group || index} disablePadding>
          {data[group].map((item) => {
            const { title, path } = item

            const partsTitle = parse(title, match(title, searchQuery))

            const partsPath = parse(path, match(path, searchQuery))

            return (
              <ResultItem
                path={partsPath}
                title={partsTitle}
                key={`${title}${path}`}
                groupLabel={searchQuery && group}
                onClickItem={() => handleClick(path)}
              />
            )
          })}
        </List>
      ))
  }

  const renderButton = (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={search.onTrue}>
        <Iconify icon="eva:search-fill" />
      </IconButton>

      {lgUp && <Label sx={{ px: 0.75, fontSize: 12, color: 'text.secondary' }}>⌘K</Label>}
    </Stack>
  )

  return (
    <React.Fragment>
      {renderButton}

      <Dialog
        fullWidth
        maxWidth="sm"
        open={search.value}
        onClose={handleClose}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: 0,
        }}
        PaperProps={{
          sx: {
            mt: 15,
            overflow: 'unset',
          },
        }}
        sx={{
          [`& .${dialogClasses.container}`]: {
            alignItems: 'flex-start',
          },
        }}
      >
        <Box sx={{ p: 3, borderBottom: `solid 1px ${theme.palette.divider}` }}>
          <InputBase
            fullWidth
            autoFocus
            placeholder="Buscar..."
            value={searchQuery}
            onChange={handleSearch}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" width={24} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            endAdornment={<Label sx={{ letterSpacing: 1, color: 'text.secondary' }}>esc</Label>}
            inputProps={{
              sx: { typography: 'h6' },
            }}
          />
        </Box>

        <Scrollbar sx={{ p: 3, pt: 2, height: 400 }}>
          {notFound ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Typography>No se encontraron resultados</Typography>
            </Box>
          ) : (
            renderItems()
          )}
        </Scrollbar>
      </Dialog>
    </React.Fragment>
  )
}

export default memo(Searchbar)
