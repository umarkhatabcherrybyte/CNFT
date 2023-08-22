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
export const seedPhrasePreprod =
  "load obtain bachelor bid steak royal retreat gossip width method august boat plunge library mail pulse raw six smart news buddy party engine ride";

const bankWalletAddress =
  "addr_test1qz2f59rk5mrss5xrjtwqa8kh269fvu9gzgswk6jt29axe9gpuhlkntj7m9yl2eflx3thj7lt3lvyzysh4202vvgxgahseljsmd"; //new admin preprod address
// const seedPhrasePreprod =
//   "invloved sudden plug library sunny lunar tragic pride chapter flee sight side mechanic choose sure early hunt develop symbol physical core bulb flag chimney";

const seedPhraseMainnet =
  "invloved sudden plug library sunny lunar tragic pride chapter flee sight side mechanic choose sure early hunt develop symbol physical core bulb flag chimney";

const metadata = {
  MeshToken01: {
    name: "Mesh Token 1",
    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    mediaType: "image/jpg",
    description: "Just a purple coin.",
    artist: "This NFT is minted by Mesh (https://meshjs.dev/).",
  },
  MeshToken02: {
    name: "Mesh Token 2",
    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    mediaType: "image/jpg",
    description: "This is suppose to be a gold coin.",
    artist: "This NFT is minted by Mesh (https://meshjs.dev/).",
  },
  MeshToken03: {
    name: "Mesh Token 3",
    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    mediaType: "image/jpg",
    description: "A coin with a M on it.",
    artist: "This NFT is minted by Mesh (https://meshjs.dev/).",
  },
};

const assetsMetadataFake = {
  1: {
    name: "Mesh Token 01",
    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    mediaType: "image/jpg",
    description: "This NFT is minted by Mesh (https://mesh.martify.io/).",
  },
  2: {
    name: "Mesh Token 02",
    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    mediaType: "image/jpg",
    description: "This NFT is minted by Mesh (https://mesh.martify.io/).",
  },
  3: {
    name: "Mesh Token 03",
    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    mediaType: "image/jpg",
    description: "This NFT is minted by Mesh (https://mesh.martify.io/).",
  },
  4: {
    name: "Mesh Token 04",
    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    mediaType: "image/jpg",
    description: "This NFT is minted by Mesh (https://mesh.martify.io/).",
  },
  5: {
    name: "Mesh Token 05",
    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    mediaType: "image/jpg",
    description: "This NFT is minted by Mesh (https://mesh.martify.io/).",
  },
  6: {
    name: "Mesh Token 06",
    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    mediaType: "image/jpg",
    description: "This NFT is minted by Mesh (https://mesh.martify.io/).",
  },
  7: {
    name: "Mesh Token 07",
    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    mediaType: "image/jpg",
    description: "This NFT is minted by Mesh (https://mesh.martify.io/).",
  },
  8: {
    name: "Mesh Token 08",
    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    mediaType: "image/jpg",
    description: "This NFT is minted by Mesh (https://mesh.martify.io/).",
  },
  9: {
    name: "Mesh Token 09",
    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    mediaType: "image/jpg",
    description: "This NFT is minted by Mesh (https://mesh.martify.io/).",
  },
};

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
  assetsMetadataFake,
  assetsMetadata,
  seedPhraseMainnet,
  seedPhrasePreprod,
};
