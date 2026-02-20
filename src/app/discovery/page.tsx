
"use client";

import { motion } from 'framer-motion';
import { CAREER_PATHS, DOMAINS } from '@/lib/career-data';
import { UserStats } from '@/components/gamification/UserStats';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Compass, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CareerCatalogPage() {
  const [activeDomain, setActiveDomain] = useState<string | null>(null);

  const filteredCareers = activeDomain 
    ? CAREER_PATHS.filter(p => p.domainId === activeDomain)
    : CAREER_PATHS;

  return (
    <div className="min-h-screen bg-background pt-24 pb-40 px-6">
      <UserStats />
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="outline" className="mb-4 px-6 py-1.5 rounded-full border-primary/20 text-primary uppercase tracking-[0.3em] font-bold text-[10px]">
              Full Catalog
            </Badge>
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 tracking-tight">Explore All Paths</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dive into our comprehensive library of 12th+ career routes across all domains.
            </p>
          </motion.div>
        </header>

        {/* Domain Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <Button
            variant={activeDomain === null ? 'default' : 'outline'}
            onClick={() => setActiveDomain(null)}
            className="rounded-full px-6 font-bold"
          >
            All
          </Button>
          {DOMAINS.map(domain => (
            <Button
              key={domain.id}
              variant={activeDomain === domain.id ? 'default' : 'outline'}
              onClick={() => setActiveDomain(domain.id)}
              className="rounded-full px-6 font-bold"
            >
              {domain.name}
            </Button>
          ))}
        </div>

        {/* Career Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCareers.map((career, idx) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="h-full border-none shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 bg-white/70 backdrop-blur-xl rounded-[40px] overflow-hidden group p-2">
                <CardHeader className="pt-8 px-8">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-primary/10 text-primary border-none px-4 py-1 rounded-full font-bold text-[10px]">
                      {DOMAINS.find(d => d.id === career.domainId)?.name.toUpperCase()}
                    </Badge>
                    <span className="text-xs font-bold text-muted-foreground">{career.salary}</span>
                  </div>
                  <CardTitle className="text-3xl font-bold tracking-tight">{career.name}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 flex-1">
                  <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed font-light">
                    {career.description}
                  </p>
                </CardContent>
                <CardFooter className="pb-8 px-8">
                  <Link href={`/career/${career.id}`} className="w-full">
                    <Button className="w-full justify-between rounded-2xl h-14 px-6 bg-white border border-muted-foreground/10 text-foreground hover:bg-primary hover:text-white transition-all font-bold">
                      Explore Roadmap
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
