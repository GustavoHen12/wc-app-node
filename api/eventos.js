const moment = require('moment')

module.exports = app => {
    const get = (req, res) => {
        app.db('eventos')
            .select()
            .list()
            .then(eventos => res.json(eventos))
            .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        console.log(req.body);

        if (!req.body.src || !req.body.src.trim()) {
            return res.status(400).send('Imagem é um campo obrigatório')
        }

        if (!req.body.dataExpira || !req.body.dataExpira.trim()) {
            return res.status(400).send('Defina uma data de fim')
        }

        app.db('eventos')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    return { get, save }
}