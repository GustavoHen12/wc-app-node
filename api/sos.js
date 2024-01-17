const moment = require('moment')

module.exports = app => {
    const get = (req, res) => {
        app.db('sos')
            .select()
            .list()
            .then(pedidos => res.json(pedidos))
            .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        console.log(req.body);

        if (!req.body.nome || !req.body.nome.trim()) {
            return res.status(400).send('Nome é um campo obrigatório')
        }

        if (!req.body.telefone || !req.body.telefone.trim()) {
            return res.status(400).send('Telefone é um campo obrigatório')
        }

        if (!req.body.dataHora || !req.body.dataHora.trim()) {
            req.body.dataHora = moment().format('YYYY-MM-DD HH:mm:ss')
        }

        app.db('sos')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    return { get, save }
}