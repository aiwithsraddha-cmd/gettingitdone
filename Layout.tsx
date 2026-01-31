
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  Calendar, 
  Briefcase, 
  Bell, 
  Search,
  Plus,
  Settings,
  Menu,
  X,
  BellRing,
  LogOut,
  ChevronDown,
  Umbrella
} from 'lucide-react';
import { AppNotification, UserStatus } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  notifications: AppNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<AppNotification[]>>;
  userStatus: UserStatus;
  onStatusChange: (status: UserStatus) => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, activeTab, onTabChange, notifications, setNotifications, 
  userStatus, onStatusChange, onLogout 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients', label: 'Clients', icon: Briefcase },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'workspaces', label: 'Workspaces', icon: Users },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const statusColors = {
    [UserStatus.ACTIVE]: 'bg-green-500',
    [UserStatus.AWAY]: 'bg-yellow-500',
    [UserStatus.VACATION]: 'bg-purple-500'
  };

  return (
    <div className="flex h-screen bg-[#0a0a0c] text-slate-200 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 ease-in-out border-r border-slate-800 bg-[#0f0f12] flex flex-col z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Getting It Done
            </h1>
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">G</div>
          )}
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center p-3 rounded-xl transition-colors ${
                activeTab === item.id 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <item.icon size={22} className={isSidebarOpen ? 'mr-3' : 'mx-auto'} />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          {isSidebarOpen && (
             <button 
              onClick={() => onStatusChange(userStatus === UserStatus.VACATION ? UserStatus.ACTIVE : UserStatus.VACATION)}
              className={`w-full flex items-center p-3 rounded-xl transition-all border ${
                userStatus === UserStatus.VACATION 
                  ? 'bg-purple-600/10 border-purple-600/30 text-purple-400 shadow-lg shadow-purple-600/10' 
                  : 'text-slate-400 hover:bg-slate-800 border-transparent'
              }`}
            >
              <Umbrella size={20} className="mr-3" />
              <span className="font-medium">{userStatus === UserStatus.VACATION ? 'Back from Vacation' : 'On Vacation'}</span>
            </button>
          )}
          <button className="w-full flex items-center p-3 text-slate-400 hover:text-slate-200 rounded-xl transition-colors">
            <Settings size={22} className={isSidebarOpen ? 'mr-3' : 'mx-auto'} />
            {isSidebarOpen && <span className="font-medium">Settings</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-800 bg-[#0a0a0c]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center flex-1">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg mr-4 text-slate-400"
            >
              <Menu size={20} />
            </button>
            <div className="relative w-96 max-w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="w-full bg-slate-900 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-lg relative transition-colors ${showNotifications ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full border-2 border-[#0a0a0c]">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-4 w-96 bg-[#16161a] border border-slate-800 rounded-[2rem] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in slide-in-from-top-4 duration-200">
                  <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                    <h3 className="font-bold text-slate-100 flex items-center">
                      <BellRing size={16} className="mr-2 text-blue-400" />
                      Notifications
                    </h3>
                    <button onClick={() => setNotifications([])} className="text-[10px] font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300">Clear</button>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(n => (
                        <div key={n.id} className={`p-6 border-b border-slate-800/50 hover:bg-slate-800/30 transition-all cursor-pointer relative ${!n.read ? 'bg-blue-600/5' : ''}`}>
                          <div className="flex justify-between items-start mb-1">
                            <h5 className={`text-xs font-bold uppercase tracking-widest ${n.urgent ? 'text-red-400' : 'text-slate-200'}`}>{n.title}</h5>
                            <span className="text-[9px] text-slate-500 font-bold uppercase">{n.time}</span>
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-12 text-center text-slate-500">No new alerts</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-1 pr-3 hover:bg-slate-800 rounded-full transition-colors border border-transparent hover:border-slate-700"
              >
                <div className="relative">
                  <img src="https://picsum.photos/seed/sraddha/40/40" alt="Sraddha" className="w-8 h-8 rounded-full border border-slate-700 object-cover" />
                  <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0a0a0c] ${statusColors[userStatus]}`}></div>
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold text-white">Sraddha</p>
                  <p className="text-[10px] text-slate-500 font-medium">{userStatus}</p>
                </div>
                <ChevronDown size={14} className="text-slate-500" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-[#16161a] border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="p-4 bg-slate-900/50 border-b border-slate-800">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Signed in as</p>
                    <p className="text-sm font-bold text-white">Sraddha's Workspace</p>
                  </div>
                  <div className="p-2">
                    <button 
                      onClick={() => { onStatusChange(UserStatus.ACTIVE); setShowUserMenu(false); }}
                      className="w-full flex items-center p-3 text-sm text-slate-300 hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                      Active
                    </button>
                    <button 
                      onClick={() => { onStatusChange(UserStatus.AWAY); setShowUserMenu(false); }}
                      className="w-full flex items-center p-3 text-sm text-slate-300 hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-3"></div>
                      Away
                    </button>
                    <button 
                      onClick={() => { onStatusChange(UserStatus.VACATION); setShowUserMenu(false); }}
                      className="w-full flex items-center p-3 text-sm text-slate-300 hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                      On Vacation
                    </button>
                    <div className="my-2 border-t border-slate-800"></div>
                    <button 
                      onClick={onLogout}
                      className="w-full flex items-center p-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                      <LogOut size={16} className="mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#0a0a0c]">
          <div className="max-w-7xl mx-auto p-6 lg:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
