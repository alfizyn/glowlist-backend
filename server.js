const express = require('express');
const cors = require ('cors')
const app = express();
const mysql = require('mysql2');
const PORT = 3001;

app.use(cors())

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

 app.post('/produk', (req, res) => {
    const {judul, deskripsi, harga, id_kategori } = req.body;

    if (!judul || !harga){
        return res.status(400).json({ message: 'judul dan harga wajib diisi'});
    }
    if (!deskripsi) {
        return res.status(400).json({message: 'Deskripsi waji diisi'});
    }

    const sql = 'INSERT INTO produk (judul, deskripsi, harga, id_kategori, tgl_input VALUES (?, ?, ?, ?, NOW())'; 
    db.query(sql, [judul, deskripsi, harga, id_kategori], (err, results) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json({
            message: 'Produk berhasil dimasukkan',
            id_produ: results.insertId
        });
    });
 });

 app.put('/produk/:id_produk', (req, res) => {
    const { id_produk } = req.params;
    const { judul, deskripsi, harga, id_kategori } = req.body;

    

    const sql = 'UPDATE produk SET judul=?, deskripsi=?, harga=?, id_kategori=? WHERE id_produk=?';
    db.query(sql, [judul, deskripsi, harga, id_kategori, id_produk], (err, results)=> {
        if (err) {
             return res.status(500).json({ error: err.sqlMessage });
        

        }
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'Produk tidak ditemukan!' });
        }
             res.json({ message: 'Produk berhasil diupdate!' });
    });

 });

 app.delete('/produk/:id_produk', (req, res) => {
    const { id_produk } = req.params;
    const sql = 'DELETE FROM produk WHERE id_produk = ?';
    db.query(sql, [id_produk], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.sqlMessage });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produk tidak ditemukan!' });
        }
        res.json({ message: 'Produk berhasil dihapus!' });
    });
 });

app.listen(PORT, () =>{
    console.log(`Server Glowlist jalan di http://localhost:${PORT}`);
});

