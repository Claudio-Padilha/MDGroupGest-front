import { useMemo } from 'react'

export const useAuth = () => {
  const currentUser = useMemo(() => {
    return JSON.parse(localStorage.getItem('currentUser'))
  }, [localStorage])

  const isCEO = currentUser?.user?.user_type === "ceo"
  const isAdministrator = currentUser?.user?.user_type === "admin"
  const isRegularManager = currentUser?.user?.user_type === "manager"
  const isRegularSecretary = currentUser?.user?.user_type === "secretary"

  return {
    isCEO,
    isRegularManager,
    isAdministrator,
    isRegularSecretary
  }
}