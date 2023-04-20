import React, { useEffect } from "react";
import styled from "styled-components";
import { useWallet, useLovelace } from "@meshsdk/react";
import CaptionHeading from "/components/shared/headings/CaptionHeading";
import UserService from "../../services/user.service";
import { useDispatch } from "react-redux";
import { Box, Select, MenuItem, Button, Typography } from "@mui/material";
import { Toast } from "../shared/Toast";
import { setUser } from "../../redux/user/userActions";
import { formatAmount } from "/helper/formatAmount";
const wallets = [
  {
    img: "/images/wallet/nami_small.png",
    value: "Nami",
    label: "Nami",
    extension: "nami",
  },
  {
    img: "/images/wallet/eternl_small.png",
    value: "eternl",
    label: "Eternl",
    extension: "eternl",
  },
  {
    img: "/images/wallet/flint_small.png",
    value: "Flint Wallet",
    label: "Flint",
    extension: "flint",
  },
  {
    img: "/images/wallet/nufi_small.png",
    value: "NuFi",
    label: "Nufi",
    extension: "nufi",
  },
  {
    img: "/images/wallet/gerowallet_small.png",
    value: "GeroWallet",
    label: "Gero",
    extension: "gerowallet",
  },
  {
    img: "/images/wallet/typhoncip30_small.png",
    value: "Typhon Wallet",
    label: "Typhon",
    extension: "typhoncip30",
  },
];

const WalletDropdown = () => {
  const dispatch = useDispatch();
  const { wallet, connected, name, connecting, connect, disconnect, error } =
    useWallet();

  const lovelace = useLovelace();

  const [walletName, setWalletName] = React.useState("default");
  useEffect(() => {
    disconnect();
  }, []);
  useEffect(() => {
    if (!connected) {
      localStorage.removeItem("user_id");
      disconnect(setUser(""));
    }
  }, [connected]);

  useEffect(() => {
    signIn();
  }, [connected, wallet]);
  useEffect(() => {
    if (error) {
      setWalletName(name);
    }
  }, [error]);

  const handleWalletChange = (event) => {
    setWalletName(event.target.value);
  };

  const signIn = async () => {
    try {
      if (connected) {
        // console.log(wallet, 'weawdas')
        let addrss = await wallet?.getUsedAddresses();
        // console.log('here', await wallet?.getUsedAddress(), await wallet?.getUsedAddresses())
        window.localStorage.setItem("user_address", addrss[0]);

        let res = await UserService.signIn(addrss[0]);
        if (res.data) {
          // console.log(res.data);
          window.localStorage.setItem("user_id", res.data.data._id);
          dispatch(setUser(res.data.data._id));
        }
      }
    } catch (error) {
      console.log(error, "err");
    }
  };

  const handleWalletClick = async (event, walletV) => {
    if (walletV.extension && window?.cardano[walletV?.extension] != undefined) {
      if (walletV.value === walletName) {
        setWalletName("default");
        disconnect();
      } else {
        connect(walletV.value);
        window.localStorage.setItem("connectedWallet", walletV.extension);
      }
    } else {
      Toast("error", "Please install your wallet");
    }
  };

  return (
    <WalletDropDownStyled>
      <Select
        value={walletName}
        onChange={(e) => handleWalletChange(e)}
        renderValue={(selected) => {
          switch (walletName) {
            case "default":
              return <img src="/images/wallet/default.png" alt="nami" />;
            case "Nami":
              return <img src="/images/wallet/nami_small.png" alt="nami" />;

            case "eternl":
              return <img src="/images/wallet/eternl_small.png" alt="eternl" />;

            case "Flint Wallet":
              return <img src="/images/wallet/flint_small.png" alt="flint" />;

            case "NuFi":
              return <img src="/images/wallet/nufi_small.png" alt="nufi" />;

            case "Typhon Wallet":
              return (
                <img
                  src="/images/wallet/typhoncip30_small.png"
                  alt="typhoncip30"
                />
              );

            case "GeroWallet":
              return (
                <img
                  src="/images/wallet/gerowallet_small.png"
                  alt="gerowallet"
                />
              );

            default:
              return <img src="/images/wallet/default.png" alt="defaultLogo" />;
          }
        }}
        inputProps={{
          "aria-label": "Without label",
          className: "root",
        }}
        MenuProps={{
          PaperProps: {
            style: {
              width: 250,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backgroundColor: "rgb(57, 83, 142)",
              color: "#fff",
              borderRadius: "10px",
            },
          },
        }}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          svg: { color: "#fff" },
          "&  img": {
            width: "24px",
            height: "24px",
            objectFit: "contain",
          },

          fieldset: {
            border: "none",
            outline: "none",
          },
        }}
      >
        {wallets.map((wallet) => (
          <MenuItem
            onClick={(e) => handleWalletClick(e, wallet)}
            key={wallet.value}
            value={wallet.value}
            sx={{
              "&.Mui-selected": {
                background: "transparent !important",
              },
              "&:hover": {
                background: "var(--secondary-color) !important",
                borderRadius: "30px",
              },
            }}
          >
            <Box
              sx={{
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <img
                src={wallet.img}
                alt="img"
                className="wallet_icon"
                style={{ width: "24px", height: "26px", objectFit: "contain" }}
              />

              <CaptionHeading
                heading={
                  connected && name === wallet.value
                    ? formatAmount(parseInt(lovelace) / 1000000) + " ADA"
                    : wallet.label
                }
              />

              <Box
                sx={{
                  "& .connect_btn": {
                    border: "none",
                    borderRadius: "30px",
                    padding: "5px 12px",
                    backgroundColor: " rgba(255, 255, 255, 0.2)",
                    color: "#fff",
                  },
                }}
              >
                {connected && name === wallet.value ? (
                  <Button className="connect_btn">Disconnect</Button>
                ) : (
                  <Button className="connect_btn">Connect</Button>
                )}
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Select>
      <Typography variant="body" className="status bold">
        {connecting ? (
          <p className="font_12">Connecting....</p>
        ) : (
          <>
            {walletName != "default" && lovelace ? (
              formatAmount(parseInt(lovelace) / 1000000) + " ADA"
            ) : (
              <p className="font_12">Connect Here</p>
            )}
          </>
        )}
      </Typography>
    </WalletDropDownStyled>
  );
};

export default WalletDropdown;

const WalletDropDownStyled = styled.section`
  display: flex;
  align-items: center;
  .status {
    padding: 6px 20px;
    font-weight: bold;
    background-color: rgba(255, 255, 255, 0.2);
    border-top-right-radius: 17px;
    border-bottom-right-radius: 17px;
    color: white;
    height: 44px;
    display: flex;
    align-items: center;
  }
  .wallet_icon {
    width: 24px;
  }

  .root {
    padding: 6px 19px;
  }

  .MuiInputBase-root {
    border-radius: 17px 0 0 17px;
    height: 44px;
  }
`;
// {/* {isConnected ? (
//     <span>{stakeAddress} addres</span>
//   ) : (
//     <button onClick={() => connect("nami", onConnect, onError)}>
//       Connect
//     </button>
//   )} */}
