const express = require('express');
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const path = require('path'); // Module for joining file paths and directories

const app = express();

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));


// Mock database (replace this with your actual database)
const users = [
  { username: 'Samarth', password: '2343151' },
  { username: 'Priyanshy', password: '2343149'},
  { username: 'Rahul', password: '2343150' },
  { username: 'Poornima', password: '2343148' }
  // Add more users as needed
];

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Route to handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the submitted credentials match any user in the mock database
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    // Redirect to the landing page after successful login
    res.redirect('/index.html'); 
  } else {
    // Invalid credentials
    res.status(401).send('Invalid username or password');
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
