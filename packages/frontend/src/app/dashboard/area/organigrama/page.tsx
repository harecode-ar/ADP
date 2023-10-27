import OrganigramaView from 'src/sections/area/organigrama/view'
import { AreaTreeProvider } from 'src/contexts/area-tree-context'

export const metadata = {
  title: 'Area: Organigrama',
}

export default function Page() {
  return (
    <AreaTreeProvider>
      <OrganigramaView />
    </AreaTreeProvider>
  )
}
