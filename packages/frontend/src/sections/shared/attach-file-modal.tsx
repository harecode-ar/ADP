import React, { useState, useCallback } from 'react'
import { useBoolean } from 'src/hooks/use-boolean'
import { Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import Iconify from 'src/components/iconify'
import Upload from 'src/components/upload/upload'

type TProps = {
  onSuccess: (files: any[]) => void
  modal: ReturnType<typeof useBoolean>
  files: any[]
}

export default function AttachFileModal({ onSuccess, modal, files: attachedFiles }: TProps) {
  const [files, setFiles] = useState<(File | string)[]>(attachedFiles)

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
      setFiles([...files, ...newFiles])
    },
    [files]
  )

  const handleRemoveFile = (inputFile: File | string) => {
    const filtered = files.filter((file) => file !== inputFile)
    setFiles(filtered)
  }

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  const handleSuccess = () => {
    onSuccess(files)
    setFiles([])
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={modal.value} onClose={modal.onFalse}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>Adjuntar archivos</DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <Upload
          multiple
          files={files}
          onDrop={handleDrop}
          onRemove={handleRemoveFile}
          maxFiles={4}
        />
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={modal.onFalse}>
          Cancelar
        </Button>
        {!!files.length && (
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleRemoveAllFiles}
            startIcon={<Iconify icon="mdi:times" />}
          >
            Eliminar todos
          </Button>
        )}
        <Button
          variant="contained"
          startIcon={<Iconify icon="gg:check-o" />}
          onClick={handleSuccess}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
