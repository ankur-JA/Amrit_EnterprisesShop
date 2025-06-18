export async function login(email: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function fetchItems(token: string) {
  const res = await fetch('/api/items', { headers: { Authorization: `Bearer ${token}` } });
  return res.json();
}
