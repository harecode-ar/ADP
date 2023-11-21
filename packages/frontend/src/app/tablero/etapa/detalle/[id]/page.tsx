import StageDetailView from 'src/sections/stage/detail/view'

export const metadata = {
  title: 'Etapa: Detalle',
}

export default function Page({ params }: { params: { id: string } }) {
  return <StageDetailView projectId={params.id} />
}
