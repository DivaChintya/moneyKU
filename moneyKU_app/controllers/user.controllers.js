// user.controllers
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');//menghasilkan token setelah login

// REGISTRASI
async function registerUser(req, res) {
  const { name, email } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Email has already been used.');
    }
    const user = await prisma.user.create({ data: { name, email } });
    console.log('User registered successfully:', user);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Failed to register user', message: error.message });
  }
}

// LOGIN USER
async function loginUser(req, res) {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { name, email } });
    if (!user) {
      throw new Error('Invalid email.....'); //respon ERROR apabilas email untuk login tidak sesuai
    }

    const secret = process.env.JWT_SECRET;
    const expiresIn = 60 * 60 * 1;
    const token = jwt.sign({ userId: user.id, name: user.name, email: user.email }, secret, { expiresIn: expiresIn }); 
    console.log('User logged in successfully:', user);
    res.status(200).json({ message: 'User logged in successfully :))', user, token});
  } catch (error) {
    console.error('Error logging in user:', error.message);
    res.status(500).json({ error: 'Failed to login user ;((( ;(((', message: error.message });
  }
}

module.exports = { registerUser, loginUser };





