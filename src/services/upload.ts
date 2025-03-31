import { EXPO_PUBLIC_CLOUDINARY_NAME } from "../config/env";

export const imageUpload = async (body: FormData) => {
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${EXPO_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const responseData = await response.json();

    if (responseData.secure_url) {
      return responseData.secure_url;
    } else {
      console.log("Upload failed", responseData);
    }
  } catch (error) {
    alert("Error uploading image");
  }
};
