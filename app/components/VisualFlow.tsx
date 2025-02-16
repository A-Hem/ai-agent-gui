import React from "react"
import { ArrowRight } from "lucide-react"

interface Block {
  id: string
  type: string
}

interface VisualFlowProps {
  blocks: Block[]
}

const VisualFlow: React.FC<VisualFlowProps> = ({ blocks }) => {
  return (
    <div className="bg-gray-100 p-4 overflow-x-auto">
      <div className="flex items-center space-x-2">
        {blocks.map((block, index) => (
          <React.Fragment key={block.id}>
            <div className="bg-white border border-gray-300 rounded px-3 py-2 text-sm">{block.type}</div>
            {index < blocks.length - 1 && <ArrowRight className="text-gray-400" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default VisualFlow

