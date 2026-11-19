import { v2 as cloudinary } from "cloudinary";
import { MAX_UPLOAD_BYTES } from "@/utils/constants";
import { httpError } from "@/utils/http";

function configure() {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud_name || !api_key || !api_secret) {
    throw httpError("Cloudinary is not configured. Add the cloud name, API key, and API secret.", 503);
  }
  cloudinary.config({ cloud_name, api_key, api_secret });
}

export class MediaService {
  static async upload(file: File, fileType: string) {
    if (!file || file.size === 0) {
      throw httpError("Upload a file before publishing.");
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      throw httpError("File size exceeds the 10 MB limit. Please choose a smaller file.");
    }
    if (fileType === "image" && file.type.startsWith("video/")) {
      throw httpError("Wrong file selected. Choose an image, or switch the file type to video.");
    }
    if (fileType === "video" && file.type.startsWith("image/")) {
      throw httpError("Wrong file selected. Choose a video, or switch the file type to image.");
    }

    configure();
    const bytes = Buffer.from(await file.arrayBuffer());
    const resourceType = fileType === "video" ? "video" : "image";

    const url = await new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "glaj-news", resource_type: resourceType },
        (error, result) => {
          if (error || !result) {
            reject(httpError(error?.message || "Cloudinary upload failed.", 502));
            return;
          }
          resolve(result.secure_url);
        },
      );
      stream.end(bytes);
    });

    return url;
  }
}
