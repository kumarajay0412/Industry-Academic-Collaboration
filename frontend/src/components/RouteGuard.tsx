import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { ReactNode } from 'react';

type RouteGuardProps = {
  children: ReactNode;
};

export function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    authCheck(router.asPath);
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);
    router.events.on('routeChangeComplete', authCheck);
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = [
      '/login',
      '/signup',
      '/forgot-password',
      '/auth/reset-password/[resetToken]',
      '/auth/confirm/[confirmToken]',
      // '/dashboard',
      // '/invite-organisation',
      // '/add-organisation',
      // '/profile',
      // '/verify-user',
    ];
    const path = url.split('?')[0];
    const getAcessToken = sessionStorage.getItem('accessToken');
    const isAuthenticated = getAcessToken ? true : false;
    console.log(isAuthenticated);

    if (!isAuthenticated && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
      });
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
}
