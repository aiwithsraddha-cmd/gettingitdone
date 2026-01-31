
export enum TaskStatus {
  TODO = 'To-Do',
  WIP = 'WIP',
  DONE = 'Done',
  APPROVED = 'Approved',
  EXECUTED = 'Executed'
}

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  URGENT = 'Urgent'
}

export enum EngagementType {
  RETAINER = 'Retainer',
  ONE_TIME = 'One-time'
}

export enum UserStatus {
  ACTIVE = 'Active',
  AWAY = 'Away',
  VACATION = 'On Vacation'
}

export interface Workspace {
  id: string;
  name: string;
  avatar?: string;
}

export interface Client {
  id: string;
  name: string;
  retainershipAmount: number;
  engagementType: EngagementType;
  services: string[];
  description?: string;
}

export interface Project {
  id: string;
  clientId: string;
  name: string;
  status: 'Active' | 'Paused' | 'Completed';
  progress: number;
}

export interface Task {
  id: string;
  clientId: string;
  projectId: string;
  title: string;
  description: string;
  category: 'Social Media' | 'Ads' | 'Website' | 'Design' | 'Content' | 'Operations';
  priority: TaskPriority;
  status: TaskStatus;
  assigneeIds: string[];
  dueDate: string;
  createdAt: string;
  remindersSent?: string[];
}

export interface Meeting {
  id: string;
  title: string;
  time: string;
  duration: string;
  participants: string[];
  link?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  urgent?: boolean;
}
