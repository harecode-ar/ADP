import type { IStage } from '@adp/shared'
import React, { useMemo } from 'react'
import { Button, Card, IconButton, InputBase, Paper, Stack, Typography } from '@mui/material'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import { useBoolean } from 'src/hooks/use-boolean'
import { CREATE_STAGE_NOTE } from 'src/graphql/mutations'
import { enqueueSnackbar } from 'notistack'
import Iconify from 'src/components/iconify'
import { logger } from 'src/utils/logger'
import AttachFileModal from 'src/sections/shared/attach-file-modal'

// ----------------------------------------------------------------------
type TProps = {
  refetch: () => void
  subStage: IStage
}

export default function NotesForm(props: TProps) {
  const { subStage, refetch } = props
  const attachFileModal = useBoolean()

  const [createStageNote] = useMutation(CREATE_STAGE_NOTE)

  const formik = useFormik({
    initialValues: {
      message: '',
      files: [],
    },
    onSubmit: async (values) => {
      try {
        await createStageNote({
          variables: {
            message: values.message,
            stageId: subStage.id,
            files: values.files,
          },
        })
        formik.resetForm()
        refetch()
      } catch (error) {
        logger.error(error)
        enqueueSnackbar(`La nota no pudo ser creada`, { variant: 'error' })
      }
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
    <Card sx={{ p: 2 }}>
      <Paper variant="outlined" sx={{ p: 1, flexGrow: 1, bgcolor: 'transparent' }}>
        <InputBase
          fullWidth
          multiline
          maxRows={4}
          placeholder="Escribe una nota"
          sx={{ px: 1 }}
          value={formik.values.message}
          onChange={(e) => formik.setFieldValue('message', e.target.value)}
        />

        <Stack direction="row" alignItems="center">
          <Stack direction="row" flexGrow={1} alignItems="center">
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
    </Card>
  )
}
