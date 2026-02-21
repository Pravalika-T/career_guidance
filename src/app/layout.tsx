
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from '@/components/navigation/Navbar';
import { FirebaseClientProvider } from '@/firebase/index';

export const metadata: Metadata = {
  title: 'CareerCraft 3D - Discover Your Future',
  description: 'A gamified, AI-powered career discovery experience.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CareerCraft 3D',
  },
};

export const viewport: Viewport = {
  themeColor: '#4CAF50',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-body antialiased selection:bg-primary/30 relative bg-background overflow-x-hidden">
        <FirebaseClientProvider>
          <main className="relative z-10 min-h-screen">
            {children}
          </main>
          <Navbar />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
