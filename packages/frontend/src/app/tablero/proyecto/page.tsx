import { redirect } from 'next/navigation'
import { paths } from 'src/routes/paths'

export const metadata = {
  title: 'Proyecto',
}

export default async function HomePage() {
  redirect(paths.dashboard.project.new)
}
