const pg = require("pg");
const settings = require("./settings"); // settings.json
const arg = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function runQuery(query, values, cb) {
    client.query(query, values, (err, result) => {
        if (err) {
            return console.error("error running query", err);
        }
        cb(result);
    });
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  const query = "SELECT first_name, last_name, TO_CHAR(birthdate, 'yyyy-mm-dd') AS birthdate FROM famous_people WHERE first_name = $1::text";

  runQuery(query, [arg], logFamousPeople);
});

function logFamousPeople(result) {
    console.log("Searching ...");
    console.log(`Found ${result.rowCount} person(s) by the name '${arg}':`)
    result.rows.forEach((person, index) => {
        console.log(`- ${index + 1}: ${person.first_name} ${person.last_name}, born ${person.birthdate}`); 
    });
}