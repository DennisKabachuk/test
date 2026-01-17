"use client";

import { useState, useEffect, useCallback, DragEvent } from "react";
import { cn } from "@/lib/utils";
import { Plus, Trash2, GripVertical } from "lucide-react";

// Types
interface Task {
  id: string;
  title: string;
  description?: string;
  createdAt: number;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface KanbanState {
  columns: Column[];
}

const STORAGE_KEY = "kanban-board-state";

const defaultState: KanbanState = {
  columns: [
    { id: "todo", title: "To Do", tasks: [] },
    { id: "in-progress", title: "In Progress", tasks: [] },
    { id: "done", title: "Done", tasks: [] },
  ],
};

// Custom hook for localStorage persistence
function useKanbanState() {
  const [state, setState] = useState<KanbanState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setState(parsed);
      } catch {
        setState(defaultState);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isLoaded]);

  return [state, setState, isLoaded] as const;
}

// Generate unique ID
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Task Card Component
function TaskCard({
  task,
  columnId,
  onDelete,
  onDragStart,
}: {
  task: Task;
  columnId: string;
  onDelete: (taskId: string, columnId: string) => void;
  onDragStart: (e: DragEvent, taskId: string, columnId: string) => void;
}) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id, columnId)}
      className={cn(
        "group relative bg-zinc-800 border border-zinc-700 rounded-lg p-3 cursor-grab active:cursor-grabbing",
        "hover:border-zinc-600 hover:shadow-md hover:shadow-black/20 transition-all",
        "select-none touch-manipulation"
      )}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="w-4 h-4 text-zinc-500 mt-0.5 opacity-50 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-zinc-100">{task.title}</p>
          {task.description && (
            <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id, columnId);
          }}
          className="opacity-50 sm:opacity-0 sm:group-hover:opacity-100 p-1.5 hover:bg-red-500/20 rounded transition-all flex-shrink-0"
        >
          <Trash2 className="w-4 h-4 text-red-400" />
        </button>
      </div>
    </div>
  );
}

// Add Task Form Component
function AddTaskForm({
  columnId,
  onAdd,
  onCancel,
}: {
  columnId: string;
  onAdd: (columnId: string, title: string, description?: string) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(columnId, title.trim(), description.trim() || undefined);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 space-y-2">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-700 rounded-md text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent"
        autoFocus
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-700 rounded-md text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent resize-none"
        rows={2}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!title.trim()}
          className="flex-1 px-3 py-2 text-sm font-medium bg-zinc-100 text-zinc-900 rounded-md hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Add Task
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 text-sm font-medium bg-zinc-700 text-zinc-100 rounded-md hover:bg-zinc-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// Column Component
function KanbanColumn({
  column,
  onAddTask,
  onDeleteTask,
  onDragStart,
  onDragOver,
  onDrop,
  isDragTarget,
}: {
  column: Column;
  onAddTask: (columnId: string, title: string, description?: string) => void;
  onDeleteTask: (taskId: string, columnId: string) => void;
  onDragStart: (e: DragEvent, taskId: string, columnId: string) => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent, columnId: string) => void;
  isDragTarget: boolean;
}) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
      className={cn(
        "flex flex-col w-full sm:w-80 sm:min-w-[320px] bg-zinc-900/50 rounded-xl p-3 transition-colors",
        isDragTarget && "bg-zinc-800 ring-2 ring-zinc-600"
      )}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-semibold text-zinc-100">{column.title}</h3>
        <span className="text-xs text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full">
          {column.tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div className="flex-1 space-y-2 min-h-[60px] sm:min-h-[100px]">
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            columnId={column.id}
            onDelete={onDeleteTask}
            onDragStart={onDragStart}
          />
        ))}
      </div>

      {/* Add Task Button/Form */}
      <div className="mt-3">
        {isAdding ? (
          <AddTaskForm
            columnId={column.id}
            onAdd={(colId, title, desc) => {
              onAddTask(colId, title, desc);
              setIsAdding(false);
            }}
            onCancel={() => setIsAdding(false)}
          />
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        )}
      </div>
    </div>
  );
}

