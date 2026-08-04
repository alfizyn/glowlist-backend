const express = require('express');
const app = express();
const mysql = require('mysql2');
const PORT = 3001;
const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'glowlist_db'
});

db.connect(err => {
    if(err) {
        console.error('Gagal konek ke database:', err);
    }   else {
        console.log('Berhasil konek ke GlowList');
    }
});


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Selamat Datang di Glowlist API 💄');
});

 app.get('/produk',(req, res) =>{
    const sql = 'SELECT * FROM produk';
    db.query(sql, (err, results) => {
        if (err) returnres.status(500).json({ error: err });
        res.json(results);
    });
 });

 app.get('/kategori',(req, res) =>{
    const sql = 'SELECT * FROM kategori';
    db.query(sql, (err, results) => {
        if (err) returnres.status(500).json({ error: err });
        res.json(results);
    });
 });

app.listen(PORT, () =>{
    console.log(`Server Glowlist jalan di http://localhost:${PORT}`);
});

