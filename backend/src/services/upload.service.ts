import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary";

export const uploadProductImage = async (
  buffer: Buffer,
  oldPublicId?: string,
): Promise<UploadApiResponse> => {
  if (oldPublicId) {
    await cloudinary.uploader.destroy(oldPublicId);
  }

  return new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "cafe_pos/products" },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined,
      ) => {
        if (error) reject(error);
        if (!result) return reject(new Error("Upload failed"));
        else resolve(result);
      },
    );
    stream.end(buffer);
  });
};
