'use client'

import React, { useState } from 'react'
import { Typography, Button, Modal, Box, Grid, Backdrop, Snackbar, Alert } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useMutation } from '@apollo/client'
import { useBoolean } from 'src/hooks/use-boolean'
import { DELETE_AREA } from 'src/graphql/mutations'
import { useTable } from 'src/components/table'


const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};



type TProps = {
    modal: ReturnType<typeof useBoolean>
    areaId: number;
    refetch: () => void
}

const ModalDelete = (props: TProps) => {

    const { modal, areaId, refetch} = props
    const [deleteArea] = useMutation(DELETE_AREA)
    const [openAlert, setOpenAlert] = useState(false);
    const [openAlertError, setOpenAlertError] = useState(false);
    const { setSelected } = useTable()


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
        setOpenAlertError(false)
    }

    const onDelete = async (id: number) => {
        try {
            await deleteArea({
                variables: {
                    id
                }
            })
            setOpenAlert(true);
            modal.onFalse()
            refetch()
            setSelected([])
            
        } catch (err) {
            console.log(err)
        }
    }

    return (

        <React.Fragment>
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} >
                <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
                    Área borrada correctamente.
                </Alert>
            </Snackbar>
            <Snackbar open={openAlertError} autoHideDuration={3000} onClose={handleClose} >
                <Alert severity="error" sx={{ width: '100%' }} onClose={handleClose}>
                    El Área no pudo ser borrada.
                </Alert>
            </Snackbar>
            <Modal
                open={modal.value}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Eliminar área
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        ¿Está seguro de eliminar dicha area?
                        <Box sx={{ flexGrow: 1, mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="error" sx={{ m: 1 }} onClick={() => onDelete(areaId)}>
                                        <Iconify sx={{ mx: 1 }} icon="material-symbols:delete" />Eliminar
                                    </Button>
                                    <Button onClick={modal.onFalse} variant="contained" >
                                        <Iconify sx={{ mx: 1 }} icon="ic:baseline-cancel" />Cancelar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Typography>
                </Box>
            </Modal >
        </React.Fragment>
    )
}

export default ModalDelete