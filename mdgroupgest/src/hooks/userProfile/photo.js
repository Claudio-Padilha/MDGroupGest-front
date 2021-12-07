import { useMemo } from 'react'

export const usePhoto = () => {
  const start = JSON.parse(localStorage.getItem('start'))

  const userForPhoto = useMemo(() => {
    return JSON.parse(localStorage.getItem('userForPhoto'))
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start])

  return userForPhoto
}