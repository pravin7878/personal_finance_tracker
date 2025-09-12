import React, { useState, useContext } from 'react';
import { registerUser } from '../utills/api';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../App';

export default function Register() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerUser(form); 
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify({ _id: res._id, name: res.name, email: res.email }));
      setUser({ _id: res._id, name: res.name, email: res.email });
      navigate('/dashboard');
    } catch (err) {
      console.log(err)
      alert(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={submit} className="bg-white p-6 rounded-2xl shadow space-y-4">
        <input
          name="name"
          placeholder="Name"
          required
          value={form.name}
          onChange={handle}
          className="w-full border p-3 rounded-lg"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handle}
          className="w-full border p-3 rounded-lg"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handle}
          className="w-full border p-3 rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          {loading ? 'Creating...' : 'Register'}
        </button>
      </form>
      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}
