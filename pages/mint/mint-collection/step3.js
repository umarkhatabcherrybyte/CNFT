import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../../../components/Mint/Layout";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { createTransaction, signTransaction } from "../../../backend";
import {
	Box,
	Container,
	Typography,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	TextField,
	Button,
	Grid,
} from "@mui/material";
import QRCode from "react-qr-code";
import { Toast } from "../../../components/shared/Toast";
import Strips from "/components/Design/Strips";
import Baloon from "/components/Design/Ballon";
import { useRouter } from "next/router";
import { singleMintStep1 } from '../../../components/Routes/constants'
import { Transaction, ForgeScript, resolveSlotNo, resolvePaymentKeyHash, largestFirst } from '@meshsdk/core';
import { costLovelace, bankWalletAddress } from "../../../config/utils";
import { Lucid, fromText, Blockfrost } from "lucid-cardano";
import { isAwaitExpression } from "typescript";

const payData = [
	{
		title: "Mint for free and list with us ",
		description:
			"If you list your NFT(s) with us for at least 90 days, then you only pay the network fees per mint. Under this option, you won't be able to transfer your NFT(s) until the end of 90 days, unless sold on the site.",
		value: "a",
	},
	{
		title: "Mint, pay, and stay",
		description:
			"Pay a minting fee in addtion to the network fee per mint, but you can transfer your NFT(s) at anytime.",
		value: "b",
	},
	{
		title: "Mint and go ",
		description:
			"Pay CNFT GENIE fee in addition to network fee to mint and send NFT(s) elsewhere.",
		value: "c",
	},
];

