# 📘 Kanban Task Management Board Documentation

## 📌 Introduction

A modern and responsive Kanban board built with **React**, **TypeScript**, and **Tailwind CSS**, offering a streamlined interface for task management with drag-and-drop support, mobile optimization, and filter-based task organization.

🔗 **Live Demo**: [kanban-board-rho-ivory.vercel.app](https://kanban-board-rho-ivory.vercel.app/)


![image](https://github.com/user-attachments/assets/ee57aa2f-823c-4264-9978-461a82c63493)





---

## 🚀 Features Overview

- 📋 Drag-and-drop task movement
- 🌓 Mobile-friendly layout with collapsible columns
- 👥 Task assignment and user filtering
- 🔍 Search by title, assignee, or priority
- 🎨 Color-coded task priority levels
- 🧩 Modular, reusable components
- 🔧 Easily customizable status and priority systems

---

## 🧱 Project Structure

```
src/
├── components/
│   ├── ui/                         # Reusable UI elements
│   ├── KanbanBoard.tsx            # Main board
│   ├── KanbanColumn.tsx           # Column component
│   ├── KanbanCard.tsx             # Individual task card
│   ├── KanbanHeader.tsx           # Filter & search bar
│   ├── MobileKanbanView.tsx       # Accordion view for mobile
│   ├── MobileKanbanCard.tsx       # Responsive task card
│   ├── AddTicketDialog.tsx        # Task creation modal
│   └── TicketDetailDialog.tsx     # View/edit task modal
├── data/
│   └── mockData.ts                # Static sample data
├── types/
│   └── kanban.ts                  # Task & status types
├── utils/
│   └── kanbanUtils.ts             # Functions for status/priority
├── pages/
│   ├── Index.tsx                  # Main entry point
│   └── NotFound.tsx               # 404 page
└── App.tsx                        # Root app file
```

---

## 🛠️ Technology Stack

- ⚛️ **React 18** – UI components
- 🧠 **TypeScript** – Static typing
- 🌈 **Tailwind CSS** – Styling
- 📦 **shadcn/ui** – UI primitives
- ⚡ **Vite** – Fast dev server
- 🔁 **React Query** – Data management
- 🧭 **React Router** – Routing
- ✨ **Lucide React** – Icon library

---

## 📥 Getting Started

### 🔧 Prerequisites

- Node.js 16+
- npm or yarn

### 📦 Installation

```bash
npm install
```

### ▶️ Running the App

```bash
npm run dev
```

Navigate to `http://localhost:8080` in your browser.

---

## ✅ Usage Guide

### 📝 Creating Tasks

- Click `+` in a column header
- Enter title, description, assignee, and priority
- Task appears in selected column, sorted by priority

### 🔄 Managing Tasks

- **Desktop**: Drag & drop cards between columns
- **Mobile**: Use the dropdown in each card to change status
- Click a card to view or update details
- Use filters (user, priority, search) from the top bar

### 📱 Mobile Experience

- Columns collapse into accordion-style sections
- Optimized for small screens



## 🙌 Credits

Created by [Aezy](https://github.com/aezazali1997)
