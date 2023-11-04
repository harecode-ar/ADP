import ProjectDetailView from 'src/sections/project/detalle/view'

export const metadata = {
  title: 'Proyecto: Detalle',
}

export default function Page({ params }: { params: { id: string } }) {
  return <ProjectDetailView projectId={params.id} />
}
