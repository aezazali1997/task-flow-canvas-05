
import { Search, Filter } from 'lucide-react';
import { User } from '../types/kanban';

interface KanbanHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedUser: string;
  setSelectedUser: (userId: string) => void;
  selectedPriority: string;
  setSelectedPriority: (priority: string) => void;
  users: User[];
}

const KanbanHeader = ({
  searchTerm,
  setSearchTerm,
  selectedUser,
  setSelectedUser,
  selectedPriority,
  setSelectedPriority,
  users
}: KanbanHeaderProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Kanban Board</h1>
          <p className="text-gray-600">Manage your tasks efficiently with drag-and-drop functionality</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Users</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Priorities</option>
              <option value="4">Urgent</option>
              <option value="3">High</option>
              <option value="2">Medium</option>
              <option value="1">Low</option>
              <option value="0">None</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanHeader;
