// const config = require('../knexfile.js');
// const knex = require('knex')(config);

// knex.migrate.latest([config]);
// module.exports = knex;

const fs = require('fs');
module.exports = {
    db: (databaseName) => {
        const database = {};
        database.insert = (data) => {
            const filename = `${databaseName}.json`;
            fs.access(filename, (err) => {
                if (err) {
                    fs.writeFileSync(filename, '[]');
                }
                const file = fs.readFileSync(filename);
                const json = JSON.parse(file);
                json.push(data);
                fs.writeFileSync(filename, JSON.stringify(json));            
            });
            
            return Promise.resolve();
        };
        return database;
    },
};