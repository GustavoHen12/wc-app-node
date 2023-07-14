const dotenv = require('dotenv')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.senha) {
            return res.status(400).send('Dados incompletos')
        }

        const user = await app.db('usuarios')
            .whereRaw("LOWER(email) = LOWER(?)", req.body.email)
            .first()

        if (user) {
            bcrypt.compare(req.body.senha, user.senha, (err, isMatch) => {
                if (err || !isMatch) {
                    return res.status(401).send('A senha informada é inválida!')
                }

                const payload = {
                    id: user.id,
                    nome: user.nome,
                    email: user.email
                }

                res.json({
                    name: user.nome,
                    email: user.email,
                    token: jwt.encode(payload, process.env.AUTH_SECRET),
                })
            })
        } else {
            res.status(400).send('Usuário não cadastrado!')
        }
    }

    return { signin }
}