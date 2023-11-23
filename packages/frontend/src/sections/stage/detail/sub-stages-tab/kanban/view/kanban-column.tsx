import { IStage } from '@adp/shared'
import Paper from '@mui/material/Paper'
import { Stack, Typography } from '@mui/material'
import KanbanTaskItem from './kanban-task-item'

// ----------------------------------------------------------------------

type Props = {
  subStages: IStage[]
  stage: IStage
  title: string
  refetch: VoidFunction
}

export default function KanbanColumn({ subStages, stage, title, refetch }: Props) {
  return (
    <Paper
      sx={{
        px: 2,
        borderRadius: 2,
        bgcolor: 'background.neutral',
      }}
    >
      <Stack py={2}>
        <Typography variant="h6" sx={{ border: 'none' }}>
          {title}
        </Typography>

        <Stack
          spacing={2}
          sx={{
            py: 3,
            width: 225,
          }}
        >
          {subStages?.map((subStageItem, index) => (
            <KanbanTaskItem
              key={index}
              stage={stage}
              subStageItem={subStageItem}
              refetch={refetch}
            />
          ))}
        </Stack>
      </Stack>
    </Paper>
  )
}
