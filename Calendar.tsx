
import React from 'react';
import { ChevronLeft, ChevronRight, Filter, Video, Clock } from 'lucide-react';
import { Task, Meeting } from '../types';

interface CalendarProps {
  tasks: Task[];
  meetings: Meeting[];
}

export const CalendarView: React.FC<CalendarProps> = ({ tasks, meetings }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const totalDays = endOfMonth.getDate();

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) calendarDays.push(null);
  for (let i = 1; i <= totalDays; i++) calendarDays.push(new Date(today.getFullYear(), today.getMonth(), i));

  const getTasksForDay = (date: Date) => {
    return tasks.filter(t => {
      const taskDate = new Date(t.dueDate);
      return taskDate.getDate() === date.getDate() && 
             taskDate.getMonth() === date.getMonth() && 
             taskDate.getFullYear() === date.getFullYear();
    });
  };

  const getMeetingsForDay = (date: Date) => {
    return meetings.filter(m => {
      const mDate = new Date(m.time);
      return mDate.getDate() === date.getDate() && 
             mDate.getMonth() === date.getMonth() && 
             mDate.getFullYear() === date.getFullYear();
    });
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Agency Calendar</h2>
          <p className="text-slate-400">Sraddha's schedule, deadlines, and deliverables.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-[#16161a] border border-slate-800 rounded-xl p-1 flex items-center">
            <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400"><ChevronLeft size={20} /></button>
            <span className="px-4 font-bold text-white">
              {today.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400"><ChevronRight size={20} /></button>
          </div>
          <button className="bg-slate-800 border border-slate-700 text-slate-300 px-4 py-2 rounded-xl flex items-center hover:bg-slate-700 transition-all font-medium">
            <Filter size={18} className="mr-2" />
            Filters
          </button>
        </div>
      </header>

      <div className="flex-1 bg-[#16161a] border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
        <div className="grid grid-cols-7 border-b border-slate-800 bg-slate-900/40">
          {days.map(day => (
            <div key={day} className="py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">{day}</div>
          ))}
        </div>
        <div className="flex-1 grid grid-cols-7 overflow-y-auto">
          {calendarDays.map((date, idx) => (
            <div 
              key={idx} 
              className={`min-h-[140px] border-r border-b border-slate-800/50 p-3 group transition-colors hover:bg-slate-800/10 ${
                date && date.toDateString() === today.toDateString() ? 'bg-blue-600/5' : ''
              }`}
            >
              {date && (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-sm font-bold ${
                      date.toDateString() === today.toDateString() ? 'text-blue-500 bg-blue-500/10 w-7 h-7 flex items-center justify-center rounded-full' : 'text-slate-500'
                    }`}>
                      {date.getDate()}
                    </span>
                  </div>
                  <div className="space-y-1.5 overflow-hidden">
                    {/* Meetings First */}
                    {getMeetingsForDay(date).map(m => (
                      <div 
                        key={m.id} 
                        className="px-2 py-1.5 bg-blue-600/20 border border-blue-600/30 rounded-lg text-[9px] font-bold text-blue-400 uppercase tracking-tight flex items-center shadow-lg shadow-blue-600/5"
                        title={`${m.title} (${m.duration})`}
                      >
                        <Video size={10} className="mr-1.5" />
                        <span className="truncate">{m.title}</span>
                      </div>
                    ))}
                    {/* Tasks */}
                    {getTasksForDay(date).map(task => (
                      <div 
                        key={task.id} 
                        className="truncate px-2 py-1 bg-slate-800/50 border border-slate-700 rounded-lg text-[9px] font-bold text-slate-300 uppercase tracking-tighter hover:border-blue-500/50 hover:bg-slate-800 transition-all cursor-pointer"
                        title={task.title}
                      >
                        {task.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
