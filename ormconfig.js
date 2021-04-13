const test = process.env.NODE_ENV?.match('test')

module.exports = {
  type: test ? 'sqlite' : 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: test ? './src/db/db.sqlite' : process.env.DB_NAME,
  entities: ['./src/app/models/**.ts'],
  migrations: ['./src/db/migrations/**.ts'],
  cli: {
    migrationsDir: './src/db/migrations'
  }
}
