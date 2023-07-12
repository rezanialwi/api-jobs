const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

// Create a MySQL connection pool
const pool = mysql.createPool({
    host:        'localhost',
    user:        'root',
    password:    '',
    database:    'db_portal_job'
});

// JWT secret key
const jwtSecret = 'test';

// Login API
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are valid
  pool.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });

      res.json({ token });
    }
  );
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Missing authorization token' });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

// Get job list API
app.get('/jobs', authenticateToken, async (req, res) => {
  const { description, location, full_time, page } = req.query;
  const apiUrl = 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json';

  try {
    const response = await axios.get(apiUrl, {
      params: { description, location, full_time, page },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching job list' });
  }
});

// Get job detail API
app.get('/jobs/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const apiUrl = `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`;

  try {
    const response = await axios.get(apiUrl);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching job detail' });
  }
});

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
