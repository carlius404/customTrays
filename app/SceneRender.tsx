import React, { useContext, useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import ThreeScene from './lib/ThreeScene';
import { CellsContext } from './page';

interface SceneRendererProps{
    drag: boolean,
    orbit: boolean,
    ortographic: boolean,
    dimGui:boolean,
    n: number
}
export const SceneRender = ({drag,orbit,ortographic,dimGui,n}:SceneRendererProps) => {
    const [newCell, setNewCell] = useContext(CellsContext);
    const [scene, setScene] = useState(undefined);
    useEffect(() => {
        if (typeof scene === 'undefined') {
            const scene2D = new ThreeScene("myThreeJsCanvas", drag,orbit,ortographic,dimGui);
            setScene(scene2D);
            scene2D.init();
            scene2D.addCell("box");
            scene2D.addCell("box");
            scene2D.animate();
        }
    }, [scene]);

    

    useEffect(() => {
        if (scene && newCell !== null) {
            scene.addCell(newCell);
        }
    }, [scene, newCell]);
    return (
    <div>
        <canvas id="myThreeJsCanvas"/>
    </div>
    )
}
