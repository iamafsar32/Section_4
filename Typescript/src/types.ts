// src/types.ts
import { Priority, Status } from './enums';

// Main Task interface
export interface Task {
  readonly id:   number;
  title:         string;
  priority:      Priority;
  status:        Status;
  dueDate?:      string;       // optional property
  createdAt:     string;
}

// Input for creating a task
export interface CreateTaskInput {
  title:    string;
  priority: Priority;
  dueDate?: string;            // optional due date
}

// Filter options
export interface FilterOptions {
  status?:   Status;
  priority?: Priority;
}

// Generic result type
export interface Result<T> {
  success: boolean;
  data?:   T;
  error?:  string;
}

// Type alias for task list
export type TaskList = Task[];

// Type alias for task ID
export type TaskId = number;