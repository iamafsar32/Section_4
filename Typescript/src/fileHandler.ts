// src/fileHandler.ts
import * as fs   from 'fs';
import * as path from 'path';
import { Task }  from './types';

const DATA_DIR  = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'tasks.json');

export const loadTasks = (): Task[] => {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    if (!content.trim()) return [];
    return JSON.parse(content) as Task[];
  } catch {
    console.error('Warning: Could not load tasks.');
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(tasks, null, 2),
      'utf-8'
    );
  } catch {
    console.error('Error: Could not save tasks.');
  }
};