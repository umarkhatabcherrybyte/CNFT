import { INSTANCE } from "../config/axiosInstance";
class UploadFilesService {
  upload(file, path, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file, file.name);
    return INSTANCE.post("api/collection/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        path: path,
      },
      onUploadProgress,
    });
  }
  remove(file, path) {
    const formData = new FormData();

    return INSTANCE.post("/api/uploadMultiFiles/upload/remove", formData, {
      headers: {
        file: file,
        path: path,
      },
    });
  }
  uploadMeta(file, path, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);
    return INSTANCE.post("/collection/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        path: path,
      },
      onUploadProgress,
    });
  }
  downloadMetafile(path) {
    let formData = new FormData();
    return INSTANCE.post(
      "/api/uploadMultiFiles/upload/downloadMetafile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          path: path,
        },
      }
    );
  }
  uploadWebExcelMeta(convertedJson, path) {
    return INSTANCE.post(
      "/api/uploadMultiFiles/upload/webExcelMeta",
      convertedJson,
      {
        headers: {
          path: path,
        },
      }
    );
  }
  getFiles(path) {
    let formData = new FormData();
    return INSTANCE.post("/api/uploadMultiFiles/files", formData, {
      headers: {
        path: path,
      },
    });
  }
}
export default new UploadFilesService();
