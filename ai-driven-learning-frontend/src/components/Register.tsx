import { useState } from "react";
import '../css/Register.css';
import api from "../api/api";

const Register = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id.trim() || !name.trim() || !phone.trim()) {
            setError("All fields are required.");
            return;
        }
        setError("");
        try {
            await api.registerUser({ customId: id, name, phone });
            setId("");
            setName("");
            setPhone("");
            alert('Registration successful!');
        } catch (err: any) {
            setError(err.message || 'Registration failed.');
        }
    };
    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <div>Register</div>
                <input type="text" value={id} onChange={e => setId(e.target.value)} placeholder="type your id..." />
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="type your name..." />
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="type your phone..." />
                <button type="submit">Register</button>
                {error && <div style={{color: 'red', marginTop: '0.5rem'}}>{error}</div>}
            </form>
            <div>
                Already have an account? <a href="/Login">Sign In</a>
            </div>
        </div>
    );
};
export default Register;
