const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const moment = require('moment');

module.exports = app => {
    const geraHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        });
    }

    const save = async (req, res) => {
        if (!req.body.nome || !req.body.email || !req.body.senha || !req.body.secret) {
            return res.status(400).send("Dados incompletos!");
        }

        if(!req.body.secret || req.body.secret !== process.env.SECRET) {
            return res.status(401).send("Acesso negado!");
        }
        await geraHash(req.body.senha, hash => {
            app.db('usuarios')
                .insert({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: hash,
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err)); 
            return hash;
        });
    }

    return { save };
}