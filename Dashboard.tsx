
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { Users, Briefcase, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { Task, Client, Project, Workspace, TaskStatus, TaskPriority } from '../types';

interface DashboardProps {
  tasks: Task[];
  clients: Client[];
  projects: Project[];
  workspaces: Workspace[];
}

export const Dashboard: React.FC<DashboardProps> = ({ tasks, clients, projects, workspaces }) => {
  const overdueTasks = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== TaskStatus.EXECUTED);
  const tasksDueToday = tasks.filter(t => {
    const today = new Date();
    const d = new Date(t.dueDate);
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth();
  });

  const taskStatsData = [
    { name: TaskStatus.TODO, value: tasks.filter(t => t.status === TaskStatus.TODO).length, color: '#64748b' },
    { name: TaskStatus.WIP, value: tasks.filter(t => t.status === TaskStatus.WIP).length, color: '#3b82f6' },
    { name: TaskStatus.DONE, value: tasks.filter(t => t.status === TaskStatus.DONE).length, color: '#eab308' },
    { name: TaskStatus.APPROVED, value: tasks.filter(t => t.status === TaskStatus.APPROVED).length, color: '#a855f7' },
    { name: TaskStatus.EXECUTED, value: tasks.filter(t => t.status === TaskStatus.EXECUTED).length, color: '#22c55e' },
  ].filter(d => d.value > 0);

  const workloadData = workspaces.map(ws => ({
    name: ws.name.split("'")[0],
    tasks: tasks.filter(t => t.assigneeIds.includes(ws.id)).length
  }));

  const stats = [
    { label: 'Total Clients', value: clients.length, icon: Briefcase, color: 'text-blue-400' },
    { label: 'Active Projects', value: projects.length, icon: Users, color: 'text-purple-400' },
    { label: 'Total Tasks', value: tasks.length, icon: CheckCircle2, color: 'text-emerald-400' },
    { label: 'Overdue Tasks', value: overdueTasks.length, icon: AlertTriangle, color: 'text-red-400' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-white tracking-tight">Agency Overview</h2>
        <p className="text-slate-400 mt-1">Real-time health report of all clients and workspaces.</p>
      </header>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#16161a] border border-slate-800 p-6 rounded-3xl hover:border-slate-700 transition-all shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-slate-900 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <h4 className="text-3xl font-bold mt-1 text-white">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Task Status Pie Chart */}
        <div className="bg-[#16161a] border border-slate-800 p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">Task Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskStatsData}
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {taskStatsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            {taskStatsData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-xs text-slate-400">{entry.name} ({entry.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workload Bar Chart */}
        <div className="bg-[#16161a] border border-slate-800 p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">Workload per Workspace</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workloadData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                   cursor={{fill: '#1e293b'}}
                   contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="tasks" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Critical Items Table */}
      <div className="bg-[#16161a] border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Clock className="mr-3 text-red-400" size={20} />
            Needs Attention Right Now
          </h3>
          <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Priority Items</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50">
                <th className="px-8 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Task Title</th>
                <th className="px-8 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Client</th>
                <th className="px-8 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {overdueTasks.concat(tasksDueToday).slice(0, 5).map((task) => (
                <tr key={task.id} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="px-8 py-5">
                    <div>
                      <div className="font-semibold text-slate-200 group-hover:text-white">{task.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{task.category}</div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-400">
                    {clients.find(c => c.id === task.clientId)?.name}
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      task.status === TaskStatus.WIP ? 'bg-blue-600/20 text-blue-400' : 
                      task.status === TaskStatus.TODO ? 'bg-slate-700/50 text-slate-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm">
                    <span className={new Date(task.dueDate) < new Date() ? 'text-red-400 font-medium' : 'text-slate-400'}>
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
