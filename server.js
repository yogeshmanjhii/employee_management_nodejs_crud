const express = require('express');
const employeeController = require('./controllers/employeeController');
const errorHandler = require('./middleware/errorHandler');
const handleNotFound = require('./middleware/handleNotFound');

const app = express();
app.use(express.json());

// Routes
app.use('/api/employees', employeeController);

// Error handling middleware
app.use(errorHandler);

// Middleware for handling non-existing endpoints
app.use(handleNotFound);

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});