import { useRouter } from 'next/router'
import { paths } from 'src/routes/paths'
import { useAuthContext } from './use-auth-context'

export const useRequiredRoles = (requiredRoles: string[], redirect: boolean = true) => {
  const { role } = useAuthContext()
  const router = useRouter()

  const hasRoles = requiredRoles.some((r) => role?.name === r)

  if (redirect && !hasRoles) {
    router.push(paths[403])
  }

  return hasRoles
}
