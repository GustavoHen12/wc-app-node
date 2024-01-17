const moment = require('moment')

module.exports = app => {
    const get = (req, res) => {
        app.db('pedidos')
            .select()
            .list()
            .then(eventos => res.json(eventos))
            .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        console.log(req.body);

        if (!req.body.nome || !req.body.nome.trim()) {
            return res.status(400).send('Nome é um campo obrigatório')
        }

        if (!req.body.dataHora || !req.body.dataHora.trim()) {
            req.body.dataHora = moment().format('YYYY-MM-DD HH:mm:ss')
        }

        app.db('pedidos')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    return { get, save }
}