const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('SIT753 7.3HD Jenkins DevOps Pipeline Project is running successfully!');
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        message: 'Application is healthy'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;