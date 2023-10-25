// sections
import AreaDetailView from 'src/sections/area/detalle/view'

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Area: Detalle',
}

export default function Page({ params }: { params: { area_id: string } }) {
  return <AreaDetailView areaId={params.area_id} />
}
