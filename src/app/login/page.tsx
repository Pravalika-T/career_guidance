
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  ArrowRight, 
  LogIn, 
  Chrome,
  Loader2,
  ChevronLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { useAuth, useFirestore } from '@/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();

  const handleInitialProfile = async (user: any) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          displayName: user.displayName || name || 'Explorer',
          email: user.email,
          photoURL: user.photoURL || '',
          role: 'user',
          xp: 0,
          level: 1,
          badges: ['Path Explorer'],
          savedCareers: [],
          lastActive: serverTimestamp()
        }, { merge: true });
      }
    } catch (e) {
      console.error("Profile sync error:", e);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await handleInitialProfile(cred.user);
      toast({ title: "Welcome back!", description: "Accessing your career map." });
      router.push('/profile');
    } catch (err: any) {
      toast({ variant: "destructive", title: "Login Failed", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }
      await handleInitialProfile(cred.user);
      toast({ title: "Account Created!", description: "Welcome to CareerCraft 3D." });
      router.push('/profile');
    } catch (err: any) {
      toast({ variant: "destructive", title: "Signup Failed", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const cred = await signInWithPopup(auth, provider);
      await handleInitialProfile(cred.user);
      router.push('/profile');
    } catch (err: any) {
      toast({ variant: "destructive", title: "Google Identity Error", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-accent/10 blur-[100px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-6 group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-4 text-primary">
            <Sparkles size={32} />
          </div>
          <h1 className="text-4xl font-headline font-bold text-foreground tracking-tight">CareerCraft 3D</h1>
          <p className="text-muted-foreground mt-2">Build your future, one path at a time.</p>
        </div>

        <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-white/70 backdrop-blur-xl">
          <CardContent className="p-8">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 rounded-2xl p-1 bg-muted/50">
                <TabsTrigger value="login" className="rounded-xl font-bold">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="rounded-xl font-bold">Join Now</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest ml-1">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input 
                        type="email" 
                        placeholder="you@example.com" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 pl-11 rounded-2xl bg-white border-none shadow-inner"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest ml-1">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 pl-11 rounded-2xl bg-white border-none shadow-inner"
                      />
                    </div>
                  </div>
                  <Button disabled={loading} className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/20">
                    {loading ? <Loader2 className="animate-spin" /> : 'Enter Your World'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-6">
                <form onSubmit={handleEmailSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest ml-1">Full Name</Label>
                    <Input 
                      placeholder="Jane Doe" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 rounded-2xl bg-white border-none shadow-inner"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest ml-1">Email Address</Label>
                    <Input 
                      type="email" 
                      placeholder="you@example.com" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-2xl bg-white border-none shadow-inner"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest ml-1">Password</Label>
                    <Input 
                      type="password" 
                      placeholder="Min. 8 characters" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 rounded-2xl bg-white border-none shadow-inner"
                    />
                  </div>
                  <Button disabled={loading} className="w-full h-14 rounded-2xl bg-accent hover:bg-accent/90 text-white font-bold text-lg shadow-xl shadow-accent/20">
                    {loading ? <Loader2 className="animate-spin" /> : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>

              <div className="mt-8">
                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-muted-foreground/10"></div></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-muted-foreground font-bold">Or</span></div>
                </div>

                <Button 
                  onClick={handleGoogleLogin}
                  variant="outline" 
                  disabled={loading}
                  className="w-full h-14 rounded-2xl border-none bg-white shadow-xl flex items-center justify-center gap-3 font-bold hover:bg-slate-50"
                >
                  <Chrome className="w-5 h-5" />
                  Continue with Google
                </Button>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
