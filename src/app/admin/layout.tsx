
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
    if (!authLoading && !isLoginPage) {
      if (!user) {
        router.push('/admin/login');
      } else if (!docLoading) {
        // Log UID to help user set up Firestore document manually if they are stuck
        if (!userData || userData.role !== 'admin') {
          console.warn('ADMIN ACCESS DENIED: User lacks admin role in Firestore.');
          if (user) console.info('Please ensure a document exists at path: users/' + user.uid + ' with field { "role": "admin" }');
          router.push('/admin/login');
        }
      }
    }
  }, [user, userData, authLoading, docLoading, router, isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (authLoading || docLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 w-64 text-center">
          <Skeleton className="h-12 w-full rounded-2xl" />
          <p className="text-muted-foreground animate-pulse">Verifying Admin Access...</p>
        </div>
      </div>
    );
  }

  if (!user || userData?.role !== 'admin') {
    return null; // Redirect handled by useEffect
  }

  return <AdminLayout>{children}</AdminLayout>;
}
