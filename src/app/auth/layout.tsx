import Link from 'next/link';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <Link href={'/auth/signin'}>Auth</Link>
      <Link href={'/auth/signup'}>Reg</Link>
      {children}
    </>
  );
}
