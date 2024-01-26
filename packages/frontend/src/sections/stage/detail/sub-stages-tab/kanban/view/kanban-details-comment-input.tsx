import React, { useMemo } from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import Iconify from 'src/components/iconify'
import { useFormik } from 'formik'
import { useMutation } from '@apollo/client'
import { useAuthContext } from 'src/auth/hooks'
import { useSnackbar } from 'src/components/snackbar'
import { CREATE_STAGE_NOTE } from 'src/graphql/mutations'
import { getStorageFileUrl } from 'src/utils/storage'
import { useBoolean } from 'src/hooks/use-boolean'
import { Typography } from '@mui/material'
import AttachFileModal from 'src/sections/shared/attach-file-modal'

type TProps = {
  stageId: number
  refetch: VoidFunction
}

export default function KanbanDetailsCommentInput(props: TProps) {
  const { stageId, refetch } = props
  const attachFileModal = useBoolean()
  const { user } = useAuthContext()
  const [createStageNote] = useMutation(CREATE_STAGE_NOTE)
  const { enqueueSnackbar } = useSnackbar()

  const formik = useFormik({
    initialValues: {
      message: '',
      files: [],
    },
    onSubmit: (values, { resetForm }) => {
      createStageNote({
        variables: {
          message: values.message,
          stageId,
          files: values.files,
        },
      })
        .then(() => {
          refetch()
          resetForm()
          enqueueSnackbar('Nota creada correctamente', {
            variant: 'success',
          })
        })
        .catch(() => {
          enqueueSnackbar('Error al crear la nota', {
            variant: 'error',
          })
        })
    },
  })

  const isDisabled = useMemo(
    () =>
      (formik.values.message.length === 0 && formik.values.files.length === 0) ||
      formik.isSubmitting,
    [formik.isSubmitting, formik.values]
  )

  const handleAttachFile = (files: any[]) => {
    formik.setFieldValue('files', files)
    attachFileModal.onFalse()
  }

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        py: 3,
        px: 2.5,
      }}
    >
      {!!user && (
        <Avatar
          src={getStorageFileUrl(
            user.image,
            'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg'
          )}
          alt={user.fullname}
        />
      )}

      <Paper variant="outlined" sx={{ p: 1, flexGrow: 1, bgcolor: 'transparent' }}>
        <InputBase
          fullWidth
          multiline
          rows={2}
          placeholder="Escribe una nota"
          sx={{ px: 1 }}
          value={formik.values.message}
          onChange={(e) => formik.setFieldValue('message', e.target.value)}
        />

        <Stack direction="row" alignItems="center">
          <Stack direction="row" flexGrow={1}>
            <IconButton onClick={attachFileModal.onTrue}>
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>
            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              {formik.values.files.length === 0 && 'No hay archivos adjuntos'}
              {formik.values.files.length === 1 && '1 archivo adjunto'}
              {formik.values.files.length > 1 && `${formik.values.files.length} archivos adjuntos`}
            </Typography>
          </Stack>

          <Button variant="contained" onClick={() => formik.handleSubmit()} disabled={isDisabled}>
            {formik.isSubmitting ? 'Publicando...' : 'Publicar'}
          </Button>
        </Stack>
      </Paper>
      {attachFileModal.value && (
        <AttachFileModal
          files={formik.values.files}
          modal={attachFileModal}
          onSuccess={handleAttachFile}
        />
      )}
    </Stack>
  )
}
