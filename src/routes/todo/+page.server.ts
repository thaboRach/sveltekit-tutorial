import * as db from "$lib/server/database";
import type { Cookies, Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";

export function load({ cookies }: { cookies: Cookies }) {
  const id = cookies.get("userId");

  if (!id) {
    cookies.set("userId", crypto.randomUUID(), { path: "/" });
  }

  return {
    todos: db.getTodos(id ?? "") ?? [],
  };
}

export const actions = {
  create: async ({ cookies, request }) => {
    await new Promise((fulfil) => setTimeout(fulfil, 1000));

    const data = await request.formData();

    try {
      // @ts-ignore
      db.createTodo(cookies.get("userId") ?? "", data.get("description"));
    } catch (error: ErrorEvent) {
      return fail(422, {
        description: data.get("description"),
        error: error.message,
      });
    }
  },
  delete: async ({ cookies, request }) => {
    await new Promise((fulfil) => setTimeout(fulfil, 1000));

    const data = await request.formData();
    // @ts-ignore
    db.deleteTodo(cookies.get("userId") ?? "", data.get("id"));
  },
} satisfies Actions;
