import { sql } from "@vercel/postgres";

let tableInitialized = false;

async function ensureTableExists() {
  if (tableInitialized) return;
  
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS blog_views (
        slug TEXT PRIMARY KEY,
        views INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    tableInitialized = true;
  } catch (error) {
    console.debug("Table creation skipped:", error instanceof Error ? error.message : error);
  }
}

export async function incrementView(slug: string) {
  try {
    await ensureTableExists();
    await sql`
      INSERT INTO blog_views (slug, views)
      VALUES (${slug}, 1)
      ON CONFLICT (slug)
      DO UPDATE SET views = blog_views.views + 1, updated_at = CURRENT_TIMESTAMP
    `;
  } catch (error) {
    // Silently fail if database is not configured
    console.debug("View tracking unavailable:", error instanceof Error ? error.message : error);
  }
}

export async function getViews(slug: string) {
  try {
    await ensureTableExists();
    const result = await sql`
      SELECT views FROM blog_views WHERE slug = ${slug}
    `;
    return result.rows[0]?.views ?? 0;
  } catch (error) {
    // Return 0 if database is not configured
    console.debug("View tracking unavailable:", error instanceof Error ? error.message : error);
    return 0;
  }
}
