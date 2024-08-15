const express = require('express');
const router = express.Router();
const { submitForm } = require('../controllers/formController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/submit', upload.fields([{ name: 'documents', maxCount: 10 }]), (req, res, next) => {
    next();
}, submitForm);


module.exports = router;

