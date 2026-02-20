
'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { useUser, useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
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
  
  const userDocRef = user ? doc(db, 'users', user.uid) : null;
  const { data: userData, loading: docLoading } = useDoc(userDocRef);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Only redirect if we are NOT on the login page
    if (!authLoading && !isLoginPage) {
      if (!user) {
        router.push('/admin/login');
      } else if (!docLoading) {
        // If document check is finished and role is not admin, redirect
        if (!userData || userData.role !== 'admin') {
          console.warn('ADMIN ACCESS DENIED: User lacks admin role in Firestore.');
          router.push('/admin/login');
        }
      }
    }
  }, [user, userData, authLoading, docLoading, router, isLoginPage]);

  // Always render login page content
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show skeleton while verifying access
  if (authLoading || (user && docLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 w-64 text-center">
          <Skeleton className="h-12 w-full rounded-2xl" />
          <p className="text-muted-foreground animate-pulse font-bold text-sm tracking-widest">VERIFYING PROTOCOLS...</p>
        </div>
      </div>
    );
  }

  // Final check to prevent layout shift or rendering admin UI to unauthorized users
  if (!user || userData?.role !== 'admin') {
    return null; 
  }

  return <AdminLayout>{children}</AdminLayout>;
}
