const connection = require("../db"); // وارد کردن کانکشن

// تابع برای درج کاربر
const insertUser = (userData, callback) => {
  const { name, age } = userData;
  const query = "INSERT INTO users (name, age) VALUES (?, ?)";

  connection.query(query, [name, age], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

// تابع برای انتخاب کاربران
const getUsers = (callback) => {
  const query = "SELECT * FROM users";

  connection.query(query, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

module.exports = {
  insertUser,
  getUsers,
};
