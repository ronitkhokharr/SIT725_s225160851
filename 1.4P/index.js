const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Home page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Simple test route
app.get('/hello', (req, res) => {
    res.send('Hello! My server is running successfully.');
});

// Add two numbers using query parameters
// Example: http://localhost:3000/add?num1=5&num2=7
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({
            error: 'Please provide valid numbers for num1 and num2.'
        });
    }

    const result = num1 + num2;

    res.json({
        operation: 'addition',
        num1: num1,
        num2: num2,
        result: result
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});