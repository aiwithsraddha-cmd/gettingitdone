
import React, { useState } from 'react';
import { Lock, User, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('sraddha@gettingitdone.agency');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-4">
      <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-600/20">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Getting It Done</h1>
          <p className="text-slate-500 font-medium">Internal Agency OS • Sraddha's Workspace</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#16161a] border border-slate-800 rounded-[3rem] p-10 shadow-2xl space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-1">Email Address</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/10 transition-all flex items-center justify-center group"
          >
            Enter Workspace
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="text-center mt-8 text-slate-600 text-xs font-medium uppercase tracking-widest">
          Agency OS v2.0 • Restricted Internal Use Only
        </p>
      </div>
    </div>
  );
};
