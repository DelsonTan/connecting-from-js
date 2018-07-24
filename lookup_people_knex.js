const settings = require("./settings"); // settings.json
const moment = require("moment");


const arg = process.argv[2];



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

knex.select('first_name', 'last_name', 'birthdate')
    .from('famous_people')
    .where('first_name', 'like', arg)
    .asCallback(function (err, rows) {
        if (err) {
            return console.error(err);
        }
        console.log("Searching ...");
        console.log(`Found ${rows.length} person(s) by the name '${arg}':`);
        rows.forEach((person, index) => {
            console.log(`- ${index + 1}: ${person.first_name} ${person.last_name}, born ${moment(person.birthdate).format('YYYY-MM-DD')}`);
        });
        knex.destroy();
    });