// From component 1

//         const transferLucid = await Lucid.new(
//                   new Blockfrost(blockfrostUrl, blockfrostApiKey),

//                   blockfrostNetworkName
//                 );
//                 transferLucid.selectWalletFromSeed(seedPhrase);

//                 const lucidBrowser = await Lucid.new(
//                   new Blockfrost(blockfrostUrl, blockfrostApiKey),
//                   blockfrostNetworkName
//                 );
//                 const api = await window.cardano[
//                   String(connectedWallet)
//                 ].enable();
//                 const price_value = Number(values.price * 1000000);
//                 lucidBrowser.selectWallet(api);
//                 const tx = await lucidBrowser
//                   .newTx()
//                   .payToAddress(await transferLucid.wallet.address(), {
//                     lovelace: BigInt(price_value),
//                   })
//                   .validTo(Date.now() + 100000)
//                   .complete();
//                 const signedTx = await tx.sign().complete();
//                 const txHash = await signedTx.submit();

// From component 2

// const transferLucid = await Lucid.new(
//                   new Blockfrost(blockfrostUrl, blockfrostApiKey),
//                   blockfrostNetworkName
//                 );

//                 transferLucid.selectWalletFromSeed(seedPhrase);
//                 const lucidBrowser = await Lucid.new(
//                   new Blockfrost(blockfrostUrl, blockfrostApiKey),
//                   blockfrostNetworkName
//                 );

//                 const api = await window.cardano[
//                   String(connectedWallet)
//                 ].enable();
//                 lucidBrowser.selectWallet(api);

//                 const { paymentCredential } =
//                   lucidBrowser.utils.getAddressDetails(
//                     await lucidBrowser.wallet.address()
//                   );
//                 const mintingPolicy = lucidBrowser.utils.nativeScriptFromJson({
//                   type: "all",
//                   scripts: [
//                     { type: "sig", keyHash: paymentCredential?.hash },
//                     {
//                       type: "before",
//                       slot: lucidBrowser.utils.unixTimeToSlot(
//                         Date.now() + 518400000
//                       ),
//                     },
//                   ],
//                 });

//                 const policyId =
//                   lucidBrowser.utils.mintingPolicyToId(mintingPolicy);
//                 let metadataX = {};
//                 let metadata = {
//                   name: values.name,
//                   image: `ipfs://${uploaded_image.path}`,
//                   mediaType: values.file.type,
//                 };
//                 if (values.description.length > 0) {
//                   metadata["description"] = values.description;
//                 }
//                 metadataX[metadata.name] = metadata;
//                 const unit = policyId + fromText(metadata.name);

//                 let obj = { [policyId]: metadataX };
//                 const tx = await lucidBrowser
//                   .newTx()
//                   .attachMetadata("721", obj)
//                   .mintAssets({ [unit]: 1n })
//                   .payToAddress(await transferLucid.wallet.address(), {
//                     [unit]: 1n,
//                   })
//                   .validTo(Date.now() + 100000)
//                   .attachMintingPolicy(mintingPolicy)
//                   .complete();
//                 const signedTx = await tx.sign().complete();
//                 const txHash = await signedTx.submit();

// From Component 3
// const transferLucid = await Lucid.new(
//             new Blockfrost(blockfrostUrl, blockfrostApiKey),

//             blockfrostNetworkName
//           );
//           transferLucid.selectWalletFromSeed(seedPhrase);
//           console.log(
//             transferLucid,
//             "provieder ",
//             transferLucid.wallet.address(),
//             "address"
//           );
//           const lucid = await Lucid.new(
//             new Blockfrost(blockfrostUrl, blockfrostApiKey),

//             blockfrostNetworkName
//           );

//           const api = await window.cardano[String(connectedWallet)].enable();
//           lucid.selectWallet(api);

//           const addr = await lucid.wallet.address();
//           const utxos = await lucid.utxosAt(addr);
//           const utxo = utxos[0]; // assign utxo having x amount
//           const tn = fromText("nft");
//           const image = fromText("nft");

//           let policyId = "";
//           const nftPolicy = {
//             type: "PlutusV2",
//             script: applyParamsToScript(cborHex, [
//               utxo.txHash,
//               BigInt(utxo.outputIndex),
//               tn,
//               image,
//             ]),
//           };

//           policyId = lucid.utils.mintingPolicyToId(nftPolicy);
//           let obj;
//           let assetObj = {};
//           let units = [];
//           let metadataX = {};
//           let prices = [];
//           let unit = "";

//           console.log(policyId, "policyId");
//           setLatestPolicy(policyId);

//           console.log(obj, "obj");
//           console.log({ units }, "uits");
//           console.log({ metadataX }, "metadataX");
//           console.log({ prices }, "prices");
//           let selectedNFTs = [];

//           for (let index = 0; index < metadataObjects.length; index++) {
//             /**
//              * artist,assetName,fingerprint ,image,isSelling,name,policyId,price,quantity:"1",unit

//              */
//             let element = metadataObjects[index];
//             console.log("metadata ", element);
//             if (banner_image && feature_image && logo_image) {
//               element.banner_image = banner_image;
//               element.feature_image = feature_image;
//               element.logo_image = logo_image;
//             }
//             element.price = parseInt(element.price) * 1000000;
//             // assetObj[String(policyId + fromText(element.name))] = 1n;
//             // obj = { [policyId]: metadataX };
//             let metadata = element;
//             metadataX[metadata.name] = metadata;
//             assetObj[policyId + fromText(metadata.name)] = 1n;
//             obj = { [policyId]: metadataX };
//             prices.push(element.price);
//             // lovelace.push(element.price * 10000000);
//             selectedNFTs.push(metadata.name);
//             // delete element["price"];
//           }

