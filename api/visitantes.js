const moment = require('moment')

module.exports = app => {
    const getVisitantes = (req, res) => {
        const date = req.query.data;
        const query = app.db('visitantes')

        if(date) {
            query.where('dataHora', '<=', date + ' 23:59:59')
                .where('dataHora', '>=', date + ' 00:00:00')
                .orderBy('dataHora', 'desc');
            console.log(query.toString())
        }

        query.then(visitantes => res.json(visitantes))
            .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        if (!req.body.nome || !req.body.nome.trim()) {
            return res.status(400).send('Nome é um campo obrigatório')
        }

        if (!req.body.telefone || !req.body.telefone.trim()) {
            return res.status(400).send('Telefone é um campo obrigatório')
        }

        if (!req.body.telefone.match(/^\d{10,11}$/)) {
            return res.status(400).send('Telefone inválido')
        }
        app.db('visitantes')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    return { getVisitantes, save }
}