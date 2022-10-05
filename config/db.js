const { Model } = require('objection');
const Knex = require('knex');

const knex = Knex({
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      port : process.env.DB_PORT,
      user : process.env.DB_USERNAME,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    },
    pool:{min:0, max:10}
});

Model.knex(knex)

module.exports = knex;