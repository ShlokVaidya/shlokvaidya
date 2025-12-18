// app/api/hackatime/route.ts
import { NextResponse } from "next/server";

const HACKATIME_BASE_URL = "https://hackatime.hackclub.com/api/v1";

export async function GET() {
  const username = process.env.HACKATIME_USERNAME;
  const apiKey = process.env.HACKATIME_API_KEY;

  if (!username || !apiKey) {
    return NextResponse.json({ 
        error: "HackaTime USERNAME or API_KEY not configured" 
    }, { status: 500 });
  }

  // Final path attempt: documented base path + documented username path + documented query authentication
  const FINAL_HACKATIME_URL = `${HACKATIME_BASE_URL}/users/${username}/stats?api_key=${apiKey}`;

  try {
    const response = await fetch(FINAL_HACKATIME_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
        console.error(`HackaTime API failed with status: ${response.status} for URL: ${FINAL_HACKATIME_URL}`);
        return NextResponse.json({ 
            error: `Failed to fetch HackaTime data. Status: ${response.status}.` 
        }, { status: 500 });
    }

    const data = await response.json();
    
    // WakaTime response structure typically wraps data in a 'data' object
    const stats = data.data || {};

    const processedData = {
      // These keys must match the client component interface
      total_time: stats.human_readable_total || "N/A", 
      daily_average: stats.human_readable_daily_average || "N/A", 
      languages: stats.languages ? stats.languages.slice(0, 5).map((lang: any) => ({
        name: lang.name,
        percent: lang.percent,
        text: lang.text,
      })) : [],
    };

    return NextResponse.json(processedData);
  } catch (error) {
    console.error("Error fetching HackaTime data:", error);
    return NextResponse.json({ 
        error: "Internal Server Error during HackaTime fetch (JSON or connection failure)." 
    }, { status: 500 });
  }
}