import { useAuth } from "../AuthContext";

export const useTodoService = () => {
  const { token } = useAuth();

  const getTodos = async (
    filter = "all",
    searchTitle = "",
    page = 1,
    limit = 5
  ) => {
    let url = "/api/todos";
    let params = [];

    if (filter === "completed") {
      params.push("done=true");
    } else if (filter === "pending") {
      params.push("done=false");
    }

    if (searchTitle) {
      params.push(`title_like=${encodeURIComponent(searchTitle)}`);
    }

    params.push(`_page=${page}`);
    params.push(`_limit=${limit}`);

    if (params.length > 0) {
      url += "?" + params.join("&");
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }

    const data = await response.json();
    const completeCount = data.filter((t) => t.done).length;
    const totalCount = response.headers.get("X-Total-Count");
    console.log(completeCount);
    return {
      todos: data,
      totalCount: parseInt(totalCount) || data.length,
      completed: completeCount,
    };
  };

  const getTodoById = async (id) => {
    const response = await fetch(`/api/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch todo");
    }
    return response.json();
  };

  const createTodo = async ({ title, description }) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        done: false,
        createdAt: new Date().toISOString(),
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Failed to create todo");
    }
    return data;
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }
  };

  const updateTodo = async (id, updatedFields) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedFields),
    });
    if (!response.ok) {
      throw new Error("Failed to update todo");
    }
    return { id, ...updatedFields };
  };

  return {
    getTodos,
    getTodoById,
    createTodo,
    deleteTodo,
    updateTodo,
  };
};
