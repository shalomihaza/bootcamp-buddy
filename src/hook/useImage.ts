import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  EXPO_PUBLIC_CLOUDINARY_NAME,
  EXPO_PUBLIC_CLOUDINARY_PRESET,
} from "../config/env";
import { imageUpload } from "../services/upload";

const useImage = () => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      setLoading(true);
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        await uploadToCloudinary(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadToCloudinary = async (image: string) => {
    if (!image) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: image,
      type: "image/jpeg",
      name: "upload.jpg",
    } as any);

    formData.append("upload_preset", EXPO_PUBLIC_CLOUDINARY_PRESET!);
    formData.append("cloud_name", EXPO_PUBLIC_CLOUDINARY_NAME!);
    const data = await imageUpload(formData).finally(() => {
      setLoading(false);
    });

    setImage(data);
  };

  return {
    image,
    loading,
    pickImage,
  };
};

export default useImage;
