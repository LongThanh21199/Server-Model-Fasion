module.exports = {
   "type": "postgres",
   "host": process.env.DATABASE_HOST,
   "port": process.env.DATABASE_PORT,
   "username": process.env.POSTGRES_USER,
   "password": process.env.POSTGRES_PASSWORD,
   "database": process.env.POSTGRES_DB,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}