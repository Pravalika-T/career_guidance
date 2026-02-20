
'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { useUser, useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
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
  
  const userDocRef = user ? doc(db, 'users', user.uid) : null;
  const { data: userData, loading: docLoading } = useDoc(userDocRef);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
    if (!authLoading && !docLoading && userData && userData.role !== 'admin') {
      router.push('/');
    }
  }, [user, userData, authLoading, docLoading, router]);

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
