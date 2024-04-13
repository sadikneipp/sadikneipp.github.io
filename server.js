const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // You can choose any port that's available

// Serve static files from the 'resources' directory
app.use(express.static('.'));

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});