import { IUserCard } from '@adp/shared'
import UserDetailView from 'src/sections/user/detalle/view'

export const metadata = {
  title: 'Usuario: Detalle',
}

export default function Page({
  params,
}: {
  params: { id: string }
}) {
  return <UserDetailView userId={params.id} />
}
