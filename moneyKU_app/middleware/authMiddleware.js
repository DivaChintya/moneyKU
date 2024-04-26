//authMiddleware
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken'); 

const prisma = new PrismaClient();

async function authenticateUser(req, res, next) {
  console.log('Request body:', req.body);
  
  // Extract the bearer token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer <token>
  
  // Check if token is provided
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Bearer token missing' });
  }

  try {
    // Verify and decode the token to get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Assuming you have a JWT secret stored in an environment variable
    const userId = decoded.userId;

    // Find user by ID
    const user = await prisma.user.findUnique({ where: { id: userId } });
    
    // Check if the user is found
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid user ID' });
    }

    req.user = { id: userId };
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to authenticate user' });
  }
}

module.exports = authenticateUser;
