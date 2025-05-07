const User = require('../models/adminModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    User.getUserByEmail(email, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        if(password==user.password) {
           
                         // Generate a JWT token
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '10h' });
            return res.status(200).json({ message: 'Login successful', token,user });

            }
           else {
                return res.status(401).json({ message: 'Invalid credentials' });
            }


        });

};
