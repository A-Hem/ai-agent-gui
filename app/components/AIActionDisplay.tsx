import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AIActionDisplayProps {
  actions: string[]
}

const AIActionDisplay: React.FC<AIActionDisplayProps> = ({ actions }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <Card className="w-3/4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>AI Agent Actions</CardTitle>
        </CardHeader>
        <CardContent>
          {actions.map((action, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Step {index + 1}</h3>
              <p className="whitespace-pre-wrap">{action}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default AIActionDisplay

