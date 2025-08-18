const todos = [
  { id: 1, title: "Learn React", done: false },
  { id: 2, title: "Build a Todo App", done: true },
  { id: 3, title: "Learn React Router", done: false },
  { id: 4, title: "Learn Redux", done: true },
];

export const getTodos = async () => {
  const response = await fetch("/api/todos");
  const data = response.json();
  if (!data) {
    return [...todos];
  }
  return data;
};

export const getTodoById = async (id) => {
  const response = await fetch(`/api/todos/${id}`);
  const data = await response.json();
  return data;
};

export const createTodo = async (title) => {
  const response = await fetch(`/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  const data = await response.json();
  return data;
};

export const deleteTodo = async (id) => {
  await fetch(`/api/todos/${id}`, {
    method: "DELETE",
  });
};

export const updateTodo = async (id, updatedTodo) => {
  await fetch(`/api/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedTodo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return { id, ...updateTodo };
};
