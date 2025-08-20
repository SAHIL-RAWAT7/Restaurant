import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AuthForm({ type, onSubmit, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">
        {type === 'login' ? 'Login' : 'Sign Up'}
      </h2>
      
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
          minLength="6"
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {type === 'login' ? 'Login' : 'Create Account'}
      </button>

      <p className="text-center">
        {type === 'login' ? (
          <>Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link></>
        ) : (
          <>Already have an account? <Link to="/login" className="text-blue-600">Login</Link></>
        )}
      </p>
    </form>
  );
}