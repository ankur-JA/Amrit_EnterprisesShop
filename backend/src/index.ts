import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient, Role } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

app.use(cors());
app.use(express.json());

function createToken(user: { id: number; role: Role }) {
  return jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
}

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = createToken(user);
  res.json({ token, role: user.role });
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({ data: { name, email, passwordHash, role } });
    const token = createToken(user);
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(400).json({ message: 'Registration failed' });
  }
});

app.get('/api/items', async (_, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

app.post('/api/items', async (req, res) => {
  const item = await prisma.item.create({ data: req.body });
  res.json(item);
});

app.post('/api/sales', async (req, res) => {
  const { items, userId, credit } = req.body;
  const sale = await prisma.sale.create({
    data: {
      userId,
      total: items.reduce((a: number, it: any) => a + it.price * it.quantity, 0),
      saleItems: {
        create: items.map((it: any) => ({ itemId: it.itemId, quantity: it.quantity, price: it.price }))
      },
      credit: credit ? { create: credit } : undefined
    },
    include: { saleItems: true, credit: true }
  });
  // decrement stock
  for (const it of items) {
    await prisma.item.update({ where: { id: it.itemId }, data: { quantity: { decrement: it.quantity } } });
  }
  res.json(sale);
});

app.get('/api/reports/monthly', async (_, res) => {
  const start = new Date();
  start.setDate(1);
  const sales = await prisma.sale.findMany({ where: { createdAt: { gte: start } }, include: { saleItems: true } });
  const revenue = sales.reduce((sum, s) => sum + s.total, 0);
  res.json({ revenue, count: sales.length });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
