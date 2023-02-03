import http from "../config/apiInstance";

class MintService {

	mintTransactionSingle(file, path, onUploadProgress) {
		let formData = new FormData();
		formData.append("file", file, file.name);
		return http.post("api/collection/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				path: path,
			},
			onUploadProgress,
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
