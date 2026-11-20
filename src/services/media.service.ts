import { v2 as cloudinary } from "cloudinary";
import { FILE_TYPE, UPLOAD_LIMITS } from "@/utils/constants";
import { HttpError } from "@/utils/http";

const FOLDER = "glaj-news";

export type UploadSignature = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
  resourceType: "image" | "video";
  maxBytes: number;
};

function credentials() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new HttpError(500, "Cloudinary is not configured on the server.");
  }
  return { cloudName, apiKey, apiSecret };
}

export const MediaService = {
  cloudName: () => process.env.CLOUDINARY_CLOUD_NAME,

  /**
   * Signs a direct browser -> Cloudinary upload. Files never pass through our
   * server, so large videos are not limited by serverless body-size limits.
   */
  sign(fileType: string): UploadSignature {
    if (fileType !== FILE_TYPE.IMAGE && fileType !== FILE_TYPE.VIDEO) {
      throw new HttpError(400, "File type must be image or video.");
    }
    const { cloudName, apiKey, apiSecret } = credentials();
    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request({ timestamp, folder: FOLDER }, apiSecret);
    return {
      cloudName,
      apiKey,
      timestamp,
      folder: FOLDER,
      signature,
      resourceType: fileType,
      maxBytes: fileType === FILE_TYPE.IMAGE ? UPLOAD_LIMITS.imageBytes : UPLOAD_LIMITS.videoBytes,
    };
  },
};
