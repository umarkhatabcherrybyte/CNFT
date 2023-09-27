import { Button } from "@mui/material";
import React from "react";

function ShowNFT({ nft }) {
  return (
    <div key={nft.id} className="p-2">
      <img
        alt={nft.assetName + "_img"}
        style={{ width: "300px", height: "200px", borderRadius: "10px" }}
        src={nft.detail._imageUrl}
      />
      <div className="p-4">
        <h1 style={{color:"white"}}>{nft.assetName}</h1>
      </div>
      
    </div>
  );
}

export default ShowNFT;
