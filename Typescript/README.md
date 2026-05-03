# TypeScript CLI Task Manager

A command-line task management tool built with TypeScript running on Node.js.
Assignment 4B — Deckzi Software Developer Pre-Recruitment Program — Section 4.

---

## Features

- Add tasks with title, priority level and optional due date
- List all tasks sorted by priority
- Mark tasks as complete
- Filter tasks by status or priority
- Delete tasks by ID
- Data persists to tasks.json between sessions
- Fully typed — no implicit any
- Strict mode enabled

---

## Tech Stack

| Technology | Purpose |
|---|---|
| TypeScript 5 | Typed language |
| Node.js | Runtime environment |
| tsc | TypeScript compiler |
| fs module | File system for JSON persistence |

---

## Project Structure
typescript-task-manager/
├── src/
│   ├── enums.ts          ← Priority and Status enums
│   ├── types.ts          ← Interfaces and type aliases
│   ├── task.ts           ← Task class
│   ├── fileHandler.ts    ← JSON read and write
│   ├── taskManager.ts    ← Core business logic
│   ├── utils.ts          ← Generic utility functions
│   └── index.ts          ← Entry point and CLI menu
├── dist/                 ← Compiled JavaScript output
├── data/
│   └── tasks.json        ← Persisted tasks
├── tsconfig.json         ← TypeScript configuration
├── package.json
├── .gitignore
└── README.md

---

## Requirements

- Node.js installed
- TypeScript installed

Check Node version:
node --version

Check npm version:
npm --version

---

## Setup Instructions

### 1. Clone the repository
git clone https://github.com/velkarthik84-cloud/typescript-task-manager.git
cd typescript-task-manager

### 2. Install dependencies
npm install

### 3. Compile TypeScript
npx tsc

### 4. Run the application
node dist/index.js

### Or run both steps together
npm run dev

---

## How to Use

When the app starts you will see:
Welcome to TypeScript Task Manager!
You have 0 task(s) loaded.
========== TypeScript Task Manager ==========

Add Task
List All Tasks
Mark Task Complete
Filter Tasks
Delete Task
Exit
=============================================
Enter your choice (1-6):


### Adding a Task
- Select option 1
- Enter task title
- Enter priority: low, medium, or high
- Enter due date in YYYY-MM-DD format or press Enter to skip

### Listing Tasks
- Select option 2
- Tasks are automatically sorted by priority
- High priority tasks appear first

### Marking Complete
- Select option 3
- Enter the task ID to mark as complete

### Filtering Tasks
- Select option 4
- Filter by status: pending or complete
- Filter by priority: low, medium, or high

### Deleting a Task
- Select option 5
- Enter task ID
- Confirm with yes or no

---

## TypeScript Concepts Demonstrated

| Concept | Where Used |
|---|---|
| Interfaces | Task, CreateTaskInput, FilterOptions, Result |
| Enums | Priority (low/medium/high), Status (pending/complete) |
| Generic functions | findById, removeById, updateById, getNextId |
| Type aliases | TaskList, TaskId |
| Optional properties | dueDate? in Task interface |
| Readonly properties | readonly id in Task |
| Union types | 'success' or 'error' or 'info' |
| Type guards | isPriority, isNumber |
| Classes | TaskItem, TaskManager |
| Access modifiers | private tasks in TaskManager |
| Import and export | All files use ES modules |
| Strict mode | Enabled in tsconfig.json |
| No implicit any | Enforced throughout |

---

## Data Persistence

Tasks are saved to data/tasks.json automatically after every change.

Example tasks.json:
```json
[
  {
    "id": 1,
    "title": "Complete assignment",
    "priority": "high",
    "status": "pending",
    "dueDate": "2024-12-01",
    "createdAt": "2024-11-20"
  }
]
```

---

## tsconfig.json Settings

| Setting | Value | Purpose |
|---|---|---|
| strict | true | Enable all strict checks |
| noImplicitAny | true | No implicit any types |
| strictNullChecks | true | Null safety |
| target | ES2020 | Modern JavaScript output |
| module | commonjs | Node.js compatible |
| outDir | ./dist | Compiled output folder |
| rootDir | ./src | Source files location |

---

## Scripts

| Command | Description |
|---|---|
| npm run build | Compile TypeScript only |
| npm run start | Run compiled app |
| npm run dev | Compile and run together |

---

## Common Issues

### tsc not found
npm install typescript --save-dev
npx tsc

### Cannot find module
npm install
npx tsc
node dist/index.js

### Permission error on Windows
Run terminal as Administrator.