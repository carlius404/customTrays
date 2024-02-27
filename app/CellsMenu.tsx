import React, { useContext } from 'react'
import { TbCubePlus } from "react-icons/tb"
import { TbCylinderPlus } from "react-icons/tb"
import { TbSpherePlus } from "react-icons/tb"
import { TbConePlus } from "react-icons/tb"
import { TbCirclePlus } from "react-icons/tb"
import { MdOutlineTextIncrease } from "react-icons/md"
import torus from "../public/torus.png"
import { CellsContext } from './page'

export const CellsMenu = () => {
  const [newCell, setNewCell] = useContext(CellsContext);
  return (
    <div className="flex flex-row gap-1 bg-slate-700 rounded-md">
      <h1 className="text-xl text-slate-400">cells:</h1>
      <div className="flex flex-row gap-1 text-2xl">
          <TbCubePlus className="hover:text-indigo-500" onClick={()=>setNewCell("box")}></TbCubePlus>
          <TbCylinderPlus className="hover:text-indigo-500" onClick={()=>setNewCell("cylinder")}></TbCylinderPlus>
          <TbSpherePlus className="hover:text-indigo-500" onClick={()=>setNewCell("sphere")}></TbSpherePlus>
          <TbConePlus className="hover:text-indigo-500" onClick={()=>setNewCell("cone")}></TbConePlus>
          <TbCirclePlus className="hover:text-indigo-500" onClick={()=>setNewCell("ring")}></TbCirclePlus>
          <MdOutlineTextIncrease className="hover:text-indigo-500" onClick={()=>setNewCell("text")}></MdOutlineTextIncrease>
      </div>
    </div>
  )
}
