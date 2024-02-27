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
//<ThreeRender drag={true} orbit={false} ortographic={true}></ThreeRender>
export default function Home() {
	console.log("add cell")
	const [newCell, setNewCell]=useState(null)
	//<SceneRender drag={true} orbit={false} ortographic={true} dimGui={true} n={1}></SceneRender>
	//<SceneRender drag={false} orbit={true} ortographic={false} dimGui={false} n={2}></SceneRender>
	return (
		<CellsContext.Provider value={[newCell, setNewCell]}>
			<div className="flex flex-col">
				<CellsMenu></CellsMenu>
				<ThreeScenes></ThreeScenes>
			</div>
		</CellsContext.Provider>
		);
}
