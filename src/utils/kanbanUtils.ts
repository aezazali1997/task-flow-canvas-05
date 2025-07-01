
import { Ticket, User } from '../types/kanban';

export const getPriorityColor = (priority: number): string => {
  switch (priority) {
    case 4: return 'bg-red-500';
    case 3: return 'bg-orange-500';
    case 2: return 'bg-yellow-500';
    case 1: return 'bg-blue-500';
    default: return 'bg-gray-400';
  }
};

export const getPriorityLabel = (priority: number): string => {
  switch (priority) {
    case 4: return 'Urgent';
    case 3: return 'High';
    case 2: return 'Medium';
    case 1: return 'Low';
    default: return 'None';
  }
};

export const getColumnColor = (status: string): string => {
  switch (status) {
    case 'Backlog': return 'bg-slate-100 border-slate-300';
    case 'Todo': return 'bg-yellow-50 border-yellow-300';
    case 'In progress': return 'bg-blue-50 border-blue-300';
    case 'Done': return 'bg-green-50 border-green-300';
    default: return 'bg-gray-100 border-gray-300';
  }
};

export const getColumnHeaderColor = (status: string): string => {
  switch (status) {
    case 'Backlog': return 'bg-slate-200 text-slate-800';
    case 'Todo': return 'bg-yellow-200 text-yellow-800';
    case 'In progress': return 'bg-blue-200 text-blue-800';
    case 'Done': return 'bg-green-200 text-green-800';
    default: return 'bg-gray-200 text-gray-800';
  }
};

export const getUserInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export const sortTicketsByPriority = (tickets: Ticket[]): Ticket[] => {
  return [...tickets].sort((a, b) => b.priority - a.priority);
};

export const filterTickets = (
  tickets: Ticket[],
  searchTerm: string,
  selectedUser: string,
  selectedPriority: string
): Ticket[] => {
  return tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser = !selectedUser || ticket.userId === selectedUser;
    const matchesPriority = !selectedPriority || ticket.priority.toString() === selectedPriority;
    
    return matchesSearch && matchesUser && matchesPriority;
  });
};
