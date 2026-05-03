// src/task.ts
import { Priority, Status } from './enums';
import { Task, CreateTaskInput } from './types';

export class TaskItem implements Task {
  readonly id:   number;
  title:         string;
  priority:      Priority;
  status:        Status;
  dueDate?:      string;
  createdAt:     string;

  constructor(id: number, input: CreateTaskInput) {
    this.id        = id;
    this.title     = input.title;
    this.priority  = input.priority;
    this.status    = Status.Pending;
    this.dueDate   = input.dueDate;
    this.createdAt = new Date().toISOString().split('T')[0];
  }

  // Convert to plain object for JSON storage
  toJSON(): Task {
    return {
      id:        this.id,
      title:     this.title,
      priority:  this.priority,
      status:    this.status,
      dueDate:   this.dueDate,
      createdAt: this.createdAt
    };
  }
}