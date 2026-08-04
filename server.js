const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Glowlist Backend API berjalan! 🎇');
});

app.listen(PORT, () =>{
    console.log(`Server Glowlist jalan di http://localhost:${PORT}`);
});