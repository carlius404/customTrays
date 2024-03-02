"use client"

import Image from "next/image";
import { createContext, useEffect, useState } from "react";
import { CellsMenu } from "@/components/three-js/CellsMenu";
import { ThreeScenes } from "@/components/three-js/ThreeScenes";

export const CellsContext=createContext()
export const TrayContext=createContext()

export default function Home() {
	console.log("add cell")
	const [newCell, setNewCell]=useState(null)
	const [tray, setTray]=useState(null)

	return (
		<CellsContext.Provider value={[newCell, setNewCell]}>
			<TrayContext.Provider value={[tray, setTray]}>
				<div className="flex flex-col">
					<CellsMenu></CellsMenu>
					<ThreeScenes></ThreeScenes>
				</div>
			</TrayContext.Provider>
		</CellsContext.Provider>
		);
}