"use client";
import { useState } from "react";

export default function UploudPhoto() {
  const [file, setFile] = useState<File | null>(null);
  const FRESET_NAME = "food-image";
  const CLOUDINARY_NAME = "dkk5rxfer";

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Safe access of files array
    if (file) {
      setFile(file);
    }
  };
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", FRESET_NAME);
    formData.append("api_key", CLOUDINARY_NAME);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await res.json();
      console.log(data); // You can handle the response here
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload file");
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFile} />
      <button onClick={handleUpload} className="bg-green-600">
        Upload
      </button>
    </div>
  );
}
