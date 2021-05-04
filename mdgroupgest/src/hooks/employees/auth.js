import { useMemo } from 'react'

export const useAuth = () => {
  const currentUser = useMemo(() => {
    return JSON.parse(localStorage.getItem('currentUser'))
  }, [localStorage])

  const isCEO = currentUser?.user?.user_type === "ceo"
  const isAdministrator = currentUser?.user?.user_type === "admin"
  const isRegularManager = currentUser?.user?.user_type === "manager"
  const isManagerAssistant = currentUser?.user?.user_type === "manager_assistant"
  const isRegularSecretary = currentUser?.user?.user_type === "secretary"
  const isSalesPerson = currentUser?.user?.user_type === "sales_person"

  return {
    isCEO,
    isRegularManager,
    isAdministrator,
    isManagerAssistant,
    isRegularSecretary,
    isSalesPerson
  }
}