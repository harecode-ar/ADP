import { Box, Card }  from '@mui/material';

import type { IProjectNote } from '@adp/shared/types'
import PostCommentItem from '../notes-comment';

// ----------------------------------------------------------------------

type TProps = {
  notes: IProjectNote[]
};
export default function PostCommentList({notes }: TProps) {
  return (
    <Card>
      <Box>
        {notes.map((note) => {
          const commonProps = { // Asegúrate de cómo obtienes el nombre dependiendo de tus datos
            message: note.message, // Asegúrate de obtener la URL del avatar desde el objeto correspondiente // Ajusta cómo determinas si hay respuestas dependiendo de tus datos
          };

          return (
            <Box key={note.id}>
              <PostCommentItem {...commonProps} />
            </Box>
          );
        })}
      </Box>
    </Card>
  );
}
