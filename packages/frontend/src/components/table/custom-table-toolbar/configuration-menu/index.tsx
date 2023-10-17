import React, { useState, useEffect, useCallback } from 'react'
import { Menu, Box, IconButton, Typography, TextField, Tooltip } from '@mui/material'
import useTable from 'src/components/table/use-table'
import { useBoolean } from 'src/hooks/use-boolean'
import Scrollbar from 'src/components/scrollbar'
import Iconify from 'src/components/iconify'
import type { TUseMenu } from 'src/hooks/use-menu'
import { verifyConfig } from '../../utils'
import SaveConfigModal from './save-config-modal'

type ConfigurationMenuProps = {
  menu: TUseMenu
  id: string
}

type TConfig = {
  name: string
  value: string
}

const ConfigurationMenu = (props: ConfigurationMenuProps) => {
  const { menu, id } = props
  const [configs, setConfigs] = useState<TConfig[]>([])
  const [search, setSearch] = useState<string>('')
  const saveConfigModal = useBoolean()

  const { loadConfig, loadDefaltConfig } = useTable()

  const handleLoadConfig = (config: string) => {
    loadConfig(config)
    menu.close()
  }

  const handleLoadDefaultConfig = () => {
    loadDefaltConfig()
    menu.close()
  }

  const handleDeleteConfig = (name: string) => {
    localStorage.removeItem(`tableConfig-${id}-${name}`)
    setConfigs((prevConfigs) => prevConfigs.filter((config) => config.name !== name))
  }

  const getConfigs = useCallback(() => {
    const loadedConfigs = Object.entries(localStorage)
      .filter(([key]) => key.includes(`tableConfig-${id}`))
      .filter(([_, value]) => verifyConfig(value))
      .map(([key, value]) => {
        const name = key.split('-').slice(-1)[0]
        return { name, value }
      })
    setConfigs(loadedConfigs)
  }, [id])

  useEffect(() => {
    if (menu.isOpen) {
      getConfigs()
    }
  }, [getConfigs, menu.isOpen])

  return (
    <React.Fragment>
      <Menu
        keepMounted
        id="simple-menu"
        anchorEl={menu.element}
        onClose={menu.close}
        open={menu.isOpen}
      >
        <Scrollbar
          sx={{
            maxHeight: '33vh',
            minWidth: 200,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              p: 2,
              alignItems: 'center',
              width: 200,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TextField
                fullWidth
                size="small"
                variant="standard"
                label="Buscar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  flexGrow: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
                onClick={handleLoadDefaultConfig}
              >
                <em>Por defecto</em>
              </Typography>
              <IconButton disabled size="small">
                <Iconify icon="uil:times" />
              </IconButton>
            </Box>
            {configs
              .filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
              .map(({ name, value }, index) => (
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      flexGrow: 1,
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'primary.main',
                      },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    key={index}
                    onClick={() => handleLoadConfig(value)}
                  >
                    {name}
                  </Typography>
                  <Tooltip title="Eliminar configuración">
                    <IconButton onClick={() => handleDeleteConfig(name)} size="small">
                      <Iconify icon="uil:times" />
                    </IconButton>
                  </Tooltip>
                </Box>
              ))}
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Tooltip title="Agregar configuración">
                <IconButton onClick={saveConfigModal.onTrue} size="small">
                  <Iconify icon="uil:plus" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Scrollbar>
      </Menu>
      <SaveConfigModal modal={saveConfigModal} id={id} getConfigs={getConfigs} />
    </React.Fragment>
  )
}

export default ConfigurationMenu
