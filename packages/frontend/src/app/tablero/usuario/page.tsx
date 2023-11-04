import { redirect } from 'next/navigation'
import { paths } from 'src/routes/paths'

export const metadata = {
  title: 'Usuarios',
}

export default async function HomePage() {
  redirect(paths.dashboard.user.list)
}
