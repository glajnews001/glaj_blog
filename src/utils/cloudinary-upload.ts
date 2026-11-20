import type { UploadSignature } from "@/services/media.service";

/**
 * Uploads a file straight from the browser to Cloudinary using a server-made
 * signature. Resolves with the secure URL of the stored file.
 */
export function uploadToCloudinary(
  file: File,
  signature: UploadSignature,
  onProgress: (percent: number) => void,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append("file", file);
    form.append("api_key", signature.apiKey);
    form.append("timestamp", String(signature.timestamp));
    form.append("signature", signature.signature);
    form.append("folder", signature.folder);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${signature.cloudName}/${signature.resourceType}/upload`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress((event.loaded / event.total) * 100);
    };
    xhr.onload = () => {
      try {
        const body = JSON.parse(xhr.responseText) as { secure_url?: string; error?: { message?: string } };
        if (xhr.status >= 200 && xhr.status < 300 && body.secure_url) resolve(body.secure_url);
        else reject(new Error(body.error?.message ?? "Upload failed."));
      } catch {
        reject(new Error("Upload failed."));
      }
    };
    xhr.onerror = () => reject(new Error("Network error while uploading the file."));
    xhr.send(form);
  });
}
