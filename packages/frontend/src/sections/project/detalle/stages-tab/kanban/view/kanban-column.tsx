import { IStage } from '@adp/shared'
import Paper from '@mui/material/Paper'
import { Stack, Typography } from '@mui/material'
import KanbanTaskItem from './kanban-task-item'

// ----------------------------------------------------------------------

type Props = {
  stage: IStage[]
  title: string
}

export default function KanbanColumn({ stage, title }: Props) {
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
          {stage.map((stageItem, index) => (
            <KanbanTaskItem key={index} task={stageItem} />
          ))}
        </Stack>
      </Stack>
    </Paper>
  )
}
