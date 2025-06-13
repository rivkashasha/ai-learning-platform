import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import NewPrompt from "./NewPrompt";
import History from "./History";
import {
    clearError,
    clearLesson,
    clearHistory
} from "../redux/promptSlice";
import { clearError as clearDashboardError } from "../redux/dashboardSlice";

interface DashboardProps {
  userId: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userId, onLogout }) => {
  const dispatch: AppDispatch = useDispatch();
  const [showPromptForm, setShowPromptForm] = useState(true);

  const handleNewPrompt = () => {
    setShowPromptForm(true);
    dispatch(clearError());
    dispatch(clearDashboardError());
    dispatch(clearLesson());
    dispatch(clearHistory());
  };

  return (
    <div style={{
      maxWidth: 600,
      margin: '2rem auto',
      padding: '2rem',
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 2px 16px #e3e8ee'
    }}>
      <h2>Mini Learning Platform</h2>
      <button
        onClick={onLogout}
        style={{
          marginBottom: 16,
          background: '#d32f2f',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '0.5rem 1.2rem',
          cursor: 'pointer'
        }}
      >
        Log Out
      </button>
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={handleNewPrompt}
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
          New Prompt
        </button>
        <button
          onClick={() => setShowPromptForm(false)}
          style={{
            background: '#388e3c',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '0.5rem 1.2rem',
            cursor: 'pointer'
          }}
        >
          History
        </button>
      </div>
      {showPromptForm ? (
        <NewPrompt userId={userId} />
      ) : (
        <History userId={userId} />
      )}
    </div>
  );
};

export default Dashboard;
