// sections
import AreaDetailView from 'src/sections/area/detalle/view'

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Area: Detalle',
}

export default function Page({ params }: { params: { id: string } }) {
  return <AreaDetailView areaId={params.id} />
}
