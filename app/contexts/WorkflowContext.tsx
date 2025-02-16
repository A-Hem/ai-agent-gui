"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface Block {
  id: string
  type: string
  position: { left: number; top: number }
  config: Record<string, string>
}

interface DeletedBlock extends Block {
  index: number
}

interface WorkflowContextType {
  blocks: Block[]
  addBlock: (block: Omit<Block, "id" | "config">) => void
  updateBlockConfig: (id: string, config: Record<string, string>) => void
  deleteBlock: (id: string) => void
  undoDelete: () => void
  canUndo: boolean
  executeWorkflow: () => Promise<string[]>
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined)

export const useWorkflow = () => {
  const context = useContext(WorkflowContext)
  if (!context) {
    throw new Error("useWorkflow must be used within a WorkflowProvider")
  }
  return context
}

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [deletedBlocks, setDeletedBlocks] = useState<DeletedBlock[]>([])

  const addBlock = (block: Omit<Block, "id" | "config">) => {
    const id = `${block.type}-${Date.now()}`
    setBlocks((prevBlocks) => [...prevBlocks, { ...block, id, config: {} }])
  }

  const updateBlockConfig = (id: string, config: Record<string, string>) => {
    setBlocks((prevBlocks) => prevBlocks.map((block) => (block.id === id ? { ...block, config } : block)))
  }

  const deleteBlock = (id: string) => {
    setBlocks((prevBlocks) => {
      const index = prevBlocks.findIndex((block) => block.id === id)
      if (index !== -1) {
        const deletedBlock = prevBlocks[index]
        setDeletedBlocks((prev) => [...prev, { ...deletedBlock, index }])
        return prevBlocks.filter((block) => block.id !== id)
      }
      return prevBlocks
    })
  }

  const undoDelete = () => {
    if (deletedBlocks.length > 0) {
      const lastDeleted = deletedBlocks[deletedBlocks.length - 1]
      setBlocks((prevBlocks) => {
        const newBlocks = [...prevBlocks]
        newBlocks.splice(lastDeleted.index, 0, lastDeleted)
        return newBlocks
      })
      setDeletedBlocks((prev) => prev.slice(0, -1))
    }
  }

  const executeWorkflow = async (): Promise<string[]> => {
    const actionableSteps: string[] = []

    for (const block of blocks) {
      let prompt = `Execute the following action: ${block.type}`
      switch (block.type) {
        case "fileUpload":
          prompt += ` Upload the file from path: ${block.config.filePath}`
          break
        case "fileDownload":
          prompt += ` Download the file from URL: ${block.config.fileUrl} and save to: ${block.config.savePath}`
          break
        case "scrapePhone":
        case "scrapeEmail":
          prompt += ` Scrape ${block.type === "scrapePhone" ? "phone numbers" : "email addresses"} from URL: ${block.config.url}. Context: ${block.config.context}, Keywords: ${block.config.keywords}`
          break
        case "collectOrganizeData":
          prompt += ` Collect and organize data. Context: ${block.config.dataContext}, Output Format: ${block.config.outputFormat}, Output Path: ${block.config.outputPath}`
          break
        case "httpGet":
        case "httpPost":
        case "httpPut":
          prompt += ` Perform ${block.type} request to URL: ${block.config.url}, Headers: ${block.config.headers}${block.config.requestBody ? `, Body: ${block.config.requestBody}` : ""}`
          break
        case "customCode":
          prompt += ` Execute the following ${block.config.language} code: ${block.config.codeSnippet}`
          break
      }

      try {
        const { text } = await generateText({
          model: openai("gpt-4o"),
          prompt: prompt,
          system:
            "You are an AI agent capable of executing various tasks. Provide a detailed, step-by-step description of how you would execute the given action. Be specific and include any relevant details or considerations.",
        })
        actionableSteps.push(text)
      } catch (error) {
        console.error(`Error executing block ${block.id}:`, error)
        actionableSteps.push(`Error executing ${block.type}: ${error}`)
      }
    }

    return actionableSteps
  }

  return (
    <WorkflowContext.Provider
      value={{
        blocks,
        addBlock,
        updateBlockConfig,
        deleteBlock,
        undoDelete,
        canUndo: deletedBlocks.length > 0,
        executeWorkflow,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  )
}

