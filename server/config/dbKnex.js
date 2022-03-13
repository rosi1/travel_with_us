import knex from 'knex';

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port: '5000',
      user : 'postgres',
      password : 'rosi1989',
      database : 'travels'
    }
  });
  
export default db;