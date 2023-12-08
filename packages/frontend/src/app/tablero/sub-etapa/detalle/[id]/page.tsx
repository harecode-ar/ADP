import SubStageDetailView from 'src/sections/sub-stage/detail/view'

export const metadata = {
  title: 'Sub Etapa: Detalle',
}

export default function Page({ params }: { params: { id: string } }) {
  return <SubStageDetailView subStageId={params.id} />
}
