
import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { Ticket, User } from '../types/kanban';
import { getColumnColor, getColumnHeaderColor, sortTicketsByPriority } from '../utils/kanbanUtils';
import MobileKanbanCard from './MobileKanbanCard';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface MobileKanbanViewProps {
  columns: string[];
  tickets: Ticket[];
  users: User[];
  onTicketClick: (ticket: Ticket) => void;
  onAddTicket: (status: string) => void;
  onMoveTicket: (ticketId: string, newStatus: string) => void;
}

const MobileKanbanView = ({
  columns,
  tickets,
  users,
  onTicketClick,
  onAddTicket,
  onMoveTicket
}: MobileKanbanViewProps) => {
  const [openColumns, setOpenColumns] = useState<Record<string, boolean>>({
    'Backlog': true,
    'Todo': true,
    'In progress': true,
    'Done': false
  });

  const getTicketsForColumn = (status: string) => {
    const columnTickets = tickets.filter(ticket => ticket.status === status);
    return sortTicketsByPriority(columnTickets);
  };

  const toggleColumn = (column: string) => {
    setOpenColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  return (
    <div className="space-y-4">
      {columns.map(column => {
        const columnTickets = getTicketsForColumn(column);
        const isOpen = openColumns[column];
        
        return (
          <Collapsible key={column} open={isOpen} onOpenChange={() => toggleColumn(column)}>
            <div className={`rounded-lg border-2 border-dashed ${getColumnColor(column)} overflow-hidden`}>
              <CollapsibleTrigger asChild>
                <div className={`flex items-center justify-between p-4 cursor-pointer ${getColumnHeaderColor(column)}`}>
                  <div className="flex items-center gap-3">
                    {isOpen ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                    <h2 className="font-semibold text-lg">{column}</h2>
                    <span className="bg-white bg-opacity-50 px-2 py-1 rounded-full text-sm font-medium">
                      {columnTickets.length}
                    </span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddTicket(column);
                    }}
                    className="p-2 hover:bg-white hover:bg-opacity-30 rounded-full transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="p-4 space-y-3">
                  {columnTickets.length === 0 ? (
                    <div className="flex items-center justify-center h-20 text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
                      <p>No tickets in {column}</p>
                    </div>
                  ) : (
                    columnTickets.map(ticket => {
                      const user = users.find(u => u.id === ticket.userId);
                      return user ? (
                        <MobileKanbanCard
                          key={ticket.id}
                          ticket={ticket}
                          user={user}
                          columns={columns}
                          onTicketClick={onTicketClick}
                          onMoveTicket={onMoveTicket}
                        />
                      ) : null;
                    })
                  )}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        );
      })}
    </div>
  );
};

export default MobileKanbanView;
