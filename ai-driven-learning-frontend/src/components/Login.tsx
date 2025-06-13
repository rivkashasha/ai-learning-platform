import { useState } from "react";
import '../css/Register.css';
import Dashboard from './Dashboard';

const SignIn = () => {
    const [id, setId] = useState("");
    const [error, setError] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedInId, setLoggedInId] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id.trim()) {
            setError("ID is required.");
            return;
        }
        setError("");
        try {
            const response = await fetch(`http://localhost:5089/api/User/${id}`);
            if (!response.ok) {
                const errorMsg = await response.text();
                setError(errorMsg || 'User not found or login failed.');
                return;
            }
            setLoggedInId(id);
            setLoggedIn(true);
            setId("");
        } catch (err) {
            setError('Network error.');
        }
    };
    if (loggedIn) {
        return <Dashboard userId={loggedInId} onLogout={() => { setLoggedIn(false); setLoggedInId(""); }} />;
    }
    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <div>Sign In</div>
                <input type="text" value={id} onChange={e => setId(e.target.value)} placeholder="type your id..." />
                <button type="submit">Sign In</button>
                {error && <div className="error">{error}</div>}
            </form>
            <div className="switch-link">
                Don't have an account? <a href="/signup">Register</a>
            </div>
        </div>
    );
};
export default SignIn;

