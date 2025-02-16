"use client"

import { useState } from "react"

import type React from "react"

import { useDrag } from "react-dnd"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const blockTypes = [
  { type: "webElement", label: "Web Element" },
  { type: "search", label: "Search" },
  { type: "urlProcess", label: "URL Process" },
  { type: "fileUpload", label: "File Upload" },
  { type: "fileDownload", label: "File Download" },
  { type: "scrapePhone", label: "Scrape Phone Numbers" },
  { type: "scrapeEmail", label: "Scrape Email Addresses" },
  { type: "collectOrganizeData", label: "Collect + Organize Data" },
  { type: "httpGet", label: "HTTP GET" },
  { type: "httpPost", label: "HTTP POST" },
  { type: "httpPut", label: "HTTP PUT" },
  { type: "customCode", label: "Custom Code" },
]

interface DraggableBlockProps {
  type: string
  label: string
  onDelete: () => void
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({ type, label, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "block",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div ref={drag} className="relative mb-2" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Button className="w-full pr-8">{label}</Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full"
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

const Sidebar = () => {
  const [blocks, setBlocks] = useState(blockTypes)

  const deleteBlock = (index: number) => {
    setBlocks((prevBlocks) => prevBlocks.filter((_, i) => i !== index))
  }

  return (
    <div className="w-64 bg-white p-4 shadow-md overflow-y-auto h-screen">
      <h2 className="text-lg font-semibold mb-4">Available Blocks</h2>
      <div className="space-y-2">
        {blocks.map((block, index) => (
          <DraggableBlock
            key={`${block.type}-${index}`}
            type={block.type}
            label={block.label}
            onDelete={() => deleteBlock(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Sidebar

