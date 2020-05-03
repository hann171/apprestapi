var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verifikasi = require('./verifikasi');

//daftar menu regis
router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);

//alamat halaman otorisasi
router.get('/api/v1/rahasia', verifikasi(2), auth.halamanrahasia);

module.exports = router;