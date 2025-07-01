
import { Ticket, User } from '../types/kanban';
import { getColumnColor, getColumnHeaderColor, sortTicketsByPriority } from '../utils/kanbanUtils';
import KanbanCard from './KanbanCard';
import { Plus } from 'lucide-react';

interface KanbanColumnProps {
  title: string;
  tickets: Ticket[];
  users: User[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: string) => void;
  onDragStart: (e: React.DragEvent, ticketId: string) => void;
}

const KanbanColumn = ({ title, tickets, users, onDragOver, onDrop, onDragStart }: KanbanColumnProps) => {
  const sortedTickets = sortTicketsByPriority(tickets);

  return (
    <div className={`flex-1 min-w-80 rounded-lg border-2 border-dashed ${getColumnColor(title)} p-4`}>
      <div className={`flex items-center justify-between mb-4 px-3 py-2 rounded-lg ${getColumnHeaderColor(title)}`}>
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-lg">{title}</h2>
          <span className="bg-white bg-opacity-50 px-2 py-1 rounded-full text-sm font-medium">
            {tickets.length}
          </span>
        </div>
        <button className="p-1 hover:bg-white hover:bg-opacity-30 rounded transition-colors">
          <Plus className="h-4 w-4" />
        </button>
      </div>
      
      <div
        className="min-h-96 space-y-3"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, title)}
      >
        {sortedTickets.map(ticket => {
          const user = users.find(u => u.id === ticket.userId);
          return user ? (
            <KanbanCard
              key={ticket.id}
              ticket={ticket}
              user={user}
              onDragStart={onDragStart}
            />
          ) : null;
        })}
        
        {tickets.length === 0 && (
          <div className="flex items-center justify-center h-32 text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
            <p>Drop tickets here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
