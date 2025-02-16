"use client"

import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Sidebar from "./components/Sidebar"
import Canvas from "./components/Canvas"
import { WorkflowProvider } from "./contexts/WorkflowContext"

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <WorkflowProvider>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Canvas />
          </div>
        </div>
      </WorkflowProvider>
    </DndProvider>
  )
}

