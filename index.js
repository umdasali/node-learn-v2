import express from "express";

// Creating an instance of Express app
const app = express();

// Middleware to handle CORS
app.use((req, res, next) => {
  // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Allow specified HTTP methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // Allow specified headers
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  // Set the Access-Control-Expose-Headers header if needed
  res.setHeader('Access-Control-Expose-Headers', 'Custom-Header');

  // Set the Access-Control-Allow-Credentials header if needed
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Set the Access-Control-Max-Age header if needed
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    // Return a 200 response for preflight requests
    return res.sendStatus(200);
  }

  // Pass control to the next middleware
  next();
});

// Your API endpoints
app.get('/api/data', (req, res) => {
  // Your code to handle the GET request
  res.json({ message: 'Hello, World!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Handle CORS-related errors
  if (err.name === 'TypeError' && err.message.includes('Access to')) {
    res.status(403).json({ error: 'CORS Error' });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Starting the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
