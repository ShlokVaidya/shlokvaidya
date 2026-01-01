import { Pool } from "pg";

async function initializeDatabase() {
  const db = new Pool({
    connectionString: process.env.POSTGRES_URL,
  });

  try {
    console.log("Initializing database...");
    
    // Create blog_views table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS blog_views (
        slug TEXT PRIMARY KEY,
        views INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create admin_sessions table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS admin_sessions (
        id SERIAL PRIMARY KEY,
        token TEXT UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create index on token for faster lookups
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(token)
    `);

    // Create index on expires_at for cleanup queries
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires_at ON admin_sessions(expires_at)
    `);
    
    console.log("✓ Database initialized successfully");
    await db.end();
  } catch (error) {
    console.error("Failed to initialize database:", error);
    await db.end();
    process.exit(1);
  }
}

initializeDatabase();
