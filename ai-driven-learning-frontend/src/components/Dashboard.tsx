import { useState } from "react";

const Dashboard = ({ userId, onLogout }: { userId: string; onLogout: () => void }) => {
    const [showHistory, setShowHistory] = useState(false);
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchHistory = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`http://localhost:5089/api/Prompt/user/${userId}`);
            if (!response.ok) {
                setError("Failed to fetch history.");
                setLoading(false);
                return;
            }
            const data = await response.json();
            setHistory(data);
        } catch (err) {
            setError("Network error.");
        }
        setLoading(false);
    };

    const handleShowHistory = () => {
        setShowHistory(true);
        fetchHistory();
    };

    return (
        <div style={{ maxWidth: 600, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #e3e8ee' }}>
            <h2>Dashboard</h2>
            <button onClick={onLogout} style={{ marginBottom: 16, background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', cursor: 'pointer' }}>Log Out</button>
            <button onClick={handleShowHistory} style={{ marginLeft: 12, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', cursor: 'pointer' }}>History</button>
            {showHistory && (
                <div style={{ marginTop: 24 }}>
                    <h3>Your Prompt History</h3>
                    {loading && <div>Loading...</div>}
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {history.length === 0 && !loading && !error && <div>No history found.</div>}
                    <ul style={{ padding: 0, listStyle: 'none' }}>
                        {history.map((item, idx) => (
                            <li key={item.id || idx} style={{ marginBottom: 16, padding: 12, background: '#f3f6fa', borderRadius: 8 }}>
                                <div><b>Prompt:</b> {item.promptText}</div>
                                <div><b>Response:</b> {item.response}</div>
                                <div style={{ fontSize: '0.95em', color: '#888' }}><b>Date:</b> {item.createdAt && new Date(item.createdAt).toLocaleString()}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
