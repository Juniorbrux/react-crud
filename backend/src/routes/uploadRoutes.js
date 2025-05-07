// routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Controller = require('../controllers/uploadControllers');

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post('/upload', upload.single('image'), Controller.uploadImage);

// email staffs


module.exports = router;
