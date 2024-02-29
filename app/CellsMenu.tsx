import React, { useContext } from 'react'
import { TbCubePlus } from "react-icons/tb"
import { TbCylinderPlus } from "react-icons/tb"
import { TbSpherePlus } from "react-icons/tb"
import { TbConePlus } from "react-icons/tb"
import { TbCirclePlus } from "react-icons/tb"
import { MdOutlineTextIncrease } from "react-icons/md"
import { FaRegSquare } from "react-icons/fa"
import { IoTriangleOutline } from "react-icons/io5"
import { BiShapePolygon } from "react-icons/bi"
import { FaRegCircle } from "react-icons/fa"
import torus from "../public/torus.png"
import { CellsContext, TrayContext } from './page'

export const CellsMenu = () => {
  const [newCell, setNewCell] = useContext(CellsContext);
  const [tray, setTray] = useContext(TrayContext);
  return (
    <div className="flex flex-col gap-1 bg-slate-700 rounded-md">
      <div className="flex flex-row gap-1 text-2xl">
          <h1 className="text-xl text-slate-400">Cells:</h1>
          <TbCubePlus className="hover:text-indigo-500" onClick={()=>setNewCell("box")}></TbCubePlus>
          <TbCylinderPlus className="hover:text-indigo-500" onClick={()=>setNewCell("cylinder")}></TbCylinderPlus>
          <TbSpherePlus className="hover:text-indigo-500" onClick={()=>setNewCell("sphere")}></TbSpherePlus>
          <TbConePlus className="hover:text-indigo-500" onClick={()=>setNewCell("cone")}></TbConePlus>
          <BiShapePolygon className="hover:text-indigo-500" onClick={()=>setNewCell("polygon")}></BiShapePolygon>
          <TbCirclePlus className="hover:text-indigo-500" onClick={()=>setNewCell("ring")}></TbCirclePlus>
          <MdOutlineTextIncrease className="hover:text-indigo-500" onClick={()=>setNewCell("text")}></MdOutlineTextIncrease>
      </div>
      <div className="flex flex-row gap-1 text-2xl">
        <h1 className="text-xl text-slate-400">Tray:</h1>
          <FaRegSquare className="hover:text-indigo-500" onClick={()=>setTray("box")}></FaRegSquare>
          <FaRegCircle className="hover:text-indigo-500" onClick={()=>setTray("cylinder")}></FaRegCircle>
          <BiShapePolygon className="hover:text-indigo-500" onClick={()=>setTray("polygon")}></BiShapePolygon>
      </div>
      <div className="flex flex-row">
        <a className="text-slate-400">Tray thickness:</a>
        <input type="number" value="2.5"  className="w-12 bg-slate-600 border border-slate-500 text-sm rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-200"></input>
      </div>
    </div>
  )
}
