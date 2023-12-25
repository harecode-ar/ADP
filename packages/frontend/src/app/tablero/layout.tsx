'use client'

// auth
import { AuthGuard } from 'src/auth/guard'
import { ConfigurationProvider } from 'src/contexts/configuration-context'
// components
import DashboardLayout from 'src/layouts/dashboard'

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <AuthGuard>
      <ConfigurationProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </ConfigurationProvider>
    </AuthGuard>
  )
}