//           const txL = await lucid
//             .newTx()
//             .mintAssets(assetObj, Data.void())
//             .attachMintingPolicy(nftPolicy)
//             .attachMetadata("721", obj)
//             // .payToAddress(addr, assetObj)
//             .payToAddress(addr, assetObj)
//             .collectFrom([utxo])
//             .complete();
//           const signedTxL = await txL.sign().complete();
//           const txHashL = await signedTxL.submit();

// From component 4  ( sinple minting )

//   const lucid = await Lucid.new(
//     new Blockfrost(blockfrostUrl, blockfrostApiKey),
//     blockfrostNetworkName
//   );
//   const api = await window.cardano[String(connectedWallet)].enable();
//   lucid.selectWallet(api);
//   const addr = await lucid.wallet.address();
//   const utxos = await lucid.utxosAt(addr);
//   const utxo = utxos[0];
//   const tn = fromText("nft");
//   const image = fromText("nft");
//   let policyId = "";
//   const nftPolicy = {
//     type: "PlutusV2",
//     script: applyParamsToScript(cborHex, [
//       utxo.txHash,
//       BigInt(utxo.outputIndex),
//       tn,
//       image,
//     ]),
//   };
//   policyId = lucid.utils.mintingPolicyToId(nftPolicy);
//   console.log(policyId, "policyId");
//   let metadataX = {};
//   let metadata = JSON.parse(window.localStorage.getItem("metadata"));
//   // let metadata = {
//   //   image: `ipfs://Qmc26if7L5k1Qy5bzGdNtuPBoTDJw3bDQbFuVqbuZ8ofqG`,
//   //   mediaType: "image/jpg",
//   //   description: "f",
//   //   name: "dfsdf",
//   //   description: "vsfsf",
//   //   creator: "fvfg",
//   //   link: "",
//   // };
//   metadataX[metadata.name] = metadata;
//   const unit = policyId + fromText(metadata.name);
//   let obj = { [policyId]: metadataX };
//   console.log(obj, "obj");
//   let tx;
//   if (selectedValue == "b") {
//     tx = await lucid
//       .newTx()
//       .mintAssets({ [unit]: 1n }, Data.void())
//       .attachMetadata("721", obj)
//       .attachMintingPolicy(nftPolicy)
//       .collectFrom([utxo])
//       .payToAddress(bankWalletAddress, { lovelace: 1000n })
//       .complete();
//   }
//   if (selectedValue == "c") {
//     tx = await lucid
//       .newTx()
//       .mintAssets({ [unit]: 1n }, Data.void())
//       .attachMetadata("721", obj)
//       .attachMintingPolicy(nftPolicy)
//       .collectFrom([utxo])
//       .payToAddress(currentAddr, { [unit]: 1n })
//       .payToAddress(bankWalletAddress, { lovelace: 1000000n })
//       .complete();
//   }

//   //   const tx = await lucid
//   //     .newTx()
//   //     .mintAssets({ [unit]: 1n }, Data.void())
//   //     .attachMetadata("721", obj)
//   //     .attachMintingPolicy(nftPolicy)
//   //     .collectFrom([utxo])
//   //     .payToAddress(selectedValue == "c" ? currentAddr : bankWalletAddress, {
//   //       [unit]: selectedValue == "c" ? 1n : 1000n,
//   //     })
//   //     .complete();
//   const signedTx = await tx.sign().complete();
//   const txHash = await signedTx.submit();
//   return txHash;

// From component 5

// const transferLucid = await Lucid.new(
//     new Blockfrost(blockfrostUrl, blockfrostApiKey),
//     blockfrostNetworkName
//   );

//   transferLucid.selectWalletFromSeed(seedPhrase);
//   const lucidBrowser = await Lucid.new(
//     new Blockfrost(blockfrostUrl, blockfrostApiKey),
//     blockfrostNetworkName
//   );

//   const api = await window.cardano[String(connectedWallet)].enable();
//   lucidBrowser.selectWallet(api);

//   const { paymentCredential } = lucidBrowser.utils.getAddressDetails(
//     await lucidBrowser.wallet.address()
//   );
//   const mintingPolicy = lucidBrowser.utils.nativeScriptFromJson({
//     type: "all",
//     scripts: [
//       { type: "sig", keyHash: paymentCredential?.hash },
//       {
//         type: "before",
//         slot: lucidBrowser.utils.unixTimeToSlot(Date.now() + 518400000),
//       },
//     ],
//   });

//   const policyId = lucidBrowser.utils.mintingPolicyToId(mintingPolicy);
//   let metadataX = {};
//   let metadata = {
//     name: data.name,
//     image: `ipfs://${uploaded_image.path}`,
//     mediaType: data.file.type,
//   };
//   if (data.description.length > 0) {
//     metadata["description"] = data.description;
//   }
//   metadataX[metadata.name] = metadata;
//   // console.log(metadataX, "dsadasd");
//   const unit = policyId + fromText(metadata.name);

//   let obj = { [policyId]: metadataX };
//   const tx = await lucidBrowser
//     .newTx()
//     .attachMetadata("721", obj)
//     .mintAssets({ [unit]: 1n })
//     .payToAddress(await transferLucid.wallet.address(), {
//       [unit]: 1n,
//     })
//     .validTo(Date.now() + 100000)
//     .attachMintingPolicy(mintingPolicy)
//     .complete();
//   const signedTx = await tx.sign().complete();
//   const txHash = await signedTx.submit();
//   return txHash;
