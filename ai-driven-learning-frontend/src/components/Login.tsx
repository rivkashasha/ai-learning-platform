import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Register.css';
import api from "../api/api";

const SignIn = () => {
    const [id, setId] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const adminId = String(import.meta.env.VITE_ADMIN_ID).trim();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedId = id.trim();
        if (!trimmedId) {
            setError("ID is required.");
            return;
        }
        setError("");
        try {
            await api.getUserById(trimmedId);
            if (trimmedId === adminId) {
                navigate("/admin", { state: { userId: trimmedId } });
            } else {
                navigate("/dashboard", { state: { userId: trimmedId } });
            }
        } catch (err: any) {
            setError(err.message || 'User not found or login failed.');
        }
    };

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

