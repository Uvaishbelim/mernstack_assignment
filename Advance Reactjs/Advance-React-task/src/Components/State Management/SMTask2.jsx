import React, { useState } from "react";
import { atom, useRecoilState } from "recoil";

const todoListState = atom({
  key: "todoListState",
  default: [],
});

const SMTask2 = () => {
  const [todos, setTodos] = useRecoilState(todoListState);
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    const trimmedTask = task.trim();

    if (!trimmedTask) {
      return;
    }

    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: Date.now(),
        text: trimmedTask,
        completed: false,
      },
    ]);
    setTask("");
  };

  const handleToggleTask = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleRemoveTask = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Recoil Todo List</h1>

      <div style={styles.inputRow}>
        <input
          type="text"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleAddTask();
            }
          }}
          placeholder="Add a new task"
          style={styles.input}
        />
        <button onClick={handleAddTask} style={styles.addButton}>
          Add Task
        </button>
      </div>

      {todos.length === 0 ? (
        <p style={styles.emptyState}>No tasks yet. Add one to get started.</p>
      ) : (
        <ul style={styles.list}>
          {todos.map((todo) => (
            <li key={todo.id} style={styles.listItem}>
              <label style={styles.taskLabel}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTask(todo.id)}
                />
                <span
                  style={{
                    ...styles.taskText,
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#6b7280" : "#111827",
                  }}
                >
                  {todo.text}
                </span>
              </label>
              <button
                onClick={() => handleRemoveTask(todo.id)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "520px",
    margin: "40px auto",
    padding: "24px",
    borderRadius: "16px",
    backgroundColor: "#f8fafc",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
    fontFamily: "sans-serif",
  },
  heading: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#0f172a",
  },
  inputRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
  },
  addButton: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    cursor: "pointer",
  },
  emptyState: {
    textAlign: "center",
    color: "#64748b",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 14px",
    marginBottom: "10px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
  },
  taskLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  taskText: {
    fontSize: "16px",
  },
  removeButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#ef4444",
    color: "#ffffff",
    cursor: "pointer",
  },
};

export default SMTask2;