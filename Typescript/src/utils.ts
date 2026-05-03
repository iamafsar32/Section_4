// src/utils.ts
import { Priority, PRIORITY_ORDER } from './enums';
import { Task } from './types';

// Generic function to find item by ID
export const findById = <T extends { id: number }>(
  items: T[],
  id: number
): T | undefined => {
  return items.find(item => item.id === id);
};

// Generic function to remove item by ID
export const removeById = <T extends { id: number }>(
  items: T[],
  id: number
): T[] => {
  return items.filter(item => item.id !== id);
};

// Generic function to update item by ID
export const updateById = <T extends { id: number }>(
  items: T[],
  id: number,
  updates: Partial<T>
): T[] => {
  return items.map(item =>
    item.id === id ? { ...item, ...updates } : item
  );
};

// Sort tasks by priority
export const sortByPriority = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) =>
    PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
  );
};

// Type guard — check if string is valid Priority
export const isPriority = (value: string): value is Priority => {
  return Object.values(Priority).includes(value as Priority);
};

// Type guard — check if value is a number
export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

// Get next ID from list
export const getNextId = <T extends { id: number }>(
  items: T[]
): number => {
  if (items.length === 0) return 1;
  return Math.max(...items.map(item => item.id)) + 1;
};

// Format date for display
export const formatDate = (date?: string): string => {
  if (!date) return 'No due date';
  return new Date(date).toLocaleDateString('en-IN', {
    year:  'numeric',
    month: 'short',
    day:   'numeric'
  });
};

// Validate date format YYYY-MM-DD
export const isValidDate = (date: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) return false;
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};