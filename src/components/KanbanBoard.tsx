
import { useState } from 'react';
import { Ticket, User } from '../types/kanban';
import { mockData } from '../data/mockData';
import { filterTickets } from '../utils/kanbanUtils';
import KanbanHeader from './KanbanHeader';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState<Ticket[]>(mockData.tickets);
  const [users] = useState<User[]>(mockData.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [draggedTicket, setDraggedTicket] = useState<string | null>(null);

  const columns = ['Backlog', 'Todo', 'In progress', 'Done'];

  const filteredTickets = filterTickets(tickets, searchTerm, selectedUser, selectedPriority);

  const getTicketsForColumn = (status: string) => {
    return filteredTickets.filter(ticket => ticket.status === status);
  };

  const handleDragStart = (e: React.DragEvent, ticketId: string) => {
    setDraggedTicket(ticketId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    
    if (draggedTicket) {
      setTickets(prevTickets =>
        prevTickets.map(ticket =>
          ticket.id === draggedTicket
            ? { ...ticket, status: newStatus as Ticket['status'] }
            : ticket
        )
      );
      setDraggedTicket(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <KanbanHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
          users={users}
        />
        
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map(column => (
            <KanbanColumn
              key={column}
              title={column}
              tickets={getTicketsForColumn(column)}
              users={users}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
