
import { Ticket, User } from '../types/kanban';
import { getPriorityColor, getPriorityLabel, getUserInitials } from '../utils/kanbanUtils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { MoreVertical, Move } from 'lucide-react';

interface MobileKanbanCardProps {
  ticket: Ticket;
  user: User;
  columns: string[];
  onTicketClick: (ticket: Ticket) => void;
  onMoveTicket: (ticketId: string, newStatus: string) => void;
}

const MobileKanbanCard = ({ 
  ticket, 
  user, 
  columns, 
  onTicketClick, 
  onMoveTicket 
}: MobileKanbanCardProps) => {
  const availableColumns = columns.filter(col => col !== ticket.status);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {ticket.id}
          </span>
          <div className={`w-2 h-2 rounded-full ${getPriorityColor(ticket.priority)}`} 
               title={getPriorityLabel(ticket.priority)} />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MoreVertical className="h-4 w-4 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white border shadow-lg">
            {availableColumns.map(column => (
              <DropdownMenuItem
                key={column}
                onClick={() => onMoveTicket(ticket.id, column)}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50"
              >
                <Move className="h-4 w-4" />
                Move to {column}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div onClick={() => onTicketClick(ticket)}>
        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">
          {ticket.title}
        </h3>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {ticket.tag.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                {getUserInitials(user.name)}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                user.available ? 'bg-green-500' : 'bg-red-500'
              }`} />
            </div>
            <span className="text-sm text-gray-600">{user.name}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <div className={`w-1 h-4 rounded ${getPriorityColor(ticket.priority)}`} />
            <span className="text-xs text-gray-500">{getPriorityLabel(ticket.priority)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileKanbanCard;
