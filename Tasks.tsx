
import React, { useState } from 'react';
import { 
  Plus, MoreVertical, Calendar as CalendarIcon, 
  MessageSquare, User, Filter, LayoutGrid, List, ChevronRight, X
} from 'lucide-react';
import { Task, TaskStatus, Client, Project, Workspace, TaskPriority } from '../types';

interface TasksProps {
  tasks: Task[];
  clients: Client[];
  projects: Project[];
  workspaces: Workspace[];
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
  onCreateTask: (task: Task) => void;
}

export const Tasks: React.FC<TasksProps> = ({ tasks, clients, projects, workspaces, onUpdateStatus, onCreateTask }) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    category: 'Design',
    priority: TaskPriority.MEDIUM,
    status: TaskStatus.TODO,
    assigneeIds: [],
    clientId: clients[0]?.id || '',
    projectId: projects[0]?.id || '',
    dueDate: new Date().toISOString()
  });

  const columns = [
    { status: TaskStatus.TODO, color: 'bg-slate-400' },
    { status: TaskStatus.WIP, color: 'bg-blue-400' },
    { status: TaskStatus.DONE, color: 'bg-yellow-400' },
    { status: TaskStatus.APPROVED, color: 'bg-purple-400' },
    { status: TaskStatus.EXECUTED, color: 'bg-green-400' },
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateTask({
      ...newTask as Task,
      id: `t-${Date.now()}`,
      createdAt: new Date().toISOString()
    });
    setIsModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Task Management</h2>
          <p className="text-slate-400">Streamline execution and maintain transparency.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-[#16161a] border border-slate-800 rounded-xl p-1 flex">
            <button 
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'kanban' ? 'bg-slate-800 text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-slate-800 text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <List size={18} />
            </button>
          </div>
          <button className="bg-slate-800 border border-slate-700 text-slate-300 px-4 py-2 rounded-xl flex items-center hover:bg-slate-700 transition-all font-medium">
            <Filter size={18} className="mr-2" />
            Filters
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold flex items-center transition-all shadow-lg"
          >
            <Plus size={20} className="mr-2" />
            New Task
          </button>
        </div>
      </header>

      {viewMode === 'kanban' ? (
        <div className="flex-1 overflow-x-auto pb-4">
          <div className="flex space-x-6 min-w-max h-full">
            {columns.map(col => (
              <div key={col.status} className="w-80 flex flex-col h-full rounded-2xl bg-slate-900/40 p-3">
                <div className="flex items-center justify-between px-3 py-4 sticky top-0 bg-transparent mb-2">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full ${col.color} mr-2`}></div>
                    <h3 className="font-bold text-slate-300 text-sm uppercase tracking-widest">{col.status}</h3>
                    <span className="ml-3 px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] font-bold rounded-lg border border-slate-700">
                      {tasks.filter(t => t.status === col.status).length}
                    </span>
                  </div>
                  <button className="text-slate-500 hover:text-slate-300 p-1 rounded-md hover:bg-slate-800">
                    <MoreVertical size={16} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 px-1 min-h-[500px]">
                  {tasks.filter(t => t.status === col.status).map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      client={clients.find(c => c.id === task.clientId)}
                      workspaces={workspaces}
                      onUpdateStatus={onUpdateStatus}
                    />
                  ))}
                  {tasks.filter(t => t.status === col.status).length === 0 && (
                    <div className="h-24 border-2 border-dashed border-slate-800 rounded-2xl flex items-center justify-center text-slate-600 italic text-sm">
                      Empty column
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-[#16161a] border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50">
              <tr className="border-b border-slate-800">
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Task</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Client</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Assignee</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Priority</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {tasks.map(task => (
                <tr key={task.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-8 py-4 font-semibold text-slate-200">{task.title}</td>
                  <td className="px-8 py-4 text-sm text-slate-400">{clients.find(c => c.id === task.clientId)?.name}</td>
                  <td className="px-8 py-4">
                    <div className="flex -space-x-2">
                      {task.assigneeIds.map(id => (
                        <div key={id} className="w-8 h-8 rounded-full border-2 border-[#16161a] overflow-hidden bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                          {workspaces.find(w => w.id === id)?.name.charAt(0)}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      task.priority === TaskPriority.URGENT ? 'text-red-400' :
                      task.priority === TaskPriority.HIGH ? 'text-orange-400' : 'text-slate-400'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-8 py-4 capitalize text-sm text-slate-400">{task.status}</td>
                  <td className="px-8 py-4 text-sm text-slate-400">{new Date(task.dueDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Task Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#16161a] border border-slate-800 rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden">
            <div className="p-8 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">Create New Task</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white p-2">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-8 space-y-6">
              <div className="space-y-4">
                <input 
                  autoFocus
                  required
                  placeholder="What needs to be done?" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newTask.title}
                  onChange={e => setNewTask({...newTask, title: e.target.value})}
                />
                <textarea 
                  placeholder="Add details (optional)" 
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newTask.description}
                  onChange={e => setNewTask({...newTask, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-1">Client</label>
                  <select 
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none"
                    value={newTask.clientId}
                    onChange={e => setNewTask({...newTask, clientId: e.target.value})}
                  >
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-1">Category</label>
                  <select 
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none"
                    value={newTask.category}
                    onChange={e => setNewTask({...newTask, category: e.target.value as any})}
                  >
                    <option>Design</option>
                    <option>Content</option>
                    <option>Ads</option>
                    <option>Website</option>
                    <option>Operations</option>
                    <option>Social Media</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-bold transition-all shadow-xl">
                Create Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface TaskCardProps {
  task: Task;
  client?: Client;
  workspaces: Workspace[];
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, client, workspaces, onUpdateStatus }) => {
  const isUrgent = task.priority === TaskPriority.URGENT;
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== TaskStatus.EXECUTED;

  return (
    <div className={`bg-[#16161a] border ${isUrgent ? 'border-red-500/30' : 'border-slate-800'} p-5 rounded-2xl hover:border-slate-600 transition-all shadow-md group cursor-grab active:cursor-grabbing`}>
      <div className="flex justify-between items-start mb-3">
        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${
          isUrgent ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'
        }`}>
          {task.category}
        </span>
        <div className="flex -space-x-1.5">
          {task.assigneeIds.map(id => (
            <div key={id} title={workspaces.find(w => w.id === id)?.name} className="w-6 h-6 rounded-full border border-[#16161a] overflow-hidden bg-slate-800 flex items-center justify-center text-[8px] font-bold">
              {workspaces.find(w => w.id === id)?.name.charAt(0)}
            </div>
          ))}
        </div>
      </div>
      
      <h4 className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors mb-1">{task.title}</h4>
      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-4">{client?.name}</p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
        <div className={`flex items-center text-[10px] font-medium ${isOverdue ? 'text-red-400' : 'text-slate-500'}`}>
          <CalendarIcon size={12} className="mr-1.5" />
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-slate-600 hover:text-blue-400 transition-colors">
             <MessageSquare size={14} />
          </button>
          <div className="relative group/menu">
            <button className="text-slate-600 hover:text-white transition-colors">
               <ChevronRight size={14} />
            </button>
            <div className="absolute left-full top-0 ml-2 hidden group-hover/menu:block bg-slate-900 border border-slate-800 rounded-xl p-2 z-50 w-32 shadow-2xl">
              {Object.values(TaskStatus).map(status => (
                <button 
                  key={status}
                  onClick={() => onUpdateStatus(task.id, status)}
                  className="w-full text-left p-2 hover:bg-slate-800 rounded-lg text-[10px] font-bold uppercase text-slate-400 hover:text-white transition-colors"
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
