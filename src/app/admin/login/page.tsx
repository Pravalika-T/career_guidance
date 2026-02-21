
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle,
  Loader2,
  ChevronLeft,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [debugUid, setDebugUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const auth = useAuth();
  const router = useRouter();
  const db = useFirestore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDebugUid(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        toast({ title: "Access Granted", description: "Welcome back, Architect." });
        router.push('/admin/dashboard');
      } else {
        await signOut(auth);
        setError("ACCESS DENIED: Authenticated successfully, but 'role: admin' was not found in your Firestore user document.");
        setDebugUid(user.uid);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      let message = "Invalid credentials. Please try again.";
      
      if (err.code === 'auth/invalid-api-key') {
        message = "CRITICAL ERROR: The Firebase API Key in src/firebase/config.ts is invalid. Please update it with your real key from the Firebase Console.";
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        message = "Incorrect email or password.";
      } else {
        message = err.message || "An unexpected error occurred during login.";
      }
      
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const copyUid = () => {
    if (debugUid) {
      navigator.clipboard.writeText(debugUid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: "UID Copied", description: "Use this ID in the Firestore 'users' collection." });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[100px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-primary transition-colors mb-6 group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Public Interface
          </Link>
          <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-4 text-primary">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Security Gateway</h1>
          <p className="text-slate-500 mt-2">Authorized Personnel Only</p>
        </div>

        <Card className="border-none shadow-2xl rounded-[32px] overflow-hidden bg-white">
          <CardHeader className="pt-10 px-10 pb-2 text-center">
            <CardTitle className="text-xl font-bold">Admin Sign In</CardTitle>
            <CardDescription>Enter administrative credentials to continue.</CardDescription>
          </CardHeader>
          
          <CardContent className="p-10">
            {error && (
              <div className="space-y-4 mb-8">
                <Alert variant="destructive" className="rounded-2xl border-none bg-rose-50 text-rose-600">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="font-bold">Entry Restricted</AlertTitle>
                  <AlertDescription className="text-xs leading-relaxed">{error}</AlertDescription>
                </Alert>
                
                {debugUid && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Your System UID</p>
                    <div className="flex items-center justify-between gap-3">
                      <code className="text-xs font-mono text-slate-600 truncate flex-1">{debugUid}</code>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg" onClick={copyUid}>
                        {copied ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Admin Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="admin@careercraft.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 pl-11 rounded-xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-slate-400">Security Key</Label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pl-11 rounded-xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-primary/20"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg shadow-xl shadow-slate-200 group transition-all"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Unlock Console
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}


