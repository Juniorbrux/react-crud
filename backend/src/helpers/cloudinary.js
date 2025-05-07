// helpers/cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'duykkyca0',
  api_key: '381495922752786',
  api_secret: '2dhuxQSty8Dl2MvytwljzmVhZXc'
});

module.exports = cloudinary;
