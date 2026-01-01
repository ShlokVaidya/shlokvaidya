import { NextResponse } from "next/server";
import { getAllPostsWithImages } from "@/lib/mdx";
import { getViews } from "@/lib/views";
import { db } from "@/lib/db";
import { verifyAdmin } from "@/lib/admin-auth";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  // Verify admin session
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const admin = await verifyAdmin(token);
  
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get blog posts
    const posts = await getAllPostsWithImages();
    
    // Get views for each post
    const viewsData = await Promise.all(
      posts.map(async (post) => ({
        slug: post.slug,
        title: post.title,
        views: await getViews(post.slug),
      }))
    );

    // Calculate total views
    const totalViews = viewsData.reduce((sum, post) => sum + post.views, 0);

    // Sort posts by views
    const topPosts = [...viewsData]
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    // Calculate total reading time
    const totalReadingMinutes = posts.reduce((sum, post) => {
      const minutes = parseInt(post.readingTime.match(/\d+/)?.[0] || "0");
      return sum + minutes;
    }, 0);

    // Get database stats
    let dbStats = {
      totalSessions: 0,
      activeSessions: 0,
    };

    try {
      const sessionsResult = await db.query(
        "SELECT COUNT(*) as total FROM admin_sessions"
      );
      const activeSessionsResult = await db.query(
        "SELECT COUNT(*) as active FROM admin_sessions WHERE expires_at > NOW()"
      );
      
      dbStats = {
        totalSessions: parseInt(sessionsResult.rows[0]?.total || "0"),
        activeSessions: parseInt(activeSessionsResult.rows[0]?.active || "0"),
      };
    } catch (error) {
      console.debug("Database stats unavailable:", error);
    }

    // Get latest posts (last 5)
    const latestPosts = posts.slice(0, 5).map((post) => ({
      slug: post.slug,
      title: post.title,
      publishedAt: post.publishedAt,
    }));

    return NextResponse.json({
      blog: {
        totalPosts: posts.length,
        totalViews,
        totalReadingMinutes,
        topPosts,
        latestPosts,
        viewsData,
      },
      database: dbStats,
      system: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Stats fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
