// In a real app, this data would live in a database,

import type { Todo } from "../../types";

// rather than in memory. But for now, we cheat.
const db = new Map();

export function getTodos(userId: string) {
  if (!db.get(userId)) {
    db.set(userId, [
      {
        id: crypto.randomUUID(),
        description: "Learn SvelteKit",
        done: false,
      },
    ]);
  }

  return db.get(userId);
}

export function createTodo(userId: string, description: string) {
  if (description === "") {
    throw new Error("todo must have a description");
  }

  const todos = db.get(userId);

  if (todos.find((todo: Todo) => todo.description === description)) {
    throw new Error("todos must be unique");
  }

  todos.push({
    id: crypto.randomUUID(),
    description,
    done: false,
  });
}

export function deleteTodo(userId: string, todoId: string) {
  const todos = db.get(userId);
  const index = todos.findIndex((todo: Todo) => todo.id === todoId);

  if (index !== -1) {
    todos.splice(index, 1);
  }
}
