module.exports = {
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations:{
      directory: './db/migrations/'
    },
    useNullAsDefault: true
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost/palettes',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
