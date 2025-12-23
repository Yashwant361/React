import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  updateTodo,
  toggleTodo,
} from "../redux/actions/todoActions";

export default function Todo() {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddOrUpdate = () => {
    if (!text.trim()) return;

    if (editId) {
      dispatch(updateTodo(editId, text));
      setEditId(null);
    } else {
      dispatch(addTodo(text));
    }
    setText("");
  };

  const handleEdit = (todo) => {
    setText(todo.text);
    setEditId(todo.id);
  };

  const handleCancel = () => {
    setText("");
    setEditId(null);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Todo</h2>

      {/* INPUT AREA */}
      <div style={{ marginBottom: "20px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo"
          style={{
            padding: "8px",
            marginRight: "10px",
            width: "300px",
            fontSize: "14px",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddOrUpdate();
          }}
        />

        <button
          onClick={handleAddOrUpdate}
          style={{
            padding: "8px 16px",
            marginRight: "5px",
            cursor: "pointer",
            backgroundColor: editId ? "#ff9800" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          {editId ? "Update" : "Add"}
        </button>

        {editId && (
          <button
            onClick={handleCancel}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              backgroundColor: "#757575",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* TODO LIST */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.length === 0 ? (
          <li style={{ color: "#999", fontStyle: "italic" }}>
            {/* No todos yet */}
          </li>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                marginBottom: "8px",
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
                border:
                  editId === todo.id
                    ? "2px solid #ff9800"
                    : "1px solid #ddd",
              }}
            >
              {/* CHECKBOX */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
                style={{ marginRight: "12px" }}
              />

              {/* TEXT + DATE */}
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    display: "block",
                    textDecoration: todo.completed
                      ? "line-through"
                      : "none",
                    color: todo.completed ? "#999" : "#000",
                    fontSize: "16px",
                  }}
                >
                  {todo.text}
                </span>

                <small style={{ color: "#777" }}>
                  {/* Created on:*/}{" "} 
                  {todo.createdAt
                    ? new Date(todo.createdAt).toLocaleString()
                    : "N/A"}
                </small>
              </div>

              {/* ACTION BUTTONS */}
              <button
                onClick={() => handleEdit(todo)}
                style={{
                  padding: "6px 12px",
                  marginRight: "5px",
                  cursor: "pointer",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                style={{
                  padding: "6px 12px",
                  cursor: "pointer",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
