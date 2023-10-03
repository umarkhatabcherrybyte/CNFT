export const isVideoOrIsAudio = (file) => {
  return (
    file.media_type == "audio/mpeg" ||
    file.media_type == "audio/mp4" ||
    file.media_type == "audio/mp3" ||
    file.media_type == "video/mp4"
  );
};
