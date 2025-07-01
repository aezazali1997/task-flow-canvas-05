
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Ticket, User } from '../types/kanban';

interface AddTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTicket: (ticket: Omit<Ticket, 'id'>) => void;
  users: User[];
  status: string;
}

const AddTicketDialog = ({ open, onOpenChange, onAddTicket, users, status }: AddTicketDialogProps) => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [userId, setUserId] = useState('');
  const [priority, setPriority] = useState('2');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !userId) return;

    const newTicket: Omit<Ticket, 'id'> = {
      title: title.trim(),
      tag: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      userId,
      status: status as Ticket['status'],
      priority: parseInt(priority)
    };

    onAddTicket(newTicket);
    
    // Reset form
    setTitle('');
    setTags('');
    setUserId('');
    setPriority('2');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Ticket to {status}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Title *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter ticket title"
              required
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Tags</label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags separated by commas"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Assignee *</label>
            <Select value={userId} onValueChange={setUserId} required>
              <SelectTrigger>
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Priority</label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Low</SelectItem>
                <SelectItem value="2">Medium</SelectItem>
                <SelectItem value="3">High</SelectItem>
                <SelectItem value="4">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Ticket
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTicketDialog;
