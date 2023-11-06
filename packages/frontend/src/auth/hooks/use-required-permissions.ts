import { useRouter } from 'next/router'
import { paths } from 'src/routes/paths'
import { useAuthContext } from './use-auth-context'

export const usePermissions = (
  requiredPermissions: string[],
  strict: boolean = true,
  redirect: boolean = true
) => {
  const { permissions } = useAuthContext()
  const mappedPermissions = permissions.map((permission) => permission.name)
  const router = useRouter()

  const hasPermissions = strict
    ? requiredPermissions.every((permission) => mappedPermissions.includes(permission))
    : requiredPermissions.some((permission) => mappedPermissions.includes(permission))

  if (redirect && !hasPermissions) {
    router.push(paths[403])
  }

  return hasPermissions
}
