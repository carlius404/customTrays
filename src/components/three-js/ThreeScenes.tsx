import React, { useContext, useEffect, useRef, useState } from 'react'
import ThreeScene from '@/lib/ThreeScene';
import { CellsContext, TrayContext } from '@/app/create/page';


export const ThreeScenes = () => {
    const canvas2d = useRef(null);
    const canvas3d = useRef(null);
    const [newCell, setNewCell] = useContext(CellsContext);
    const [tray, setTray]=useContext(TrayContext);
    const [scene2D, setScene2D] = useState(undefined);
    const [scene3D, setScene3D] = useState(undefined);
    const maxDim=50 //in cm
    
    useEffect(() => {
        if (typeof scene2D === 'undefined') {
            const scene2D = new ThreeScene(canvas2d, true,false,false,true,maxDim)
            const scene3D = new ThreeScene(canvas3d, false,true,false,false,maxDim)
            setScene2D(scene2D)
            setScene3D(scene3D)
            scene2D.init()      
            scene3D.init()
            scene2D.addCell("box",maxDim/3)
            scene2D.addCell("box",maxDim/3)
            scene2D.setTray("box",maxDim)


            const animate=()=>{
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
            scene2D.addCell(newCell,maxDim/3)
        }
    }, [scene2D, newCell]);

    useEffect(() => {
        if (scene2D && tray !== null) {
            scene2D.setTray(tray,maxDim)
        }
    }, [scene2D, tray]);
    return (
        <div className="flex flex-row gap-5">
            <canvas ref={canvas2d}  className="w-1/3 h-full border-2 border-slate-800 rounded-lg"></canvas>
            <canvas ref={canvas3d} className="w-1/3 h-full border-2 border-slate-800 rounded-lg"></canvas>
        </div>

    )
}
