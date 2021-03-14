import { useMemo } from 'react'

export const useRefresh = () => {
  const wasRefreshed = useMemo(() => {
    return performance.navigation.type == performance.navigation.TYPE_RELOAD
  }, [performance])

  return { wasRefreshed }
}