'use client';
import PropTypes from 'prop-types';
import { ReactNode, useEffect, useState } from 'react';

// redux
import { toast } from 'react-hot-toast';
 // next
import Loading from '@/components/loading';
import { useAuthContext } from '@/context/auth';
import { useRouter } from 'next-nprogress-bar';

export default function Guest({children}:{ children:ReactNode }) {
  const router = useRouter();
  const [isAdmin, setAdmin] = useState(true);
  const { isAuthenticated, user } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated || user?.role === 'voter') {
      setAdmin(false);
      toast.error("You're not allowed to access dashboard");
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isAdmin) {
    return <Loading />;
  }
  return children;
}

Guest.propTypes = {
  children: PropTypes.node.isRequired
};
