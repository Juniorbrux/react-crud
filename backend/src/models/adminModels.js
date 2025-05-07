const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    // Method to find a user by email
    getUserByEmail: (email, callback) => {
        
        const query = 'SELECT * FROM admin WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results[0]);
        });
    },

    // Method to add a new user with a hashed password
    addUser: (userData, callback) => {
        bcrypt.hash(userData.password, 10, (err, hash) => {
            if (err) return callback(err, null);
            userData.password = hash;
            const query = 'INSERT INTO admin SET ?';
            db.query(query, userData, (err, result) => {
                if (err) return callback(err, null);
                return callback(null, result);
            });
        });
    },
};

module.exports = User;
