import { useMemo } from "react";

const useLogin = () => {
  let currentToken = localStorage.getItem('currentToken');

  const currentUser = useMemo(() => {
    if (currentToken) {
      let currentUser = localStorage.getItem('currentUser');
      return JSON.parse(currentUser);
    }
  }, [currentToken])

  return currentUser;
}

export default useLogin;
