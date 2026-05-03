// src/taskManager.ts
import { Task, CreateTaskInput, FilterOptions, Result, TaskList } from './types';
import { Status, Priority }  from './enums';
import { TaskItem }          from './task';
import { loadTasks, saveTasks } from './fileHandler';
import {
  findById, removeById, updateById,
  sortByPriority, getNextId
} from './utils';

export class TaskManager {
  private tasks: TaskList;

  constructor() {
    this.tasks = loadTasks();
  }

  // Add new task
  addTask(input: CreateTaskInput): Result<Task> {
    try {
      const id      = getNextId(this.tasks);
      const newTask = new TaskItem(id, input);
      this.tasks.push(newTask.toJSON());
      saveTasks(this.tasks);
      return { success: true, data: newTask.toJSON() };
    } catch (error) {
      return { success: false, error: 'Failed to add task' };
    }
  }

  // Get all tasks sorted by priority
  getAllTasks(): Result<TaskList> {
    const sorted = sortByPriority(this.tasks);
    return { success: true, data: sorted };
  }

  // Filter tasks by status or priority
  filterTasks(options: FilterOptions): Result<TaskList> {
    let filtered = [...this.tasks];

    if (options.status) {
      filtered = filtered.filter(
        t => t.status === options.status
      );
    }

    if (options.priority) {
      filtered = filtered.filter(
        t => t.priority === options.priority
      );
    }

    return {
      success: true,
      data: sortByPriority(filtered)
    };
  }

  // Mark task as complete
  completeTask(id: number): Result<Task> {
    const task = findById(this.tasks, id);

    if (!task) {
      return {
        success: false,
        error: `Task with ID ${id} not found`
      };
    }

    if (task.status === Status.Complete) {
      return {
        success: false,
        error: `Task ${id} is already complete`
      };
    }

    this.tasks = updateById(this.tasks, id, {
      status: Status.Complete
    });

    saveTasks(this.tasks);

    const updated = findById(this.tasks, id)!;
    return { success: true, data: updated };
  }

  // Delete task by ID
  deleteTask(id: number): Result<number> {
    const task = findById(this.tasks, id);

    if (!task) {
      return {
        success: false,
        error: `Task with ID ${id} not found`
      };
    }

    this.tasks = removeById(this.tasks, id);
    saveTasks(this.tasks);
    return { success: true, data: id };
  }

  // Get task count
  getCount(): number {
    return this.tasks.length;
  }
}