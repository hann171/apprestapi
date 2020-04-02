'use strict';

var response = require('./rest');
var connection = require('./koneksi');

exports.index = function(req,rest){
    response.ok("Aplikasi rest api berjalan",rest)
};

//menampilkan semua data mahasiswa
exports.tampilsemuamhs = function(req,rest){
    connection.query('SELECT * from mahasiswa', function(error,rows,fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows, rest)
        }
    });
};