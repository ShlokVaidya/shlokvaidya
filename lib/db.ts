import { Pool } from "pg";

export const db = new Pool({
  connectionString: process.env.POSTGRES_URL,
  // Lazy connect - don't establish connection immediately
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Handle connection errors gracefully in development
db.on("error", (err) => {
  console.warn("Unexpected error on idle client", err);
  // Don't crash the process on connection errors
});

export default db;