// Main Kanban Board Component
export default function KanbanBoard() {
  const [state, setState, isLoaded] = useKanbanState();
  const [draggedTask, setDraggedTask] = useState<{
    taskId: string;
    sourceColumnId: string;
  } | null>(null);
  const [dragTargetColumn, setDragTargetColumn] = useState<string | null>(null);

  const handleAddTask = useCallback(
    (columnId: string, title: string, description?: string) => {
      const newTask: Task = {
        id: generateId(),
        title,
        description,
        createdAt: Date.now(),
      };

      setState((prev) => ({
        ...prev,
        columns: prev.columns.map((col) =>
          col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col
        ),
      }));
    },
    [setState]
  );

  const handleDeleteTask = useCallback(
    (taskId: string, columnId: string) => {
      setState((prev) => ({
        ...prev,
        columns: prev.columns.map((col) =>
          col.id === columnId
            ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
            : col
        ),
      }));
    },
    [setState]
  );

  const handleDragStart = useCallback(
    (e: DragEvent, taskId: string, columnId: string) => {
      setDraggedTask({ taskId, sourceColumnId: columnId });
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", taskId);
    },
    []
  );

  const handleDragOver = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";

      // Find target column from event
      const target = e.currentTarget as HTMLElement;
      const columnElement = target.closest("[data-column-id]");
      if (columnElement) {
        const columnId = columnElement.getAttribute("data-column-id");
        if (columnId && columnId !== dragTargetColumn) {
          setDragTargetColumn(columnId);
        }
      }
    },
    [dragTargetColumn]
  );

  const handleDrop = useCallback(
    (e: DragEvent, targetColumnId: string) => {
      e.preventDefault();
      setDragTargetColumn(null);

      if (!draggedTask) return;
      if (draggedTask.sourceColumnId === targetColumnId) {
        setDraggedTask(null);
        return;
      }

      setState((prev) => {
        // Find the task being moved
        const sourceColumn = prev.columns.find(
          (c) => c.id === draggedTask.sourceColumnId
        );
        const task = sourceColumn?.tasks.find((t) => t.id === draggedTask.taskId);
        if (!task) return prev;

        return {
          ...prev,
          columns: prev.columns.map((col) => {
            if (col.id === draggedTask.sourceColumnId) {
              // Remove from source
              return {
                ...col,
                tasks: col.tasks.filter((t) => t.id !== draggedTask.taskId),
              };
            }
            if (col.id === targetColumnId) {
              // Add to target
              return { ...col, tasks: [...col.tasks, task] };
            }
            return col;
          }),
        };
      });

      setDraggedTask(null);
    },
    [draggedTask, setState]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedTask(null);
    setDragTargetColumn(null);
  }, []);

  const handleReset = useCallback(() => {
    if (confirm("Are you sure you want to reset the board? This will delete all tasks.")) {
      setState(defaultState);
    }
  }, [setState]);

  // Show loading state
  if (!isLoaded) {
    return (
      <div className="dark min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-pulse text-zinc-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100" onDragEnd={handleDragEnd}>
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 truncate">Kanban Board</h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 hidden sm:block">
              Drag and drop tasks between columns
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors whitespace-nowrap"
            >
              Reset
            </button>
          </div>
        </div>
      </header>

      {/* Board */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:overflow-x-auto pb-4">
          {state.columns.map((column) => (
            <div key={column.id} data-column-id={column.id} className="w-full sm:w-auto">
              <KanbanColumn
                column={column}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                isDragTarget={dragTargetColumn === column.id}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 w-full sm:w-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 shadow-lg text-center">
          <p className="text-xs text-zinc-500">
            Auto-saved to localStorage
          </p>
        </div>
      </footer>
    </div>
  );
}
