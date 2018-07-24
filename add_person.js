const settings = require("./settings"); // settings.json

const arg = process.argv.slice(2);

console.log(arg);
var knex = require('knex')({
    client: 'pg',
    connection: {
        user: settings.user,
        password: settings.password,
        database: settings.database,
        host: settings.hostname,
        port: settings.port,
        ssl: settings.ssl
    }
});

const person = [{ first_name: arg[0], 
                  last_name: arg[1],
                  birthdate: arg[2] }]

knex('famous_people')
    .insert(person).asCallback(function (err, res) {
        if (err) {
            return console.error(err);
        }
        console.log("Attempted to insert:");
        console.log(person);
        knex.destroy();
    });