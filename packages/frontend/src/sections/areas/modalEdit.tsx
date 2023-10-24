'use client'

import React, { useEffect, useMemo } from 'react'
import { Typography, Button, Modal, Box, TextField, Grid, Backdrop } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useFormik } from 'formik'
import { useMutation, useQuery } from '@apollo/client'
import { AREA } from 'src/graphql/queries'
import { UPDATE_AREA } from 'src/graphql/mutations'
import { useBoolean } from 'src/hooks/use-boolean'
import * as Yup from 'yup'


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

const areaSchema = Yup.object().shape({
    name: Yup.string().required('Nombre requerido'),
})

type TProps = {
    modal: ReturnType<typeof useBoolean>
    areaId: number
    refetch: () => void
}

const ModalEdit = (props: TProps) => {

    const { modal, areaId, refetch } = props



    const formik = useFormik({
        initialValues: {
            id: '',
            name: '',
            description: '',
            responsable: '',
        },
        onSubmit: async (values) => {
            try {
                console.log("Editado correctamente", values)
                refetch()
            } catch (error) {
                console.error(error)
            }
        },
        validationSchema: areaSchema,
    })

    // const { data, loading, refetch } = useQuery(AREA, {
    //     variables: {
    //         id: areaId
    //     }
    // })

    // const area = useMemo(() => {
    //     if (!data) return null
    //     return data
    // }, [data])

    // useEffect(() => {
    //     if (area && !formik.values.id) {
    //         formik.setValues({
    //             id: area.id,
    //             name: area.name,
    //             description: area.description,
    //             responsable: area.responsibleId,
    //         })
    //     }
    // }, [formik, area])

    return (

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
                    Editar área
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Nombre"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formik.values.name}
                                    error={Boolean(formik.errors.name)}
                                    helperText={formik.errors.name}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="description"
                                    name="description"
                                    label="Descripción"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="responsable"
                                    name="responsable"
                                    label="Responsable"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.responsable}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="success" sx={{ m: 1 }} onClick={() => formik.handleSubmit()}>
                                    <Iconify sx={{ mx: 1 }} icon="mingcute:check-fill" />Enviar
                                </Button>
                                <Button onClick={modal.onFalse} variant="contained">
                                    <Iconify sx={{ mx: 1 }} icon="ic:baseline-cancel" />Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Typography>
            </Box>
        </Modal >

    )
}

export default ModalEdit