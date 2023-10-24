import { redirect } from 'next/navigation'
import { paths } from 'src/routes/paths'

export const metadata = {
  title: 'Area',
}

export default async function HomePage() {
  redirect(paths.dashboard.area.listado)
}
