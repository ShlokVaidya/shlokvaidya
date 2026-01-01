import { NextResponse } from "next/server";
import { getImageFromFolder, getImagesFromFolder } from "@/lib/cloudinary";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder");
  const all = searchParams.get("all") === "true";

  if (!folder) {
    return NextResponse.json(
      { error: "Folder parameter is required" },
      { status: 400 }
    );
  }

  try {
    if (all) {
      const images = await getImagesFromFolder(folder);
      return NextResponse.json({ 
        folder, 
        count: images.length,
        images 
      });
    } else {
      const image = await getImageFromFolder(folder);
      return NextResponse.json({ 
        folder, 
        image: image || "No image found" 
      });
    }
  } catch (error) {
    console.error("Cloudinary API error:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch images from Cloudinary",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
