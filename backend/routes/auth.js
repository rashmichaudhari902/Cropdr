const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { stmts } = require('../database/db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'cropdr_secret';

function generateToken(user) {
  return jwt.sign(
    { userId: user.id, name: user.name, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, location = 'India', primaryCrops = '', preferredLanguage = 'English' } = req.body;
    if (!name?.trim()) return res.status(400).json({ error: 'Name is required.' });
    if (!email?.includes('@')) return res.status(400).json({ error: 'Valid email is required.' });
    if (!password || password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters.' });

    const existing = await stmts.getUserByEmail(email.toLowerCase().trim());
    if (existing) return res.status(409).json({ error: 'An account with this email already exists.' });

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await stmts.createUser({
      name: name.trim(), email: email.toLowerCase().trim(),
      passwordHash, location, primaryCrops, preferredLanguage,
    });

    const user = { id: result.lastID, name: name.trim(), email: email.toLowerCase().trim() };
    res.status(201).json({ token: generateToken(user), user: { ...user, location, primaryCrops, preferredLanguage } });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

    const user = await stmts.getUserByEmail(email.toLowerCase().trim());
    if (!user) return res.status(401).json({ error: 'No account found with this email.' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Incorrect password.' });

    res.json({
      token: generateToken(user),
      user: { id: user.id, name: user.name, email: user.email, location: user.location, primaryCrops: user.primary_crops, preferredLanguage: user.preferred_language },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

module.exports = router;
