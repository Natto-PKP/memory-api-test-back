import { Pool } from 'pg';

const database = new Pool({
  connectionString: process.env.PG_LOCAL_URL,
  ssl: { rejectUnauthorized: false },
});

export default database;
