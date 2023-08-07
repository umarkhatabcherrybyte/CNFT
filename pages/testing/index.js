import React from 'react'
import { Box } from '@mui/material';
import { useAssets } from '@meshsdk/react';
const Testing = () => {
    const assets = useAssets()
    console.log(assets ,"assetsassetsassetsassets")
  return (
    <Box sx={{height:"40vh" , display:"flex" , alignItems:"center", justifyContent:"center"}}>
        Testing
    </Box>
  )
}

export default Testing