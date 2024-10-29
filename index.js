// server/api.js
const express = require('express');
const cors = require('cors'); 
const mysql = require('mysql2');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000' // فقط اجازه دسترسی به این منبع را بدهید
  }));
  
// app.use(cors()); // فعال‌سازی CORS
app.use(express.json()); // برای پردازش JSON

// تنظیمات اتصال به پایگاه داده
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_app'
});

// بررسی اتصال به پایگاه داده
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// عملیات insert
app.post('/api/insert', (req, res) => {
  const { name, age } = req.body; // فرض کنید که ما دو فیلد داریم

  const query = 'INSERT INTO users (name, age) VALUES (?, ?)';
  db.query(query, [name, age], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Data inserted successfully', id: results.insertId });
  });
});

// راه‌اندازی سرور
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
