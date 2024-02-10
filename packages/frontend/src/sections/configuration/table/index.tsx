import { EConfigurationKey } from '@adp/shared'
import React, { useEffect, useMemo } from 'react'
import CustomTable from 'src/components/table/custom-table'
import CustomTableSearch from 'src/components/table/custom-table-search'
import CustomTableToolbar from 'src/components/table/custom-table-toolbar'
import CustomTableSkeleton from 'src/components/table/custom-table-skeleton'
import { useTable } from 'src/components/table'
import { useConfigurationContext } from 'src/contexts/configuration-context'
import { useBoolean } from 'src/hooks/use-boolean'
import { Box, IconButton } from '@mui/material'
import Iconify from 'src/components/iconify'
import PercentageAlertMarginProjectModal from './modals/percentage-alert-margin-project'
import PercentageAlertMarginStageModal from './modals/percentage-alert-margin-stage'
import { COLUMNS, TABLE_ID } from './config'

export default function Table() {
  const percentageAlertMarginProjectModal = useBoolean()
  const percentageAlertMarginStageModal = useBoolean()
  const { selected, setMultiple } = useTable()
  const { configurations, loading, refetch } = useConfigurationContext()

  const mappedConfigurations = useMemo(
    () =>
      configurations.map((configuration) => ({
        ...configuration,
        id: configuration.key,
      })),
    [configurations]
  )

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setMultiple(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = () => {
    if (selected.length > 1) return

    if (selected[0] === EConfigurationKey.PERCENTAGE_ALERT_MARGIN_PROJECT) {
      percentageAlertMarginProjectModal.onTrue()
    }

    if (selected[0] === EConfigurationKey.PERCENTAGE_ALERT_MARGIN_STAGE) {
      percentageAlertMarginStageModal.onTrue()
    }
  }

  return (
    <Box>
      {loading ? (
        <CustomTableSkeleton columns={COLUMNS.length} search />
      ) : (
        <React.Fragment>
          <CustomTableToolbar id={TABLE_ID} columns={COLUMNS} download refetch={refetch} />
          <CustomTableSearch />
          <CustomTable
            id={TABLE_ID}
            columns={COLUMNS}
            data={mappedConfigurations}
            action={
              <React.Fragment>
                {selected.length === 1 && (
                  <IconButton onClick={handleClick}>
                    <Iconify icon="material-symbols:edit" />
                  </IconButton>
                )}
              </React.Fragment>
            }
          />
        </React.Fragment>
      )}
      {percentageAlertMarginProjectModal.value && (
        <PercentageAlertMarginProjectModal modal={percentageAlertMarginProjectModal} refetch={refetch} />
      )}
      {percentageAlertMarginStageModal.value && (
        <PercentageAlertMarginStageModal modal={percentageAlertMarginStageModal} refetch={refetch} />
      )}
    </Box>
  )
}
