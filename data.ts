
import { TaskStatus, TaskPriority, EngagementType, Workspace, Client, Project, Task, Meeting } from './types';

export const WORKSPACES: Workspace[] = [
  { id: 'ws-1', name: "Sraddha's Workspace", avatar: 'https://picsum.photos/seed/sraddha/100/100' },
  { id: 'ws-3', name: "Design Team", avatar: 'https://picsum.photos/seed/design/100/100' },
  { id: 'ws-4', name: "Video Editing Team", avatar: 'https://picsum.photos/seed/video/100/100' },
];

export const CLIENTS: Client[] = [
  {
    id: 'c-1',
    name: 'AINU',
    retainershipAmount: 5000,
    engagementType: EngagementType.RETAINER,
    services: ['Social Media', 'Content', 'Ads'],
    description: 'Leading Urology Institute in India.'
  },
  {
    id: 'c-2',
    name: 'Lotus Hospitals',
    retainershipAmount: 7500,
    engagementType: EngagementType.RETAINER,
    services: ['Social Media', 'Design', 'Operations'],
    description: 'Specialized healthcare for women and children.'
  },
  {
    id: 'c-3',
    name: 'SLG Hospitals',
    retainershipAmount: 12000,
    engagementType: EngagementType.RETAINER,
    services: ['Website', 'SEO', 'Ads', 'Design'],
    description: 'Multi-specialty tertiary care hospital.'
  }
];

export const PROJECTS: Project[] = [
  { id: 'p-1', clientId: 'c-1', name: 'Social Media Campaign Q4', status: 'Active', progress: 65 },
  { id: 'p-2', clientId: 'c-1', name: 'Annual Report Design', status: 'Active', progress: 20 },
  { id: 'p-3', clientId: 'c-2', name: 'New Website Launch', status: 'Active', progress: 45 },
  { id: 'p-4', clientId: 'c-3', name: 'Google Ads Blitz', status: 'Active', progress: 80 },
];

export const MEETINGS: Meeting[] = [
  {
    id: 'm-1',
    title: 'Weekly Sync: AINU Strategy',
    time: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    duration: '45m',
    participants: ['Sraddha', 'Design Team'],
  },
  {
    id: 'm-2',
    title: 'Client Review: SLG Hospitals',
    time: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    duration: '1h',
    participants: ['Sraddha', 'Video Editing Team'],
  },
  {
    id: 'm-3',
    title: 'Content Planning: Lotus Hospitals',
    time: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    duration: '30m',
    participants: ['Sraddha'],
  }
];

export const TASKS: Task[] = [
  {
    id: 't-1',
    clientId: 'c-1',
    projectId: 'p-1',
    title: 'Instagram Post Design - Doctor Profiles',
    description: 'Create 5 post designs featuring the leading urologists.',
    category: 'Design',
    priority: TaskPriority.HIGH,
    status: TaskStatus.WIP,
    assigneeIds: ['ws-1', 'ws-3'],
    dueDate: new Date(Date.now() + 1.5 * 3600000).toISOString(),
    createdAt: new Date().toISOString(),
    remindersSent: []
  },
  {
    id: 't-2',
    clientId: 'c-2',
    projectId: 'p-3',
    title: 'Home Page Wireframing',
    description: 'Review the layout for the new maternity section.',
    category: 'Website',
    priority: TaskPriority.URGENT,
    status: TaskStatus.TODO,
    assigneeIds: ['ws-3'],
    dueDate: new Date(Date.now() + 20 * 3600000).toISOString(),
    createdAt: new Date().toISOString(),
    remindersSent: []
  },
  {
    id: 't-3',
    clientId: 'c-3',
    projectId: 'p-4',
    title: 'Ad Copy Revision',
    description: 'Polish the headlines for SLG brand awareness campaign.',
    category: 'Content',
    priority: TaskPriority.MEDIUM,
    status: TaskStatus.DONE,
    assigneeIds: ['ws-1'],
    dueDate: new Date(Date.now() + 172800000).toISOString(),
    createdAt: new Date().toISOString(),
    remindersSent: []
  },
  {
    id: 't-4',
    clientId: 'c-1',
    projectId: 'p-1',
    title: 'Monthly Analytics Report',
    description: 'Compile data from Meta Ads Manager.',
    category: 'Ads',
    priority: TaskPriority.LOW,
    status: TaskStatus.EXECUTED,
    assigneeIds: ['ws-1'],
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    remindersSent: []
  },
  {
    id: 't-5',
    clientId: 'c-2',
    projectId: 'p-3',
    title: 'Video Ad Splicing',
    description: 'Edit the promotional video for the maternity wing.',
    category: 'Operations',
    priority: TaskPriority.MEDIUM,
    status: TaskStatus.TODO,
    assigneeIds: ['ws-4'],
    dueDate: new Date(Date.now() + 48 * 3600000).toISOString(),
    createdAt: new Date().toISOString(),
    remindersSent: []
  }
];