const CollectionStep3 = () => {

	let router = useRouter()

	const { wallet, connected } = useWallet();
	const [currentAddr, setCurrentAddr] = useState("");
	const [selectedValue, setSelectedValue] = React.useState();

	const onMint = async () => {
		try {
			let connectedWallet = window.localStorage.getItem("connectedWallet")

			let img = typeof window !== "undefined" && window.localStorage.getItem("img")
			if (selectedValue == undefined || selectedValue == null) {
				Toast("error", "Please Select an Option for Minting");
			} else if (img && connected) {
				if (selectedValue == "a") {
					Toast("error", "This Option is Currently in Development");
				} else if (selectedValue == "b") {
					let metadata_objs = JSON.parse(window.localStorage.getItem("metadataObjects"));
					const lucid = await Lucid.new(
						new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodmdx0R847kjabyIdpC8eHr7ZZOMxlpXbm"),
						"Preprod"
					);

					const api = await window.cardano[String(connectedWallet)].enable();
					lucid.selectWallet(api);

					const { paymentCredential } = lucid.utils.getAddressDetails(
						await lucid.wallet.address(),
					);

					const mintingPolicy = lucid.utils.nativeScriptFromJson(
						{
							type: "all",
							scripts: [
								{ type: "sig", keyHash: paymentCredential?.hash },
								{
									type: "before",
									slot: lucid.utils.unixTimeToSlot(Date.now() + 518400000),
								},
							],
						},
					);

					const policyId = lucid.utils.mintingPolicyToId(
						mintingPolicy,
					);
					let obj;
					let assetObj = {};
					let units = []
					let metadataX = {}
					for (let index = 0; index < metadata_objs.length; index++) {
						const element = metadata_objs[index];
						console.log(element, 'elem')
						let metadata = element
						metadataX[metadata.name] = metadata
						console.log(metadataX, 'dsadasd')
						assetObj[String(policyId + fromText(metadata.name))] = 1n
						units.push(policyId + fromText(metadata.name));
						obj = { [policyId]: metadataX };
					}
					console.log(assetObj, 'onjf')

					const txL = await lucid
						.newTx()
						.validTo(Date.now() + 100000)
						.attachMintingPolicy(mintingPolicy)
						.mintAssets(
							assetObj
						)
						.attachMetadata('721', obj)
						.complete()

					const signedTxL = await txL.sign().complete();
					const txHashL = await signedTxL.submit();
					if (txHashL) {
						window.localStorage.setItem('policy', mintingPolicy.script)
						window.localStorage.setItem('policy-id', policyId)
						window.localStorage.setItem('minting-script', JSON.stringify(mintingPolicy))
						router.push('/mint')
					}

				} else if (selectedValue == "c") {
					if (currentAddr.length > 0) {
						let metadata_objs = JSON.parse(window.localStorage.getItem("metadataObjects"));
						const lucid = await Lucid.new(
							new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodmdx0R847kjabyIdpC8eHr7ZZOMxlpXbm"),
							"Preprod"
						);

						const api = await window.cardano[String(connectedWallet)].enable();
						lucid.selectWallet(api);

						const { paymentCredential } = lucid.utils.getAddressDetails(
							await lucid.wallet.address(),
						);

						const mintingPolicy = lucid.utils.nativeScriptFromJson(
							{
								type: "all",
								scripts: [
									{ type: "sig", keyHash: paymentCredential?.hash },
									{
										type: "before",
										slot: lucid.utils.unixTimeToSlot(Date.now() + 518400000),
									},
								],
							},
						);

						const policyId = lucid.utils.mintingPolicyToId(
							mintingPolicy,
						);
						let obj;
						let assetObj = {};
						let metadataX = {}
						for (let index = 0; index < metadata_objs.length; index++) {
							const element = metadata_objs[index];
							console.log(element, 'elem')
							let metadata = element
							metadataX[metadata.name] = metadata
							console.log(metadataX, 'dsadasd')
							assetObj[String(policyId + fromText(metadata.name))] = 1n
							obj = { [policyId]: metadataX };
						}
						console.log(assetObj, 'onjf')

						const txL = await lucid
							.newTx()
							.validTo(Date.now() + 100000)
							.attachMintingPolicy(mintingPolicy)
							.mintAssets(
								assetObj
							)
							.payToAddress(currentAddr, assetObj)
							.attachMetadata('721', obj)
							.complete()

						const signedTxL = await txL.sign().complete();
						const txHashL = await signedTxL.submit();
						if (txHashL) {
							window.localStorage.setItem('policy', mintingPolicy.script)
							window.localStorage.setItem('policy-id', policyId)
							window.localStorage.setItem('minting-script', JSON.stringify(mintingPolicy))
							router.push('/mint')
						}
					}
					else {
						Toast('error', 'Please Set the Recipeint Address')
					}
				}
			} else {
				Toast("error", "You are not Not Connected");
			}
		} catch (error) {
			console.log('error', error)
			Toast("error", "Error Occured while Minting");
		}
	};

	return (
		<SingleMintStep3Styled>
			<Strips />
			<Baloon />
			<Container>
				<Box sx={{ pt: 15, pb: 3 }} className="text_white">
					<Typography variant="h4" className="bold">
						Pay
					</Typography>
				</Box>
				<Layout>
					<FormControl>
						<RadioGroup
							aria-labelledby="demo-radio-buttons-group-label"
							defaultValue="female"
							name="radio-buttons-group"
						>
							{payData.map((data) => (
								<>
									<Box className="check_panel">
										<FormControlLabel
											value={data.value}
											control={<Radio />}
											label={data.title}
											onChange={(e) => setSelectedValue(e.target.value)}
											sx={{
												"& .Mui-checked": {
													color: "var(--secondary-color)",
												},
											}}
										/>
										<Box>
											<Typography sx={{ pl: 4 }}>{data.description}</Typography>
											{data.value === "c" && (
												<>
													<Grid container spacing={3} sx={{ py: 2 }}>
														<Grid item lg={5}>
															<QRCode value={currentAddr} />
														</Grid>
														<Grid item lg={7}>
															<Typography variant="h6">Make Payment</Typography>
															<TextField
																placeholder="e.g addr1qykn8nchkf5ckg0clq6pa580a50t3zdc06prgwcaj605wpd2g0z6sy0pturmfuru097z3yxknjpnm7fymm96n2vyfxaq0gk62p"
																fullWidth
																onChange={(e) => setCurrentAddr(e.target.value)}
																defaultValue={currentAddr}
																sx={{
																	background: "transparent",
																	input: {
																		padding: "9px 10px",
																		borderRadius: "10px",
																		border: "1px solid #fff",
																	},
																	fieldset: {
																		border: "none",
																	},
																}}
															/>
														</Grid>
													</Grid>
												</>
											)}
										</Box>
									</Box>
								</>
							))}
						</RadioGroup>
					</FormControl>
					<Button className="btn2" sx={{ my: 3 }} onClick={(e) => onMint(e)}>
						Pay and Mint
					</Button>
				</Layout>
			</Container>
		</SingleMintStep3Styled>
	);
};

export default CollectionStep3;

const SingleMintStep3Styled = styled.section`
  .check_panel {
    font-size: 1.2rem;
    color: white;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 25px;
    margin-bottom: 20px;
  }
`;
