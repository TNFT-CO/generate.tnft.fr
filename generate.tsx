"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { generateMnemonic } from "bip39"
import { saveAs } from "file-saver"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface BackgroundProps {}

const ComingSoon: React.FC<BackgroundProps> = () => {
	const [alertMessage, setAlertMessage] = useState("")
	const [alertType, setAlertType] = useState("")
	const [numMnemonics, setNumMnemonics] = useState("1")
	const [mnemonics, setMnemonics] = useState<string[]>([])

	const BREAKPOINTS = [576, 768, 992, 1200]
	const mq = BREAKPOINTS.map((bp) => `@media (max-width: ${bp}px)`)

	const handleChange = (event: {
		target: { value: React.SetStateAction<string> }
	}) => {
		setNumMnemonics(event.target.value)
	}

	const showAlert = (
		message: React.SetStateAction<string>,
		type: React.SetStateAction<string>
	) => {
		setAlertMessage(message)
		setAlertType(type)
	}

	const generateMnemonics = () => {
		const num = parseInt(numMnemonics)
		if (!isNaN(num) && num > 0 && num <= 1000) {
			const newMnemonics: string[] = []
			for (let i = 0; i < num; i++) {
				const mnemonic = generateMnemonic()
				newMnemonics.push(`${i + 1}. ${mnemonic}`)
			}
			setMnemonics(newMnemonics)
		} else {
			showAlert("Veuillez entrer un nombre entre 1 et 1000.", "alert-red")
		}
	}

	const downloadCSV = () => {
		const csvContent = mnemonics.map(mnemonic => mnemonic.split('. ')[1]).join('\n');
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
		saveAs(blob, 'mnemonics.csv');
	  };

	return (
		<div
			style={{
				position: "relative",
			}}
		>
			<div
				style={{
					position: "absolute",
					width: "100%",
					height: "100vh",
					zIndex: -1,
				}}
			>
				<Image
					src="/background_comingsoon.png"
					alt="background image"
					layout="fill"
					objectFit="cover"
					objectPosition="center center"
				/>
			</div>
			<div
				style={{
					top: "60px",
					position: "absolute",
					width: "100%",
					marginBottom: "60px",
					...(mq[1] && {
						top: "40px",
					}),
					...(mq[0] && {
						marginBottom: "40px",
					}),
				}}
			>
				<div
					style={{
						width: "67%",
						height: "90vh",
						borderRadius: "15px",
						margin: "0 auto",
						padding: "70px 40px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						gap: "10px",
						...(mq[1] && {
							width: "95%",
						}),
						...(mq[0] && {
							padding: "20px 40px",
						}),
					}}
				>
					<div>
						<h1
							style={{
								fontSize: "6rem",
								textAlign: "center",
								color: "#FFF",
								fontFamily: "Etna",
							}}
						>
							TNFT
						</h1>

						<h3
							style={{
								textAlign: "center",
								fontFamily: "Etna",
								textTransform: "uppercase",
								color: "#FFF",
								letterSpacing: "0.5rem",
								marginBottom: "40px",
							}}
						>
							Generate mass wallet (Cosmos Wallet)
						</h3>

						<div className="mt-24 rounded-xl border border-[#a0aebf] backdrop-blur-lg p-6 py-12 text-black bg-black/40 text-center md:mx-44">
							{alertMessage && (
								<div className="flex flex-col items-center justify-center">
									<div
										className={alertType}
										dangerouslySetInnerHTML={{ __html: alertMessage }}
									></div>
								</div>
							)}

							<label>
								<div className="text-white">
									Nombre de mnémoniques à générer :
								</div>
								<br />
								<input
									className="w-1/4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline mr-3"
									type="number"
									value={numMnemonics}
									onChange={handleChange}
								/>
							</label>
							<button
								className={buttonVariants({
									size: "default",
									variant: "secondary",
								})}
								onClick={generateMnemonics}
							>
								Générer
							</button>
							{mnemonics.length > 0 && (
								<div className="py-3">
									<textarea
										className="pt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
										rows={10}
										cols={50}
										value={mnemonics.join("\n\n")}
										readOnly
									/>
									<button
										className={buttonVariants({
											size: "default",
											variant: "secondary",
										})}
										onClick={downloadCSV}
									>
									Télécharger en CSV
									</button>
								</div>
							)}
						</div>
					</div>

					<div>
						<div
							style={{ display: "flex", justifyContent: "center", gap: "20px" }}
						>
							<Link
								href={siteConfig.links.linkedin}
								target="_blank"
								rel="noreferrer"
							>
								<div
									className={buttonVariants({
										size: "icon",
										variant: "secondary",
									})}
								>
									<Icons.linkedin className="h-5 w-5" />
									<span className="sr-only">Linkedin</span>
								</div>
							</Link>
							<Link
								href={siteConfig.links.twitterX}
								target="_blank"
								rel="noreferrer"
							>
								<div
									className={buttonVariants({
										size: "icon",
										variant: "secondary",
									})}
								>
									<Icons.twitterX className="h-5 w-5" />
									<span className="sr-only">TwitterX</span>
								</div>
							</Link>
							<Link
								href={siteConfig.links.telegram}
								target="_blank"
								rel="noreferrer"
							>
								<div
									className={buttonVariants({
										size: "icon",
										variant: "secondary",
									})}
								>
									<Icons.telegram className="h-5 w-5" />
									<span className="sr-only">Telegram</span>
								</div>
							</Link>
							<Link
								href={siteConfig.links.discord}
								target="_blank"
								rel="noreferrer"
							>
								<div
									className={buttonVariants({
										size: "icon",
										variant: "secondary",
									})}
								>
									<Icons.discord className="h-5 w-5" />
									<span className="sr-only">discord</span>
								</div>
							</Link>
							<Link
								href={siteConfig.links.website}
								target="_blank"
								rel="noreferrer"
							>
								<div
									className={buttonVariants({
										size: "icon",
										variant: "secondary",
									})}
								>
									<Icons.logo className="h-5 w-5" />
									<span className="sr-only">Website</span>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ComingSoon
