
# Kanban Task Management Board

A modern, responsive Kanban board application built with React, TypeScript, and Tailwind CSS. Features drag-and-drop functionality, mobile-responsive design, and comprehensive task management capabilities.

## Features

- 📋 Interactive Kanban board with drag-and-drop
- 📱 Mobile-responsive design with collapsible columns
- 🎯 Priority-based task sorting
- 👥 User assignment and filtering
- 🔍 Search and filter functionality
- ✨ Modern UI with smooth animations
- 🎨 Color-coded priorities and status indicators

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components (buttons, dialogs, etc.)
│   ├── KanbanBoard.tsx  # Main Kanban board component
│   ├── KanbanColumn.tsx # Individual column component
│   ├── KanbanCard.tsx   # Task card component
│   ├── KanbanHeader.tsx # Board header with filters
│   ├── MobileKanbanView.tsx    # Mobile-optimized view
│   ├── MobileKanbanCard.tsx    # Mobile task card
│   ├── AddTicketDialog.tsx     # New task creation dialog
│   └── TicketDetailDialog.tsx  # Task detail view dialog
├── data/
│   └── mockData.ts      # Sample data for development
├── types/
│   └── kanban.ts        # TypeScript type definitions
├── utils/
│   └── kanbanUtils.ts   # Utility functions for task management
├── pages/
│   ├── Index.tsx        # Main application page
│   └── NotFound.tsx     # 404 error page
└── App.tsx              # Root application component
```

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **Shadcn/UI** - Component library
- **Vite** - Build tool and dev server
- **React Query** - State management and data fetching
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kanban-task-board
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Usage

### Creating Tasks
- Click the "+" button in any column header to create a new task
- Fill in the task details including title, description, priority, and assignee
- Tasks are automatically sorted by priority and creation date

### Managing Tasks
- **Desktop**: Drag and drop tasks between columns
- **Mobile**: Use the dropdown menu on each task to move between columns
- Click on any task to view detailed information
- Use the header filters to search and filter tasks by user or priority

### Mobile Experience
- Columns collapse into an accordion-style interface
- Touch-friendly interactions with dropdown-based task movement
- Optimized layout for smaller screens

## Customization

### Adding New Columns
Update the `status` type in `src/types/kanban.ts` and add corresponding styling in `src/utils/kanbanUtils.ts`.

### Modifying Priority Levels
Adjust the priority system in `src/utils/kanbanUtils.ts` by updating the `getPriorityColor` and `getPriorityLabel` functions.

### Styling Changes
The project uses Tailwind CSS. Modify component styles directly in the TSX files or extend the Tailwind configuration in `tailwind.config.ts`.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
