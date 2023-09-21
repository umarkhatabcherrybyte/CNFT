const costLovelace = "10000000";

// //const bankWalletAddress = 'addr1qxfluyl3p9qgfaqyx7dnc7u30ltyfkhcarm52f9lmu3rh2as8utsh5w6tcs3w639stc52m82aqz4durqpsm7fttpsceqjyjffm'; //mainnet address
// const bankWalletAddress =
//   "addr_test1qqz6h03vswqfq0qde4an57mz7ql03svhpws4tpu4s4xwl0yl9hymfyel5f99ky0p4zpf8k6ymt59reymqdx20nq6tn7svyq8a2"; //preprod address
// const seedPhraseMainnet =
//   "salon zone jaguar antenna above shift zoo seminar onion shift bread salmon coin boat meadow enrich vibrant cream dignity flip biology stadium merge snake";

// const seedPhrasePreprod =
//   "cake throw fringe stock then already drip toss hunt avocado what walk divert noodle fork above hurt carbon leisure siege hand enter air surprise";

//new admin wallet address and seed phrase
// const bankWalletAddress =
//   "addr1q8nhtelxukx458x8h06d67l63yqs548h8guqxrdy525k428naxdfpf5a6evfaz78rdmu4d66fmvgzvmawl99y6wk0rjq9el5vh"; //new admin mainnet addres

// wali dev seed
export const seedPhrasePreprod ="zebra scheme remember grape panther utility mobile ostrich luxury oven matrix waste chase please way belt quit jealous small hair world end casual wagon";
// wali  dev address
const bankWalletAddress =
  "addr_test1qz9kafjtlqtnn7qpjuyqyen7c46wtnlsstzqtuykxuwkrsaa5kc6s4rgd82vj2val5yq2vchymdm24xakdd3w3wqsvws2hhemc";

const seedPhraseMainnet =
  "invloved sudden plug library sunny lunar tragic pride chapter flee sight side mechanic choose sure early hunt develop symbol physical core bulb flag chimney";

const assetsMetadata = {
  MeshToken01: {
    name: "Yo Yo",
    image: "ipfs://QmaYZZ1dFS1nXYrFC9TXZYkEMzhNrk1GemMW4GQ3wNhsRh/0.png",
    mediaType: "image/jpg",
    description: "Just a purple coin.",
    artist: "This NFT is minted by Mesh (https://mesh.martify.io/).",
  },
  MeshToken02: {
    name: "YO YO",
    image: "ipfs://QmaYZZ1dFS1nXYrFC9TXZYkEMzhNrk1GemMW4GQ3wNhsRh/0.png",
    mediaType: "image/jpg",
    description: "This is suppose to be a gold coin.",
    artist: "This NFT is minted by Mesh (https://mesh.martify.io/).",
  },
  MeshToken03: {
    name: "YO YO",
    image: "ipfs://QmaYZZ1dFS1nXYrFC9TXZYkEMzhNrk1GemMW4GQ3wNhsRh/0.png",
    mediaType: "image/jpg",
    description: "A coin with a M on it.",
    artist: "This NFT is minted by Mesh (https://mesh.martify.io/).",
  },
};

module.exports = {
  costLovelace,
  bankWalletAddress,
  assetsMetadata,
  seedPhraseMainnet,
  seedPhrasePreprod,
};
