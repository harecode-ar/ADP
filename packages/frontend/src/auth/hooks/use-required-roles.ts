import { useRouter } from 'next/router'
import { useAuthContext } from './use-auth-context'

export const useRequiredRoles = (requiredRoles: string[], redirect: boolean = true) => {
  const { role } = useAuthContext()
  const router = useRouter()

  const hasRoles = requiredRoles.some((r) => role?.name === r)

  if (redirect && !hasRoles) {
    router.push('/403')
  }

  return hasRoles
}
