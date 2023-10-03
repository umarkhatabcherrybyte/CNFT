import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import styled from "styled-components";
import { Menu, ShoppingBag } from "@mui/icons-material";
import { useRouter } from "next/router";
const DrawerMain = ({ navData }) => {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <DrawerStyled>
          <List sx={{ background: "#25379d", height: "100%" }}>
            <img src="/images/logo.png" alt="" className="logo" />
            {navData.map((page, index) => (
              <ListItemButton
                key={index}
                onClick={() => {
                  router.push(page.navigate);
                  setOpenDrawer(false);
                }}
              >
                <ListItemIcon>
                  <page.icon sx={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText sx={{ color: "#fff" }}>{page.value}</ListItemText>
              </ListItemButton>
            ))}
            <ListItemButton
              onClick={() => {
                router.push("/sell");
                setOpenDrawer(false);
              }}
            >
              <ListItemIcon>
                <ShoppingBag sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText sx={{ color: "#fff" }}>Sell</ListItemText>
            </ListItemButton>
          </List>
        </DrawerStyled>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <Menu color="white" />
      </IconButton>
    </>
  );
};

export default DrawerMain;
const DrawerStyled = styled.section`
  height: 100%;
  .logo {
    padding: 0 20px;
    max-width: 150px;
  }
  /* .MuiList-root {
    padding: 10px 4rem 10px 10px !important;
  } */
`;
