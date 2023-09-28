import { create } from "ipfs-http-client";
import { ipfs } from "../config/ipfs";
const { projectId, projectSecret } = ipfs; // Use the configuration
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
  "base64"
)}`;

const ipfsClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});
export const handleFileUpload = async (file) => {
  try {
    const uploaded_file = await ipfsClient.add(file);
    return uploaded_file;
  } catch (error) {
    console.log(error);
    // throw new Error("Failed to upload image to IPFS");
  }
};
export const isVideoOrIsAudio = (file) => {
  return (
    file.media_type == "audio/mpeg" ||
    file.media_type == "audio/mp4" ||
    file.media_type == "audio/mp3" ||
    file.media_type == "video/mp4"
  );
};
