import React, { useState } from 'react';
import { login } from '../api';
import { useAuth } from '../auth';

export default function LoginPage() {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
      <button onClick={async () => {
        try {
          const data = await login(email, password);
          setAuth({ token: data.token, role: data.role });
        } catch (e) { setError('invalid'); }
      }}>Login</button>
    </div>
  );
}
