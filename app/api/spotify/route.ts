import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken() {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  
  try {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=refresh_token&refresh_token=" + REFRESH_TOKEN,
    });

    const data = await res.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching Spotify token:", error);
    return null;
  }
}

export async function GET() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return NextResponse.json(
      { error: "Spotify credentials not configured" },
      { status: 500 }
    );
  }

  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return NextResponse.json(
        { error: "Failed to get Spotify access token" },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 10 },
    });

    if (res.status === 204 || res.status === 401) {
      return NextResponse.json({
        name: "Nothing playing",
        artist: "Open Spotify",
        album: "—",
        image: "https://via.placeholder.com/64?text=Spotify",
        url: "https://open.spotify.com",
        isPlaying: false,
        progress: 0,
        duration: 0,
      });
    }

    const track = await res.json();

    if (!track.item) {
      return NextResponse.json({
        name: "Nothing playing",
        artist: "Open Spotify",
        album: "—",
        image: "https://via.placeholder.com/64?text=Spotify",
        url: "https://open.spotify.com",
        isPlaying: false,
        progress: 0,
        duration: 0,
      });
    }

    return NextResponse.json({
      name: track.item.name,
      artist: track.item.artists.map((a: any) => a.name).join(", "),
      album: track.item.album.name,
      image: track.item.album.images[0]?.url || "https://via.placeholder.com/64",
      url: track.item.external_urls.spotify,
      isPlaying: track.is_playing,
      progress: track.progress_ms,
      duration: track.item.duration_ms,
    });
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    return NextResponse.json(
      { error: "Failed to fetch Spotify data" },
      { status: 500 }
    );
  }
}