
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Briefcase,
  CheckCircle2,
  FileJson
} from 'lucide-react';
import { CAREER_PATHS, DOMAINS } from '@/lib/career-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

export default function CareerManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCareers = CAREER_PATHS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.domainId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(CAREER_PATHS, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "careers_library.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    toast({ title: "Export Started", description: "Careers library is being downloaded." });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Career Library</h1>
          <p className="text-slate-500">Manage the global database of {CAREER_PATHS.length} career paths.</p>
        </div>
        <div className="flex gap-4">
          <Button onClick={handleExport} variant="outline" className="h-12 px-6 rounded-xl font-bold border-slate-200">
            <FileJson className="w-5 h-5 mr-2" />
            Export Schema
          </Button>
          <Button className="h-12 px-8 rounded-full bg-slate-900 font-bold shadow-lg shadow-slate-200">
            <Plus className="w-5 h-5 mr-2" />
            Create Entry
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input 
            placeholder="Search by title, domain or required skills..." 
            className="pl-10 h-11 bg-slate-50 border-none rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-11 rounded-xl px-4 border-slate-200 text-slate-600 font-semibold">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredCareers.map((career) => (
          <motion.div
            key={career.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-all group p-1">
              <CardContent className="p-6 flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Briefcase size={28} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-xl text-slate-900">{career.name}</h3>
                    <Badge variant="secondary" className="bg-slate-50 text-slate-400 border-none rounded-full px-3 text-[10px]">
                      {DOMAINS.find(d => d.id === career.domainId)?.name || 'Domain'}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-1 max-w-xl">{career.description}</p>
                </div>

                <div className="hidden lg:flex items-center gap-12 px-8">
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Starting Salary</p>
                    <p className="font-bold text-slate-900">{career.salary}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">System State</p>
                    <div className="flex items-center gap-1 text-emerald-600 font-bold">
                      <CheckCircle2 size={14} />
                      Live
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:text-primary hover:bg-primary/5">
                    <Edit2 size={18} />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-xl text-slate-400">
                        <MoreVertical size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-2xl p-2 min-w-[160px]">
                      <DropdownMenuItem className="rounded-xl gap-2 font-semibold">
                        <ExternalLink size={16} /> View Production
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-xl gap-2 font-semibold text-rose-600 focus:text-rose-600 focus:bg-rose-50">
                        <Trash2 size={16} /> Deactivate Path
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
