import React, { useEffect, useState } from 'react';
import { fetchItems } from '../api';
import { useAuth } from '../auth';

export default function InventoryPage() {
  const { auth } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    if (!auth.token) return;
    fetchItems(auth.token).then(setItems);
  }, [auth.token]);
  return (
    <div>
      <h2>Inventory</h2>
      <ul>
        {items.map(it => <li key={it.id}>{it.name} - {it.quantity}</li>)}
      </ul>
    </div>
  );
}
