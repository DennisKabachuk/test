# Kanban Route Guidelines

## Styling

Always use dark theme with the zinc color palette:
- Background: `bg-zinc-950` (page), `bg-zinc-900` (cards/columns), `bg-zinc-800` (inputs/hover)
- Text: `text-zinc-100` (primary), `text-zinc-400` (secondary), `text-zinc-500` (muted)
- Borders: `border-zinc-700` (cards), `border-zinc-800` (sections)
- Never use CSS variables like `bg-background` or `text-foreground` - use explicit zinc colors

## Mobile Responsiveness

- Columns stack vertically on mobile (`flex-col`), horizontal with scroll on desktop (`sm:flex-row`)
- Full-width columns on mobile (`w-full`), fixed 320px on desktop (`sm:w-80`)
- Interactive elements (delete, drag handle) visible by default on mobile, hover-reveal on desktop
- Use `touch-manipulation` for draggable elements

## State Management

- All state persists to localStorage via `useKanbanState` hook
- Storage key: `kanban-board-state`
- Default columns: "To Do", "In Progress", "Done"

## Component Structure

- `KanbanBoard` - Main page component with drag/drop coordination
- `KanbanColumn` - Column container with add task form toggle
- `TaskCard` - Draggable task with delete action
- `AddTaskForm` - Inline form for creating tasks
