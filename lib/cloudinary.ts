import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Get the first image from a Cloudinary folder
 * @param folderName - The name of the folder in Cloudinary (e.g., "demo1")
 * @returns The optimized image URL or null if not found
 */
export async function getImageFromFolder(
  folderName: string
): Promise<string | null> {
  try {
    // Search for images in the specified folder
    const result = await cloudinary.search
      .expression(`folder:${folderName}`)
      .sort_by("created_at", "desc")
      .max_results(1)
      .execute();

    if (result.resources && result.resources.length > 0) {
      const publicId = result.resources[0].public_id;
      
      // Generate optimized URL with transformations
      return cloudinary.url(publicId, {
        fetch_format: "auto",
        quality: "auto",
        width: 1400,
        crop: "fill",
      });
    }

    return null;
  } catch (error) {
    console.error(`Error fetching image from folder ${folderName}:`, error);
    return null;
  }
}

/**
 * Get all images from a Cloudinary folder
 * @param folderName - The name of the folder in Cloudinary
 * @param maxResults - Maximum number of images to return
 * @returns Array of optimized image URLs
 */
export async function getImagesFromFolder(
  folderName: string,
  maxResults: number = 10
): Promise<string[]> {
  try {
    const result = await cloudinary.search
      .expression(`folder:${folderName}`)
      .sort_by("created_at", "desc")
      .max_results(maxResults)
      .execute();

    if (result.resources && result.resources.length > 0) {
      return result.resources.map((resource: any) =>
        cloudinary.url(resource.public_id, {
          fetch_format: "auto",
          quality: "auto",
          width: 1400,
          crop: "fill",
        })
      );
    }

    return [];
  } catch (error) {
    console.error(`Error fetching images from folder ${folderName}:`, error);
    return [];
  }
}

/**
 * Get a default placeholder image URL
 * @returns Cloudinary placeholder URL
 */
export function getDefaultImage(): string {
  // You can customize this to point to a specific default image in your Cloudinary
  return cloudinary.url("default/placeholder", {
    fetch_format: "auto",
    quality: "auto",
    width: 1400,
    crop: "fill",
  });
}
