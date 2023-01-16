import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost:4001/api`,
});

export async function post(route, body = {}) {
  return await instance
    .post(`${route}`, body)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function createTransaction(recipientAddress, utxos,image_hash,metadata_frontend) {
  return await post('/mint/single', { recipientAddress, utxos, image_hash,metadata_frontend });
}

export async function signTransaction(assetName, signedTx, originalMetadata) {
  return await post('/mint/sign', {
    assetName,
    signedTx,
    originalMetadata,
  });
}
