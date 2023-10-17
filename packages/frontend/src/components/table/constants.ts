import { EDensity, EColumnType, EOperator } from './types'
import type { TDensity, TOperator, TColumnType } from './types'

export const DENSITY_MAP: Record<EDensity, TDensity> = {
  [EDensity.COMPACT]: {
    key: EDensity.COMPACT,
    label: 'Compacto',
    icon: 'material-symbols:view-headline-rounded',
    value: 34,
  },
  // standard: {
  //   key: 'standard',
  //   label: 'Estándar',
  //   icon: 'material-symbols:view-list',
  //   value: 44,
  // },
  [EDensity.COMFORTABLE]: {
    key: EDensity.COMFORTABLE,
    label: 'Comodo',
    icon: 'ic:round-view-agenda',
    value: 54,
  },
}

export const OPERATOR_ARRAY = [
  EOperator.EQ,
  EOperator.NEQ,
  EOperator.GT,
  EOperator.GTE,
  EOperator.LT,
  EOperator.LTE,
  EOperator.LIKE,
  EOperator.NLIKE,
]

export const OPERATOR_TRANSLATE: Record<EOperator, string> = {
  [EOperator.EQ]: 'igual a',
  [EOperator.NEQ]: 'distinto a',
  [EOperator.GT]: 'mayor a',
  [EOperator.GTE]: 'mayor o igual a',
  [EOperator.LT]: 'menor a',
  [EOperator.LTE]: 'menor o igual a',
  [EOperator.LIKE]: 'contiene',
  [EOperator.NLIKE]: 'no contiene',
}

export const COLUMN_TYPE_ARRAY = [
  EColumnType.STRING,
  EColumnType.NUMBER,
  EColumnType.BOOLEAN,
  EColumnType.SELECT,
  EColumnType.TIME,
  EColumnType.DATE,
  EColumnType.ACTIONS,
]

export const OPERATOR_BY_COLUMN_TYPE = {
  [EColumnType.STRING]: ['eq', 'neq', 'like', 'nlike'],
  [EColumnType.NUMBER]: ['eq', 'neq', 'gt', 'gte', 'lt', 'lte'],
  [EColumnType.BOOLEAN]: ['eq', 'neq'],
  [EColumnType.SELECT]: ['eq', 'neq'],
  [EColumnType.TIME]: ['eq', 'neq', 'gt', 'gte', 'lt', 'lte'],
  [EColumnType.DATE]: ['eq', 'neq', 'gt', 'gte', 'lt', 'lte'],
} as Record<TColumnType, TOperator[]>
