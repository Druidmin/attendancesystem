const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// File path for storing user data
const usersFilePath = path.join(__dirname, 'users.json');

// Initialize users file if it doesn't exist
if (!fs.existsSync(usersFilePath)) {
  fs.writeFileSync(usersFilePath, JSON.stringify({ users: [] }));
}

// Helper function to read users
const readUsers = () => {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

// Helper function to write users
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Registration endpoint
app.post('/register', (req, res) => {
  try {
    const { firstName, lastName, username, password, role, courses } = req.body;
    
    // Read existing users
    const usersData = readUsers();
    
    // Check if username already exists
    if (usersData.users.some(user => user.username === username)) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      username,
      password, // In a real app, you should hash the password
      role,
      courses
    };
    
    // Add new user
    usersData.users.push(newUser);
    writeUsers(usersData);
    
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'An error occurred during registration' });
  }
});

// Login endpoint
app.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Read users
    const usersData = readUsers();
    
    // Find user
    const user = usersData.users.find(
      u => u.username === username && u.password === password
    );
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // Return user data (excluding password)
    const { password: _, ...userData } = user;
    res.json(userData);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 