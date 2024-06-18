const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set the static files directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the main page (login)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

// Route for the home page
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/home.html'));
});

// Handling form submission (basic example)
app.post('/login', (req, res) => {
    // Here you would handle form submission, authenticate the user, etc.
    // After authenticating, redirect to /home
    res.redirect('/home');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
