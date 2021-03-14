import { useMemo } from 'react'

export const useAuth = () => {
  const currentUser = useMemo(() => {
    return JSON.parse(localStorage.getItem('currentUser'))
  }, [localStorage])

  const isCEO = currentUser?.user?.user_type === "manager" && currentUser?.user?.is_admin
  const isRegularManager = currentUser?.user?.user_type === "manager" && !currentUser?.user?.is_admin
  const isAdministrator = currentUser?.user?.user_type === "secretary" && currentUser?.user?.is_admin
  const isRegularSecretary = currentUser?.user?.user_type === "secreaty" && !currentUser?.user?.is_admin

  return {
    isCEO,
    isRegularManager,
    isAdministrator,
    isRegularSecretary
  }
}