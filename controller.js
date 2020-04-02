'use strict';

var response = require('./rest');
var connection = require('./koneksi');

exports.index = function (req, rest) {
    response.ok("Aplikasi rest api berjalan", rest)
};

//menampilkan semua data mahasiswa
exports.tampilsemuamhs = function (req, rest) {
    connection.query('SELECT * from mahasiswa', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, rest)
        }
    });
};

//menampilkan semua data mahasiswa sesuai id
exports.tampilsemuamhsid = function (req, rest) {
    let id = req.params.id;
    connection.query('SELECT * from mahasiswa WHERE id_mahasiswa = ?', [id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, rest)
            }
        });
};

//menambahkan data mahasiswa
exports.tambahmhs = function (req, rest) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES (?,?,?)',
        [nim, nama, jurusan],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menambahkan data", rest)
            }
        });
};

//mengubah data berdasarkan id
exports.ubahmhs = function (req, rest) {
    var id = req.body.id_mahasiswa;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?', [nim,nama,jurusan,id],
        function(error,rows,fields){
            if(error){
                console.log(error);
            }else{
                response.ok('berhasil mengupdate data',rest)
            }
        });
};

//menghapus berdasarkan id
exports.hapusmhs = function (req, rest) {
    var id = req.body.id_mahasiswa;

    connection.query('DELETE from mahasiswa WHERE id_mahasiswa=?', [id],
        function(error,rows,fields){
            if(error){
                console.log(error);
            }else{
                response.ok('berhasil menghapus data',rest)
            }
        });
};

//menampilkan matakuliah group
exports.tampilgroupmatkul = function(req,rest){
    connection.query('SELECT mahasiswa.id_mahasiswa, mahasiswa.nim,mahasiswa.nama,mahasiswa.jurusan,matakuliah.matakuliah,matakuliah.sks from krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa',
        function(error,rows,fields){
            if(error){
                console.log(error);
            }else{
                response.oknested(rows,rest);
            }
        }
    )
}