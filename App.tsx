
import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Clients } from './components/Clients';
import { Tasks } from './components/Tasks';
import { CalendarView } from './components/Calendar';
import { Workspaces } from './components/Workspaces';
import { Login } from './components/Login';
import { TASKS, CLIENTS, PROJECTS, WORKSPACES, MEETINGS } from './data';
import { Task, Client, Project, Workspace, TaskStatus, AppNotification, UserStatus, Meeting } from './types';
// Import the missing X icon to fix the ReferenceError on line 123
import { AlertCircle, BellRing, X } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState<Task[]>(TASKS);
  const [meetings, setMeetings] = useState<Meeting[]>(MEETINGS);
  const [clients] = useState<Client[]>(CLIENTS);
  const [projects] = useState<Project[]>(PROJECTS);
  const [workspaces] = useState<Workspace[]>(WORKSPACES);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [activeToast, setActiveToast] = useState<AppNotification | null>(null);
  const [userStatus, setUserStatus] = useState<UserStatus>(UserStatus.ACTIVE);

  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const handleCreateTask = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'read' | 'time'>) => {
    const id = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newNotif: AppNotification = {
      ...notif,
      id,
      read: false,
      time: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
    setActiveToast(newNotif);
    setTimeout(() => setActiveToast(null), 5000);
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    const checkReminders = () => {
      const now = new Date();
      let tasksUpdated = false;
      const updatedTasks = tasks.map(task => {
        if (task.status === TaskStatus.EXECUTED) return task;
        const dueDate = new Date(task.dueDate);
        const timeDiff = dueDate.getTime() - now.getTime();
        const sent = task.remindersSent || [];
        const oneDayInMs = 24 * 60 * 60 * 1000;
        const twoHoursInMs = 2 * 60 * 60 * 1000;

        if (timeDiff <= oneDayInMs && timeDiff > 0 && !sent.includes('1d')) {
          addNotification({ title: 'Deadline Approaching (1 Day)', message: `Task "${task.title}" is due in 24 hours.`, urgent: false });
          tasksUpdated = true;
          return { ...task, remindersSent: [...sent, '1d'] };
        }
        if (timeDiff <= twoHoursInMs && timeDiff > 0 && !sent.includes('2h')) {
          addNotification({ title: 'Urgent Deadline (2 Hours)', message: `Task "${task.title}" is due in less than 2 hours.`, urgent: true });
          tasksUpdated = true;
          return { ...task, remindersSent: [...sent, '2h'] };
        }
        return task;
      });
      if (tasksUpdated) setTasks(updatedTasks);
    };
    const interval = setInterval(checkReminders, 30000);
    return () => clearInterval(interval);
  }, [tasks, isLoggedIn]);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard tasks={tasks} clients={clients} projects={projects} workspaces={workspaces} />;
      case 'clients':
        return <Clients clients={clients} projects={projects} tasks={tasks} selectedClientId={selectedClientId} onSelectClient={setSelectedClientId} />;
      case 'tasks':
        return <Tasks tasks={tasks} clients={clients} projects={projects} workspaces={workspaces} onUpdateStatus={handleUpdateTaskStatus} onCreateTask={handleCreateTask} />;
      case 'calendar':
        return <CalendarView tasks={tasks} meetings={meetings} />;
      case 'workspaces':
        return <Workspaces workspaces={workspaces} tasks={tasks} />;
      default:
        return <Dashboard tasks={tasks} clients={clients} projects={projects} workspaces={workspaces} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab} 
      notifications={notifications} 
      setNotifications={setNotifications}
      userStatus={userStatus}
      onStatusChange={setUserStatus}
      onLogout={() => setIsLoggedIn(false)}
    >
      {renderContent()}

      {activeToast && (
        <div className="fixed bottom-8 right-8 z-[200] animate-in slide-in-from-right-10 duration-500">
          <div className={`flex items-center p-5 rounded-3xl border shadow-2xl backdrop-blur-xl ${activeToast.urgent ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-blue-600/10 border-blue-600/30 text-blue-400'}`}>
            <div className={`p-3 rounded-2xl mr-4 ${activeToast.urgent ? 'bg-red-500/20' : 'bg-blue-600/20'}`}>
              {activeToast.urgent ? <AlertCircle size={24} /> : <BellRing size={24} />}
            </div>
            <div className="mr-8">
              <h5 className="font-bold text-sm text-white">{activeToast.title}</h5>
              <p className="text-xs text-slate-300 mt-0.5">{activeToast.message}</p>
            </div>
            <button onClick={() => setActiveToast(null)} className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
