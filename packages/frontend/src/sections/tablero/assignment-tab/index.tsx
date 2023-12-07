'use client'

import { IProject } from '@adp/shared'
import React, { useState, useMemo } from 'react'
import NextLink from 'next/link'
import {
  Box,
  Card,
  Stack,
  Avatar,
  TextField,
  Typography,
  InputAdornment,
  Link,
} from '@mui/material'
import { GET_USER_PROJECTS } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import { _socials } from 'src/_mock'
import Iconify from 'src/components/iconify'
import { paths } from 'src/routes/paths'
import { getStorageFileUrl } from 'src/utils/storage'
import AssignmentItem from './assignment-item';

export default function AssignmentTab() {
  const [search, setSearch] = useState('')

  const handleSearch = (event: any) => {
    const { value } = event.target
    setSearch(value)
  }

  const projectQuery = useQuery(GET_USER_PROJECTS)

  const projects: IProject[] = useMemo(() => {
    if (!projectQuery.data) return []
    return projectQuery.data.userProjects
  }, [projectQuery.data])

  const filteredProjects = useMemo(
    () => projects.filter((project) => project.name.toLowerCase().includes(search.toLowerCase())),
    [projects, search]
  )

  const notProjectsFound = !filteredProjects.length

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Stack spacing={2} justifyContent="end" direction={{ xs: 'column', sm: 'row' }}>
        <TextField
          value={search}
          onChange={handleSearch}
          placeholder="Buscar..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: 1, sm: 260 } }}
        />
      </Stack>

      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Proyectos
        </Typography>
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)',
          }}
        >
          

          {filteredProjects.map((project) => (
            <AssignmentItem key={project.id} project={project} />
          ))}
        </Box>
        {notProjectsFound && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography>No se encontraron resultados</Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

// type AreaCardProps = {
//   area: IArea
// }

// function AreaCard({ area }: AreaCardProps) {
//   const { id, name, color, responsible } = area

//   const { data } = useQuery(PROJECT_AREA_REPORT, {
//     variables: {
//       areaId: Number(id),
//     },
//     skip: !id,
//   })

//   const report: IProjectAreaReport = useMemo(() => {
//     if (!data) return { new: 0, inProgress: 0, completed: 0, cancelled: 0 }
//     return data.projectAreaReport
//   }, [data])

//   return (
//     <Link
//       component={NextLink}
//       href={paths.dashboard.area.detail.replace(':id', String(id))}
//       underline="none"
//     >
//       <Card
//         sx={{
//           py: 5,
//           display: 'flex',
//           position: 'relative',
//           alignItems: 'center',
//           flexDirection: 'column',
//           cursor: 'pointer',
//           backgroundColor: color,
//           height: '100%',
//         }}
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             height: '100%',
//           }}
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               flexDirection: 'column',
//             }}
//           >
//             <Avatar
//               alt={responsible?.fullname || 'Sin responsable'}
//               src={responsible?.image ? getStorageFileUrl(responsible.image) : '/broken-image.jpg'}
//               sx={{ width: 64, height: 64, mb: 3 }}
//             />

//             <Typography
//               variant="subtitle1"
//               color="black"
//               fontSize={20}
//               sx={{
//                 textAlign: 'center',
//               }}
//             >
//               {name}
//             </Typography>

//             <Typography
//               variant="body2"
//               sx={{ color: 'text.secondary', mb: 0.5, mt: 0.5 }}
//               fontSize={15}
//             >
//               {responsible?.fullname || 'Sin responsable'}
//             </Typography>
//           </Box>

//           <Box
//             sx={{
//               display: 'flex',
//               gap: 2,
//             }}
//           >
//             <ProyectAreaReportItem icon="entypo:new" value={report.new} size={17} />
//             <ProyectAreaReportItem icon="mdi:tools" value={report.inProgress} size={15} />
//             <ProyectAreaReportItem
//               icon="fluent-mdl2:completed-solid"
//               value={report.completed}
//               size={15}
//             />
//             <ProyectAreaReportItem icon="ic:sharp-cancel" value={report.cancelled} size={18} />
//           </Box>
//         </Box>
//       </Card>
//     </Link>
//   )
// }
