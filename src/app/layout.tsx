
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from '@/components/navigation/Navbar';

export const metadata: Metadata = {
  title: 'CareerCraft 3D - Discover Your Future',
  description: 'A gamified, AI-powered career discovery experience.',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/30 relative">
        {/* Persistent 3D Background Elements */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-blob" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
          <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-blue-500/5 rounded-full blur-[80px] animate-blob animation-delay-4000" />
        </div>
        
        <main className="relative z-10">{children}</main>
        <Navbar />
        <Toaster />
      </body>
    </html>
  );
}
