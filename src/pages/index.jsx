import { useRouter } from "next/router";

import { useAuth } from "../contexts/AuthContext";

import { useEffect } from 'react';

const root = () => {

  const authContext = useAuth();
  const router = useRouter();

  const checkAuth = () => {
      if (authContext == null) {
        router.push('/login')
      }
      else {
        router.push('/usuario')
      };
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return(
    <></>
  )
}

export default root;