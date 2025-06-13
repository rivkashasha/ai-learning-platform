import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearAdminError
} from "../redux/adminSlice";
import api from "../api/api";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<any[]>([]);
  const [prompts, setPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"users" | "prompts" | null>(null);

  const handleShowUsers = async () => {
    setView("users");
    dispatch(clearAdminError());
    setLoading(true);
    setError(null);
    try {
      const usersData = await api.getAllUsers();
      setUsers(usersData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleShowPrompts = async () => {
    setView("prompts");
    dispatch(clearAdminError());
    setLoading(true);
    setError(null);
    try {
      const promptsData = await api.getAllPrompts();
      setPrompts(promptsData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch prompts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: 900,
      margin: '2rem auto',
      padding: '2rem',
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 2px 16px #e3e8ee'
    }}>
      <h2>Admin Dashboard</h2>
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={handleShowUsers}
          style={{
            marginRight: 8,
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '0.5rem 1.2rem',
            cursor: 'pointer'
          }}
        >
          Show All Users
        </button>
        <button
          onClick={handleShowPrompts}
          style={{
            background: '#388e3c',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '0.5rem 1.2rem',
            cursor: 'pointer'
          }}
        >
          Show All Prompts
        </button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {view === "users" && users && (
        <div>
          <h3>All Users</h3>
          <ul>
            {users.map((user: any) => (
              <li key={user.id}>
                <strong>ID:</strong> {user.id} | <strong>Name:</strong> {user.name} | <strong>CustomId:</strong> {user.customId}
              </li>
            ))}
          </ul>
        </div>
      )}
      {view === "prompts" && prompts && (
        <div>
          <h3>All Prompts</h3>
          <ul>
            {prompts.map((prompt: any, idx: number) => (
              <li key={prompt.id || idx}>
                <strong>UserId:</strong> {prompt.userId} | <strong>CategoryId:</strong> {prompt.categoryId} | <strong>SubCategoryId:</strong> {prompt.subCategoryId} | <strong>Prompt:</strong> {prompt.promptText} | <strong>Response:</strong> {prompt.response} | <small>{prompt.createdAt}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
