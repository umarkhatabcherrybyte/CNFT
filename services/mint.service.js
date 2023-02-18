import http from "../config/apiInstance";

class MintService {
  mintTransactionSingle(file, path, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file, file.name);
    return http.post("api/collection/single", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        path: path,
      },
      onUploadProgress,
    });
  }
  // mintTransactionSingle(file, path, onUploadProgress) {
  // 	let formData = new FormData();
  // 	formData.append("file", file, file.name);
  // 	return http.post("api/collection/upload", formData, {
  // 		headers: {
  // 			"Content-Type": "multipart/form-data",
  // 			path: path,
  // 		},
  // 		onUploadProgress,
  // 	});
  // }

  saveMint(
    user_id,
    metadata,
    type,
    total_supply,
    recipient_address,
    policy_id
  ) {
    return http.post("api/collection/single", {
      user_id,
      metadata,
      type,
      total_supply,
      recipient_address,
      policy_id,
    });
  }

  mintTransactionCollection(metadataFiles, utxos, address) {
    return http.post("api/mint/collection", {
      metadata_frontend: metadataFiles,
      recipient_address: address,
      utxos: utxos,
    });
  }

  downloadMetadataFile(json_data) {
    return http.post("api/mint/download", {
      json_data: json_data,
    });
  }
}
export default new MintService();
