"use client"

import { useDrop } from "react-dnd"
import { useWorkflow } from "../contexts/WorkflowContext"
import Block from "./Block"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import VisualFlow from "./VisualFlow"
import AIActionDisplay from "./AIActionDisplay"
import { Undo2 } from "lucide-react"

const Canvas = () => {
  const { blocks, addBlock, updateBlockConfig, deleteBlock, undoDelete, canUndo, executeWorkflow } = useWorkflow()
  const [aiActions, setAiActions] = useState<string[]>([])
  const [showActions, setShowActions] = useState(false)

  const [, drop] = useDrop(() => ({
    accept: "block",
    drop: (item: { type: string }, monitor) => {
      const offset = monitor.getClientOffset()
      if (offset) {
        const { x, y } = offset
        const canvasRect = document.getElementById("canvas-drop-target")?.getBoundingClientRect()
        if (canvasRect) {
          const left = x - canvasRect.left
          const top = y - canvasRect.top
          addBlock({ type: item.type, position: { left, top } })
        }
      }
    },
  }))

  const handleExecute = async () => {
    const actions = await executeWorkflow()
    setAiActions(actions)
    setShowActions(true)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow relative p-4">
        <div
          id="canvas-drop-target"
          ref={drop}
          className="w-32 h-32 border-4 border-dashed border-gray-300 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        >
          <span className="text-4xl text-gray-300">*</span>
        </div>
        {blocks.map((block) => (
          <Block
            key={block.id}
            {...block}
            updateConfig={(newConfig) => updateBlockConfig(block.id, newConfig)}
            onDelete={() => deleteBlock(block.id)}
          />
        ))}
        <div className="absolute bottom-4 right-4 space-x-2">
          <Button onClick={handleExecute}>Execute Workflow</Button>
          <Button onClick={undoDelete} disabled={!canUndo} variant="outline">
            <Undo2 className="w-4 h-4 mr-2" />
            Undo Delete
          </Button>
        </div>
      </div>
      <VisualFlow blocks={blocks} />
      {showActions && <AIActionDisplay actions={aiActions} />}
    </div>
  )
}

export default Canvas

