
import React from 'react';
import { 
  Plus, MoreHorizontal, ArrowUpRight, CheckCircle2, 
  Circle, Activity, DollarSign, Layers, ChevronLeft
} from 'lucide-react';
import { Client, Project, Task, EngagementType, TaskStatus } from '../types';

interface ClientsProps {
  clients: Client[];
  projects: Project[];
  tasks: Task[];
  selectedClientId: string | null;
  onSelectClient: (id: string | null) => void;
}

export const Clients: React.FC<ClientsProps> = ({ clients, projects, tasks, selectedClientId, onSelectClient }) => {
  const selectedClient = clients.find(c => c.id === selectedClientId);
  const clientProjects = projects.filter(p => p.clientId === selectedClientId);
  const clientTasks = tasks.filter(t => t.clientId === selectedClientId);

  if (selectedClient) {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-300">
        <button 
          onClick={() => onSelectClient(null)}
          className="flex items-center text-slate-400 hover:text-white mb-6 transition-colors font-medium"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back to Client List
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            <header className="bg-[#16161a] border border-slate-800 p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">{selectedClient.name}</h2>
                <p className="text-slate-400 max-w-xl leading-relaxed">{selectedClient.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedClient.services.map(s => (
                    <span key={s} className="px-3 py-1 bg-slate-800 text-slate-300 text-[10px] font-bold uppercase rounded-lg border border-slate-700">{s}</span>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center space-x-4 min-w-[240px]">
                <div className="bg-green-500/10 p-3 rounded-xl text-green-400">
                  <DollarSign size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Monthly Retainer</p>
                  <h4 className="text-2xl font-bold text-white">${selectedClient.retainershipAmount.toLocaleString()}</h4>
                  <span className="text-[10px] text-green-500 font-medium">Active • {selectedClient.engagementType}</span>
                </div>
              </div>
            </header>

            <section>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Layers className="mr-3 text-blue-400" size={20} />
                Active Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clientProjects.map(p => (
                  <div key={p.id} className="bg-[#16161a] border border-slate-800 p-6 rounded-3xl hover:border-slate-700 transition-all shadow-lg group">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-lg text-slate-100 group-hover:text-blue-400 transition-colors">{p.name}</h4>
                      <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{p.status}</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Progress</span>
                        <span className="font-bold">{p.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-blue-500 h-full transition-all duration-1000" 
                          style={{ width: `${p.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Activity className="mr-3 text-emerald-400" size={20} />
                Execution Timeline
              </h3>
              <div className="bg-[#16161a] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                {clientTasks.length > 0 ? (
                  clientTasks.map((t, idx) => (
                    <div key={t.id} className={`p-6 flex items-center justify-between group ${idx !== clientTasks.length - 1 ? 'border-b border-slate-800/50' : ''}`}>
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${t.status === TaskStatus.EXECUTED ? 'bg-green-500/10 text-green-400' : 'bg-slate-800 text-slate-500'}`}>
                          {t.status === TaskStatus.EXECUTED ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                        </div>
                        <div>
                          <p className="font-medium text-slate-200">{t.title}</p>
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">
                            {t.category} • Due {new Date(t.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-slate-500">No active tasks for this client.</div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Clients</h2>
          <p className="text-slate-400 mt-1">Manage all agency partners and revenue sources.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center transition-all shadow-lg hover:shadow-blue-500/20">
          <Plus size={20} className="mr-2" />
          Add Client
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map(client => (
          <div 
            key={client.id}
            onClick={() => onSelectClient(client.id)}
            className="bg-[#16161a] border border-slate-800 p-8 rounded-[2rem] hover:border-blue-500/30 transition-all cursor-pointer shadow-xl group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={24} className="text-blue-500" />
            </div>
            
            <div className="mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center font-bold text-2xl text-white shadow-lg shadow-blue-500/20 mb-4">
                {client.name.charAt(0)}
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{client.name}</h3>
              <p className="text-sm text-slate-400 mt-2 line-clamp-2">{client.description}</p>
            </div>

            <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Revenue</p>
                <p className="text-lg font-bold text-slate-200">${client.retainershipAmount.toLocaleString()}/mo</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Projects</p>
                <p className="text-lg font-bold text-slate-200">{projects.filter(p => p.clientId === client.id).length}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
