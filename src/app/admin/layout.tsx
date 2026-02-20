
'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { useUser, useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading: authLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const pathname = usePathname();
  const [isVerifying, setIsVerifying] = useState(true);
  
  const userDocRef = user ? doc(db, 'users', user.uid) : null;
  const { data: userData, loading: docLoading } = useDoc(userDocRef);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        if (!isLoginPage) router.push('/admin/login');
        setIsVerifying(false);
      } else if (!docLoading) {
        if (!userData || userData.role !== 'admin') {
          console.warn('ADMIN ACCESS DENIED: Missing role in Firestore.');
          if (!isLoginPage) router.push('/admin/login');
        }
        setIsVerifying(false);
      }
    }
  }, [user, userData, authLoading, docLoading, router, isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (authLoading || (user && docLoading) || isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 w-64 text-center">
          <Skeleton className="h-12 w-full rounded-2xl" />
          <p className="text-muted-foreground animate-pulse font-bold text-sm tracking-widest uppercase">Verifying Protocols...</p>
        </div>
      </div>
    );
  }

  if (!user || userData?.role !== 'admin') {
    return null; 
  }

  return <AdminLayout>{children}</AdminLayout>;
}
