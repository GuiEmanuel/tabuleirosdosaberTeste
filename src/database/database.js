import {Pool} from "pg"

const databaseUrl = process.env.DATABASE_URL;

const database = new Pool({
    connectionString: databaseUrl, 
    ssl: {
     rejectUnauthorized: false
  }
})

export default database;