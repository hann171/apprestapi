const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(roles){
    return function(req, rest, next){
        //cek authorization header
        var tokenWithBearer = req.header.authorization;
        if(tokenWithBearer){
            var token = tokenWithBearer.split(' ')[1];
            //verifikasi
            jwt.verify(token,config.secret, function(err,decoded){
                if(err){
                    return rest.status(401).send({auth:false, message:'token tidak terdaftar!'});
                }else{
                    if(roles==2){
                        req.auth = decoded;
                        next();
                    }else{
                        return rest.status(401).send({auth:false, message:'Gagal mengotorisasi role anda!'});
                    }
                }
            });
        }else{
            return rest.status(401).send({auth:false, message:'token tidak tersedia!'});
        }
    }
}

module.exports = verifikasi;