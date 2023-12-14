import { redirect } from 'next/navigation'
import { paths } from 'src/routes/paths'

export const metadata = {
  title: 'Sub Etapa',
}

export default async function HomePage() {
  redirect(paths.dashboard.root)
}
