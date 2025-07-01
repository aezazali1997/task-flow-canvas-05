
export interface User {
  id: string;
  name: string;
  available: boolean;
}

export interface Ticket {
  id: string;
  title: string;
  tag: string[];
  userId: string;
  status: 'Backlog' | 'Todo' | 'In progress' | 'Done';
  priority: number;
}

export interface KanbanData {
  tickets: Ticket[];
  users: User[];
}
