
import React from 'react';
import { Workspace, Task, TaskStatus } from '../types';
import { Mail, Shield, Zap, TrendingUp } from 'lucide-react';

interface WorkspacesProps {
  workspaces: Workspace[];
  tasks: Task[];
}

export const Workspaces: React.FC<WorkspacesProps> = ({ workspaces, tasks }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-white tracking-tight">Workspaces</h2>
        <p className="text-slate-400 mt-1">Shared visibility of individual ownership across the agency.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {workspaces.map(ws => {
          const wsTasks = tasks.filter(t => t.assigneeIds.includes(ws.id));
          const completedCount = wsTasks.filter(t => t.status === TaskStatus.EXECUTED).length;
          const totalCount = wsTasks.length;
          const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

          return (
            <div key={ws.id} className="bg-[#16161a] border border-slate-800 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full -mr-16 -mt-16 group-hover:bg-blue-600/10 transition-colors"></div>
              
              <div className="flex items-center space-x-6 mb-8">
                <div className="relative">
                  <img src={ws.avatar} alt={ws.name} className="w-20 h-20 rounded-[2rem] object-cover ring-2 ring-slate-800 group-hover:ring-blue-500/50 transition-all" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-[#16161a]"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white leading-tight">{ws.name}</h3>
                  <p className="text-sm text-slate-500 font-medium">Strategic Operations</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Active Tasks</p>
                  <p className="text-2xl font-bold text-white">{totalCount - completedCount}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Weekly Focus</p>
                  <p className="text-2xl font-bold text-white">High</p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-xs text-slate-400 font-bold uppercase tracking-widest">
                  <span>Execution Score</span>
                  <span className="text-blue-400">{progress}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <div className="flex -space-x-1">
                  <button className="p-2.5 text-slate-400 hover:text-white transition-colors bg-slate-900 rounded-xl border border-slate-800"><Mail size={18} /></button>
                  <button className="p-2.5 text-slate-400 hover:text-white transition-colors bg-slate-900 rounded-xl border border-slate-800 ml-2"><Shield size={18} /></button>
                </div>
                <button className="text-blue-400 hover:text-blue-300 font-bold text-xs uppercase tracking-widest flex items-center group/btn">
                  View full board
                  <TrendingUp size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
