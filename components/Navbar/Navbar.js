import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
  useTheme,
  Container,
  Typography,
  Menu,
  MenuItem,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import Drawer from "./Drawer";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import WalletDropDown from "./WalletDropDown";
import {
  Home,
  Store,
  Storefront,
  LocalGroceryStore,
  Apps,
} from "@mui/icons-material";
import SearchBar from "./SearchBar";
import {
  buyRoute,
  collectionRoute,
  auctionRoute,
} from "../../components/Routes/constants";
const Navbar = () => {
  const theme = useTheme();
  const router = useRouter();
  // const location = useLocation();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  const [value, setValue] = useState("/");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // useEffect(() => {
  //   setValue(location.pathname);
  // }, [location.pathname]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navData = [
    {
      value: "Home",
      navigate: "/",
      icon: Home,
    },
    // {
    //   value: "Collection",
    //   navigate: collectionRoute,
    //   icon: Apps,
    // },
    // {
    //   value: "sell",
    //   navigate: "/sell",
    //   icon: Sell,
    // },
    {
      value: "Buy",
      navigate: buyRoute,
      icon: Store,
    },
    {
      value: "Auction",
      navigate: auctionRoute,
      icon: Storefront,
    },
    {
      value: "Mint",
      navigate: "/mint",
      icon: LocalGroceryStore,
    },
  ];
  // const [navScroll, setNavScroll] = useState("");
  // useEffect(() => {
  //   window.addEventListener("scroll", function () {
  //     if (window.pageYOffset > 0) {
  //       setNavScroll("active");
  //     } else {
  //       setNavScroll("");
  //     }
  //   });
  // }, []);

  // const SearchHandler = (e) => {
  //   if (e.target.value) {
  //     setTimeout(() => {
  //       navigate("/search");
  //     }, 3000);
  //   } else {
  //     navigate("/");
  //   }
  // };
  return (
    <NavStyled>
      <AppBar
        sx={{
          position: "absolute",
          background: "transparent",
          display: "initial",
          boxShadow: "none",
          padding: "8px 0",
        }}
        // className={`${navScroll}`}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              p: 0,
              justifyContent: "space-between",
              "& .flex_item": {
                display: "flex",
                alignItems: "center",
              },
            }}
          >
            <Box className="flex_item">
              <Link href="/" style={{ textDecoration: "none" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img src="/images/logo.png" alt="logo" className="logo" />
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", ml: 2 }}
                    className="bold"
                  >
                    CNFT GENIE
                  </Typography>
                </Box>
              </Link>
            </Box>
            <Box className="flex_item">
              {!isMatch && (
                <>
                  {/* <SearchBar /> */}
                  {/* {navData.map((data) => (
                    <Link href={data.navigate} className="proxima">
                      {data.value}
                    </Link>
                  ))} */}
                  <Tabs
                    value={value}
                    onChange={(e, value) => {
                      router.push(value);
                      setValue(value);
                    }}
                    sx={{
                      "& .MuiTab-root": {
                        color: "#fff",
                        fontWeight: "bold",
                        minWidth: "30px",
                        padding: "15px",
                        textTransform: "initial",
                      },
                      "& .MuiTabs-indicator": {
                        display: "none",
                      },
                      "& .Mui-selected": {
                        color: "#fff !important",
                      },
                    }}
                  >
                    {navData.map((data) => (
                      <Tab
                        onClick={() => router.push(data.navigate)}
                        key={data?.value}
                        value={data?.navigate}
                        label={data.value}
                        className="proxima"
                      />
                    ))}
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      className="bold proxima"
                      sx={{
                        color: "#fff",
                        // color:
                        //   location.pathname === "/sell"
                        //     ? "var(--secondary-color)"
                        //     : "#fff",

                        textTransform: "initial",
                      }}
                    >
                      Sell
                    </Button>

                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                        // sx: {
                        //   width: 250,
                        //   border: "1px solid rgba(255, 255, 255, 0.2)",
                        //   backgroundColor: "red",
                        //   color: "#fff",
                        //   borderRadius: "10px",
                        // },
                      }}
                    >
                      <MenuItem
                        onClick={(e) => {
                          setAnchorEl(null);
                          router.push({
                            pathname: "/sell",
                            query: {
                              type: "add-listing",
                            },
                          });
                        }}
                      >
                        Add Listing
                      </MenuItem>
                      <MenuItem
                        onClick={(e) => {
                          setAnchorEl(null);
                          router.push({
                            pathname: "/sell",
                            query: {
                              type: "my-listing",
                            },
                          });
                        }}
                      >
                        My Listing
                      </MenuItem>
                    </Menu>
                  </Tabs>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "end",
                    }}
                  >
                    <WalletDropDown />
                  </Box>
                </>
              )}
              {isMatch && <Drawer navData={navData} />}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container sx={{ pt: 10 }}>
        {isMatch && (
          <>
            <Box sx={{ my: 2 }}>
              <Divider sx={{ borderColor: "#fff" }} />
              <Grid container spacing={1} alignItems="center" sx={{ py: 2 }}>
                <Grid item xs={6}>
                  {/* <SearchBar /> */}
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    section: {
                      justifyContent: "end",
                    },
                  }}
                >
                  {/* <WalletDropDown /> */}
                </Grid>
              </Grid>
              <Divider sx={{ borderColor: "#fff" }} />
            </Box>
          </>
        )}
      </Container>
    </NavStyled>
  );
};

export default Navbar;

const NavStyled = styled.nav`
  .search_bar {
    padding: 4px 11px;
    border: 1px solid #ffffff;
    border-radius: 30px;
    font-size: 15px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    width: 100%;
    max-width: 260px;
    height: 34px;
    outline: none;
    &::placeholder {
      color: #fff;
    }
  }
  .logo {
    width: 80px;
  }
`;
