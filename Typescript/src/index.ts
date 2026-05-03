// src/index.ts
import * as readline from 'readline';
import { TaskManager }      from './taskManager';
import { Priority, Status } from './enums';
import { isPriority, isValidDate, formatDate } from './utils';
import { Task } from './types';

const manager = new TaskManager();

const rl = readline.createInterface({
  input:  process.stdin,
  output: process.stdout
});

const prompt = (question: string): Promise<string> => {
  return new Promise(resolve => {
    rl.question(question, (answer: string) =>
      resolve(answer.trim())
    );
  });
};

const showMenu = (): void => {
  console.log('\n  ========== TypeScript Task Manager ==========');
  console.log('  1.  Add Task');
  console.log('  2.  List All Tasks');
  console.log('  3.  Mark Task Complete');
  console.log('  4.  Filter Tasks');
  console.log('  5.  Delete Task');
  console.log('  6.  Exit');
  console.log('  =============================================');
};

const displayTask = (task: Task): void => {
  const status = task.status === Status.Complete
    ? '✅' : '⏳';
  const priority = task.priority === Priority.High
    ? '🔴 High'
    : task.priority === Priority.Medium
    ? '🟡 Medium'
    : '🟢 Low';

  console.log(`\n  [${task.id}] ${task.title}`);
  console.log(`      Priority : ${priority}`);
  console.log(`      Status   : ${status} ${task.status}`);
  console.log(`      Due Date : ${formatDate(task.dueDate)}`);
  console.log(`      Created  : ${task.createdAt}`);
};

const displayTasks = (tasks: Task[]): void => {
  if (tasks.length === 0) {
    console.log('\n  No tasks found.');
    return;
  }
  console.log(`\n  Found ${tasks.length} task(s):`);
  tasks.forEach(displayTask);
};

const handleAddTask = async (): Promise<void> => {
  console.log('\n  -- Add New Task --');

  const title = await prompt('  Enter task title: ');
  if (!title) {
    console.log('  Title cannot be empty.');
    return;
  }

  console.log('  Priority: low | medium | high');
  const priorityInput = await prompt('  Enter priority: ');

  if (!isPriority(priorityInput)) {
    console.log('  Invalid priority. Use: low, medium, or high');
    return;
  }

  const dueDateInput = await prompt(
    '  Enter due date (YYYY-MM-DD) or press Enter to skip: '
  );

  let dueDate: string | undefined;
  if (dueDateInput) {
    if (!isValidDate(dueDateInput)) {
      console.log('  Invalid date. Use format: YYYY-MM-DD');
      return;
    }
    dueDate = dueDateInput;
  }

  const result = manager.addTask({
    title,
    priority: priorityInput,
    dueDate
  });

  if (result.success && result.data) {
    console.log(`  Task added! ID: ${result.data.id}`);
    displayTask(result.data);
  } else {
    console.log(`  Error: ${result.error ?? 'Unknown error'}`);
  }
};

const handleListTasks = (): void => {
  console.log('\n  -- All Tasks (sorted by priority) --');
  const result = manager.getAllTasks();
  if (result.data) displayTasks(result.data);
};

const handleCompleteTask = async (): Promise<void> => {
  console.log('\n  -- Mark Task Complete --');

  const idInput = await prompt('  Enter task ID: ');
  const id = parseInt(idInput, 10);

  if (isNaN(id) || id <= 0) {
    console.log('  Please enter a valid ID number.');
    return;
  }

  const result = manager.completeTask(id);

  if (result.success && result.data) {
    console.log(`  Task ${id} marked as complete!`);
    displayTask(result.data);
  } else {
    console.log(`  Error: ${result.error ?? 'Unknown error'}`);
  }
};

const handleFilterTasks = async (): Promise<void> => {
  console.log('\n  -- Filter Tasks --');
  console.log('  1. Filter by Status');
  console.log('  2. Filter by Priority');

  const choice = await prompt('  Enter choice (1 or 2): ');

  if (choice === '1') {
    const statusInput = await prompt(
      '  Enter status (pending/complete): '
    );

    const status = statusInput === 'complete'
      ? Status.Complete
      : statusInput === 'pending'
      ? Status.Pending
      : null;

    if (!status) {
      console.log('  Invalid status. Use: pending or complete');
      return;
    }

    const result = manager.filterTasks({ status });
    console.log(`\n  Tasks with status: ${status}`);
    if (result.data) displayTasks(result.data);

  } else if (choice === '2') {
    const priorityInput = await prompt(
      '  Enter priority (low/medium/high): '
    );

    if (!isPriority(priorityInput)) {
      console.log('  Invalid priority. Use: low, medium, or high');
      return;
    }

    const result = manager.filterTasks({
      priority: priorityInput
    });
    console.log(`\n  Tasks with priority: ${priorityInput}`);
    if (result.data) displayTasks(result.data);

  } else {
    console.log('  Invalid choice. Enter 1 or 2.');
  }
};

const handleDeleteTask = async (): Promise<void> => {
  console.log('\n  -- Delete Task --');

  const idInput = await prompt('  Enter task ID to delete: ');
  const id = parseInt(idInput, 10);

  if (isNaN(id) || id <= 0) {
    console.log('  Please enter a valid ID number.');
    return;
  }

  const confirm = await prompt(
    `  Delete task ${id}? (yes/no): `
  );

  if (confirm !== 'yes') {
    console.log('  Delete cancelled.');
    return;
  }

  const result = manager.deleteTask(id);

  if (result.success) {
    console.log(`  Task ${id} deleted successfully.`);
  } else {
    console.log(`  Error: ${result.error ?? 'Unknown error'}`);
  }
};

const main = async (): Promise<void> => {
  console.log('\n  Welcome to TypeScript Task Manager!');
  console.log(`  You have ${manager.getCount()} task(s) loaded.`);

  while (true) {
    try {
      showMenu();
      const choice = await prompt('  Enter your choice (1-6): ');

      switch (choice) {
        case '1': await handleAddTask();      break;
        case '2':       handleListTasks();    break;
        case '3': await handleCompleteTask(); break;
        case '4': await handleFilterTasks();  break;
        case '5': await handleDeleteTask();   break;
        case '6':
          console.log('\n  Goodbye!\n');
          rl.close();
          process.exit(0);
        default:
          console.log('  Invalid choice. Enter 1 to 6.');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(`  Unexpected error: ${err.message}`);
      }
    }
  }
};

main();