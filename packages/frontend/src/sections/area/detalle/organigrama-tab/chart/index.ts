import dynamic from 'next/dynamic'

const OrganizationalChart = dynamic(() => import('./chart'), {
  ssr: false,
})

export * from './types'

export default OrganizationalChart
