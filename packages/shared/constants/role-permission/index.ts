import { ROLE_MAP } from '../role'
import { PERMISSION_MAP } from '../permission'

export const ROLE_PERMISSION_MAP = {
  [ROLE_MAP.ADMIN]: [...Object.values(PERMISSION_MAP)],
  [ROLE_MAP.USER]: [...Object.values(PERMISSION_MAP)],
}
