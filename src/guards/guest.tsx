'use client';
import { ReactNode, useEffect, useState } from 'react';
// next
import { useRouter } from 'next-nprogress-bar';
// redux
import { useAuthContext } from '@/context/auth';
import Loading from '@/components/loading';
 
 
export default function GuestGuard({children}:{ children:ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const [isAuth, setAuth] = useState(true);
  useEffect(() => {
    if (isAuthenticated) {
      setAuth(false);
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isAuth) {
    return <Loading />;
  }
  return children;
}
