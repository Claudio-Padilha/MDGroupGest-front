import { useMemo } from 'react';

export const usePhoto = () => {
  const start = JSON.parse(localStorage.getItem('start'))

  const userForPhoto = useMemo(() => {
    return JSON.parse(localStorage.getItem('userForPhoto'));
  }, [start])
  
  return userForPhoto
}