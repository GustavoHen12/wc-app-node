const fs = require('fs');

module.exports = (databaseName) => {
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

    database.select = () => {
        let where = {};
        const operations = {};

        operations.where = (field, operator, value) => {
            where = {
                field,
                operator,
                value
            };
            return operations;
        };

        operations.list = () => {
            const filename = `${databaseName}.json`;
            const file = fs.readFileSync(filename);
            const json = JSON.parse(file);
            const result = json.filter((item) => {
                if (where.operator === '=') {
                    return item[where.field] === where.value;
                }
                return true;
            });
            return Promise.resolve(result);
        };

        return operations;
    };

    return database;
};