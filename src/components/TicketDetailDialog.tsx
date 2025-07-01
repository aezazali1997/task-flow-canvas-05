
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Ticket, User } from '../types/kanban';
import { getPriorityColor, getPriorityLabel, getUserInitials } from '../utils/kanbanUtils';

interface TicketDetailDialogProps {
  ticket: Ticket | null;
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TicketDetailDialog = ({ ticket, user, open, onOpenChange }: TicketDetailDialogProps) => {
  if (!ticket || !user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{ticket.title}</span>
            <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {ticket.id}
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Status:</span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {ticket.status}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Priority:</span>
              <div className="flex items-center gap-1">
                <div className={`w-3 h-3 rounded-full ${getPriorityColor(ticket.priority)}`} />
                <span className="text-sm">{getPriorityLabel(ticket.priority)}</span>
              </div>
            </div>
          </div>
          
          <div>
            <span className="text-sm font-medium text-gray-600">Tags:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {ticket.tag.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Assignee:</span>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {getUserInitials(user.name)}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  user.available ? 'bg-green-500' : 'bg-red-500'
                }`} />
              </div>
              <span className="text-sm">{user.name}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                user.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {user.available ? 'Available' : 'Busy'}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDetailDialog;
