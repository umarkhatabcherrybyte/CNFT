export const isVideoOrIsAudio = (file) => {
  console.log(file, "file");
  return (
    file.media_type == "audio/mpeg" ||
    file.media_type == "audio/mp4" ||
    file.media_type == "audio/mp3" ||
    file.media_type == "video/mp4"
  );
};
