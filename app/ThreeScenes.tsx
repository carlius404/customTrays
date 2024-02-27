import React, { useContext, useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import ThreeScene from './lib/ThreeScene';
import { CellsContext } from './page';

export const ThreeScenes = () => {
    const [newCell, setNewCell] = useContext(CellsContext);
    const [scene2D, setScene2D] = useState(undefined);
    const [scene3D, setScene3D] = useState(undefined);
    useEffect(() => {
        if (typeof scene2D === 'undefined') {
            const scene2D = new ThreeScene("myThreeJsCanvas2D", true,false,true,true);
            const scene3D = new ThreeScene("myThreeJsCanvas3D", false,true,false,false);
            setScene2D(scene2D);
            setScene3D(scene3D);
            scene2D.init();
            scene3D.init();
            scene2D.addCell("box");
            scene2D.addCell("box");

            const copyObjects=(fromScene,toScene)=>{
                fromScene.traverse(function(object) {
                    if (object instanceof THREE.Mesh) {
                        var clonedObject = object.clone();
                        toScene.add(clonedObject);
                    }
                });
            }

            const animate=()=>{
                //copyObjects(scene2D.scene,scene3D.scene)
                scene3D.scene.children=scene2D.scene.children
                scene2D.renderer.render(scene2D.scene,scene2D.camera)
                scene3D.renderer.render(scene3D.scene,scene3D.camera)
                window.requestAnimationFrame(animate)
            }
            animate()
        }
    }, [scene2D]);

    

    useEffect(() => {
        if (scene2D && newCell !== null) {
            scene2D.addCell(newCell)
        }
    }, [scene2D, newCell]);
    return (
    <div>
        <canvas id="myThreeJsCanvas2D"/>
        <canvas id="myThreeJsCanvas3D"/>
    </div>
    )
}
