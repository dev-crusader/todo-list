import { useAuth } from "../AuthContext";

export const useTodoService = () => {
  const { token } = useAuth();

  const getTodos = async (filter = "all", searchTitle = "") => {
    let url = "/api/todos";
    let params = [];

    if (filter === "completed") {
      params.push("done=true");
    } else if (filter === "pending") {
      params.push("done=false");
    }

    if (searchTitle.length > 0) {
      params.push(`title=${encodeURIComponent(searchTitle)}`);
    }

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
    return response.json();
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

  const createTodo = async (title) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
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
