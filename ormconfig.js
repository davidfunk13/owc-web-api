const entityPath = process.env.DEV === "dev" ? "src/entity/**/*.ts" : "build/entity/**/*.js"
const migrationsPath = process.env.DEV === "dev" ? "src/migrations/**/*.ts" : "build/migrations/**/*.js"
const subscribersPath = process.env.DEV === "dev" ? "src/subscriber/**/*.ts" : "build/subscriber/**/*.js"
const connection = process.env.NODE_ENV === "production" ? { url: process.env.JAWSDB_URL } : {
   host: "localhost",
   port: 3306,
   username: "root",
   password: "",
   database: "owc_db",
   logging: true,
};

console.log(process.env.DEV,{
   type: "mysql",
   ...connection,
   synchronize: true,
   entities: [
   entityPath
],
   migrations: [
   migrationsPath
],
   subscribers: [
   subscribersPath
],
   cli: {
   entitiesDir: "src/entity",
   migrationsDir: "src/migration",
   subscribersDir: "src/subscriber"
}
})

module.exports = {
   type: "mysql",
   ...connection,
   synchronize: true,
   entities: [
      entityPath
   ],
   migrations: [
      migrationsPath
   ],
   subscribers: [
      subscribersPath
   ],
   cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
   }
}
