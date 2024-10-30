// server/api.js
require('dotenv').config(); // بارگذاری متغیرهای محیطی

const express = require('express');
const cors = require('cors'); 
const userModel = require('./models/userModel');


const app = express();
app.use(cors({
    origin: 'http://localhost:3000' // فقط اجازه دسترسی به این منبع را بدهید
  }));
  
// app.use(cors()); // فعال‌سازی CORS
app.use(express.json()); // برای پردازش JSON

app.set('view engine' , 'vash'); 

// عملیات insert
app.post('/api/insert', (req, res) => {
  const userData = req.body;
  
  userModel.insertUser(userData, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'User added successfully', results });
  });
});

// Endpoint برای انتخاب کاربران
app.get('/users', (req, res) => {
  userModel.getUsers((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.render('index' , {users : results});
  });
});

// راه‌اندازی سرور
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
