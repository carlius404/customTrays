"use client"

import Image from "next/image";
import ThreeRender from "./ThreeRenderer";
import { createContext, useEffect, useState } from "react";
import { SceneRender } from "./SceneRender";
import { CellsMenu } from "./CellsMenu";
import * as THREE from 'three';
import { Scene3D } from "./Scene3D";
import { ThreeScenes } from "./ThreeScenes";

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
