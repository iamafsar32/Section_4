// src/enums.ts

// Priority levels as string enum
export enum Priority {
  Low    = 'low',
  Medium = 'medium',
  High   = 'high'
}

// Task status as string enum
export enum Status {
  Pending  = 'pending',
  Complete = 'complete'
}

// Priority order for sorting
export const PRIORITY_ORDER: Record<Priority, number> = {
  [Priority.High]:   1,
  [Priority.Medium]: 2,
  [Priority.Low]:    3
};