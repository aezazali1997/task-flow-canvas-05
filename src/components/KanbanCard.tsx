
import { Ticket, User } from '../types/kanban';
import { getPriorityColor, getPriorityLabel, getUserInitials } from '../utils/kanbanUtils';

interface KanbanCardProps {
  ticket: Ticket;
  user: User;
  onDragStart: (e: React.DragEvent, ticketId: string) => void;
}

const KanbanCard = ({ ticket, user, onDragStart }: KanbanCardProps) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, ticket.id)}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 cursor-move hover:shadow-md transition-all duration-200 hover:scale-[1.02] group"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {ticket.id}
        </span>
        <div className={`w-2 h-2 rounded-full ${getPriorityColor(ticket.priority)}`} 
             title={getPriorityLabel(ticket.priority)} />
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
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
          <span className="text-sm text-gray-600 hidden sm:block">{user.name}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <div className={`w-1 h-4 rounded ${getPriorityColor(ticket.priority)}`} />
          <span className="text-xs text-gray-500">{getPriorityLabel(ticket.priority)}</span>
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
