const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Selamat Datang di Glowlist API 💄');
});

app.listen(PORT, () =>{
    console.log(`Server Glowlist jalan di http://localhost:${PORT}`);
});