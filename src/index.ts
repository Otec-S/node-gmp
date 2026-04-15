import 'reflect-metadata';
import 'dotenv/config';
import { pool } from './db.js';

async function main() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      'SELECT current_database() AS db, current_user AS user, version() AS version',
    );
    const row = rows[0];
    console.log('Connected to PostgreSQL');
    console.log(`  database: ${row.db}`);
    console.log(`  user: ${row.user}`);
    console.log(`  server:   ${row.version.split('\n')[0]}`);
  } finally {
    client.release();
  }
}

main()
  .catch((err) => {
    const detail =
      err?.message ||
      [err?.code && `code: ${err.code}`, err?.address && `${err.address}:${err.port}`]
        .filter(Boolean)
        .join(' ') ||
      String(err);
    console.error('Database error:', detail);
    if (err?.code === 'ECONNREFUSED') {
      console.error('Hint: start Postgres first: podman-compose up -d');
    }
    process.exitCode = 1;
  })
  .finally(() => pool.end());
