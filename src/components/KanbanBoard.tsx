
import { useState } from 'react';
import { Ticket, User } from '../types/kanban';
import { mockData } from '../data/mockData';
import { filterTickets } from '../utils/kanbanUtils';
import KanbanHeader from './KanbanHeader';
import KanbanColumn from './KanbanColumn';
import TicketDetailDialog from './TicketDetailDialog';
import AddTicketDialog from './AddTicketDialog';
import MobileKanbanView from './MobileKanbanView';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState<Ticket[]>(mockData.tickets);
  const [users] = useState<User[]>(mockData.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [draggedTicket, setDraggedTicket] = useState<string | null>(null);
  
  // Ticket detail dialog state
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketDetailOpen, setTicketDetailOpen] = useState(false);
  
  // Add ticket dialog state
  const [addTicketOpen, setAddTicketOpen] = useState(false);
  const [addTicketStatus, setAddTicketStatus] = useState('');

  const columns = ['Backlog', 'Todo', 'In progress', 'Done'];

  const filteredTickets = filterTickets(tickets, searchTerm, selectedUserId, selectedPriority);

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

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setTicketDetailOpen(true);
  };

  const handleAddTicket = (status: string) => {
    setAddTicketStatus(status);
    setAddTicketOpen(true);
  };

  const handleAddTicketSubmit = (newTicketData: Omit<Ticket, 'id'>) => {
    const newTicket: Ticket = {
      ...newTicketData,
      id: `CAM-${Date.now()}` // Use timestamp for unique ID
    };
    
    // Add new ticket at the beginning of the array so it appears on top
    setTickets(prevTickets => [newTicket, ...prevTickets]);
  };

  const handleMoveTicket = (ticketId: string, newStatus: string) => {
    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, status: newStatus as Ticket['status'] }
          : ticket
      )
    );
  };

  const selectedUser = selectedTicket ? users.find(u => u.id === selectedTicket.userId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <KanbanHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedUser={selectedUserId}
          setSelectedUser={setSelectedUserId}
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
          users={users}
        />
        
        {/* Desktop View */}
        <div className="hidden md:flex gap-6 overflow-x-auto pb-4">
          {columns.map(column => (
            <KanbanColumn
              key={column}
              title={column}
              tickets={getTicketsForColumn(column)}
              users={users}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
              onTicketClick={handleTicketClick}
              onAddTicket={() => handleAddTicket(column)}
            />
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <MobileKanbanView
            columns={columns}
            tickets={filteredTickets}
            users={users}
            onTicketClick={handleTicketClick}
            onAddTicket={handleAddTicket}
            onMoveTicket={handleMoveTicket}
          />
        </div>
      </div>
      
      <TicketDetailDialog
        ticket={selectedTicket}
        user={selectedUser}
        open={ticketDetailOpen}
        onOpenChange={setTicketDetailOpen}
      />
      
      <AddTicketDialog
        open={addTicketOpen}
        onOpenChange={setAddTicketOpen}
        onAddTicket={handleAddTicketSubmit}
        users={users}
        status={addTicketStatus}
      />
    </div>
  );
};

export default KanbanBoard;
