import { kuberApiUrl } from "../config/koios";
import { transactionErrorHanlder } from "../utils/errorUtils";
export async function callKuberAndSubmit(provider, data) {
  let network = await provider.getNetworkId();
  console.log("Current Network :", network);
  let kuberUrlByNetwork = kuberApiUrl;

  return fetch(
    // eslint-disable-next-line max-len
    `${kuberUrlByNetwork}/api/v1/tx`,
    {
      mode: "cors",
      method: "POST",
      body: data,
      headers: new Headers({ "content-type": "application/json" }),
    }
  )
    .catch((e) => {
      console.error(`${kuberUrlByNetwork}/api/v1/tx`, e);
      // throw Error(`Kubær API call : ` + e.message);
      transactionErrorHanlder(e);
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((json) => {
          console.log(json);
          return signAndSubmit(provider, json.tx).catch((e) => {
            if (e.info && e.code) {
              throw Error(`Code : ${e.code} :: \n ${e.info}`);
            } else throw e;
          });
        });
      } else {
        return res.text().then((txt) => {
          let json;
          try {
            json = JSON.parse(txt);
          } catch (e) {
            return Promise.reject(
              Error(`KubærApi [Status ${res.status}] : ${txt}`)
            );
          }
          if (json) {
            return Promise.reject(
              Error(
                `KubærApi [Status ${res.status}] : ${
                  json.message ? json.message : txt
                }`
              )
            );
          } else {
            return Promise.reject(
              Error(`KubærApi [Status ${res.status}] : ${txt}`)
            );
          }
        });
      }
    });
}

export async function calculatePolicyHash(script) {
  return fetch(
    // eslint-disable-next-line max-len
    `${kuberApiUrl}/api/v1/scriptPolicy`,
    {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(script),
      headers: new Headers({ "content-type": "application/json" }),
    }
  )
    .catch((e) => {
      console.error(`${kuberApiUrl}/api/v1/tx`, e);
      throw Error(`Kubær API call : ` + e.message);
    })
    .then((res) => {
      if (res.status === 200) {
        return res.text();
      } else {
        return res.text().then((txt) => {
          let json;
          try {
            json = JSON.parse(txt);
          } catch (e) {
            return Promise.reject(
              Error(`KubærApi [Status ${res.status}] : ${txt}`)
            );
          }
          if (json) {
            return Promise.reject(
              Error(
                `KubærApi [Status ${res.status}] : ${
                  json.message ? json.message : txt
                }`
              )
            );
          } else {
            return Promise.reject(
              Error(`KubærApi [Status ${res.status}] : ${txt}`)
            );
          }
        });
      }
    });
}
