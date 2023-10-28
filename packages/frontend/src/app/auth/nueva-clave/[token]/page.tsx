import NewPasswordView from 'src/sections/auth/new-password-view'

export const metadata = {
  title: 'Nueva contraseña',
}

export default function NewPasswordPage({ params }: { params: { token: string } }) {
  return <NewPasswordView token={params.token} />
}
