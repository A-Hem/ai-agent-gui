"use client"

import { useDrag } from "react-dnd"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import CustomCodeEditor from "./CustomCodeEditor"
import { X } from "lucide-react"

interface BlockProps {
  type: string
  position: { left: number; top: number }
  config: Record<string, string>
  updateConfig: (newConfig: Record<string, string>) => void
  onDelete: () => void
}

const Block = ({ type, position, config, updateConfig, onDelete }: BlockProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "block",
    item: { type, position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const [localConfig, setLocalConfig] = useState(config)
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  const handleConfigChange = (key: string, value: string) => {
    const newConfig = { ...localConfig, [key]: value }
    setLocalConfig(newConfig)
    updateConfig(newConfig)
  }

  const openEditor = () => setIsEditorOpen(true)
  const closeEditor = () => setIsEditorOpen(false)

  return (
    <>
      <Card
        ref={drag}
        style={{
          position: "absolute",
          left: position.left,
          top: position.top,
          opacity: isDragging ? 0.5 : 1,
        }}
        className="w-64 cursor-move"
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{type}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {type === "fileUpload" && (
            <div className="space-y-2">
              <Label htmlFor="filePath">File Path</Label>
              <Input
                id="filePath"
                value={localConfig.filePath || ""}
                onChange={(e) => handleConfigChange("filePath", e.target.value)}
                placeholder="Enter file path"
              />
            </div>
          )}
          {type === "fileDownload" && (
            <div className="space-y-2">
              <Label htmlFor="fileUrl">File URL</Label>
              <Input
                id="fileUrl"
                value={localConfig.fileUrl || ""}
                onChange={(e) => handleConfigChange("fileUrl", e.target.value)}
                placeholder="Enter file URL"
              />
              <Label htmlFor="savePath">Save Path</Label>
              <Input
                id="savePath"
                value={localConfig.savePath || ""}
                onChange={(e) => handleConfigChange("savePath", e.target.value)}
                placeholder="Enter save path"
              />
            </div>
          )}
          {(type === "scrapePhone" || type === "scrapeEmail") && (
            <div className="space-y-2">
              <Label htmlFor="url">URL to Scrape</Label>
              <Input
                id="url"
                value={localConfig.url || ""}
                onChange={(e) => handleConfigChange("url", e.target.value)}
                placeholder="Enter URL to scrape"
              />
              <Label htmlFor="context">Context</Label>
              <Textarea
                id="context"
                value={localConfig.context || ""}
                onChange={(e) => handleConfigChange("context", e.target.value)}
                placeholder="Enter context for scraping"
              />
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Input
                id="keywords"
                value={localConfig.keywords || ""}
                onChange={(e) => handleConfigChange("keywords", e.target.value)}
                placeholder="Enter keywords"
              />
            </div>
          )}
          {type === "collectOrganizeData" && (
            <div className="space-y-2">
              <Label htmlFor="dataContext">Data Context</Label>
              <Textarea
                id="dataContext"
                value={localConfig.dataContext || ""}
                onChange={(e) => handleConfigChange("dataContext", e.target.value)}
                placeholder="Describe how the data should be collected and organized"
              />
              <Label htmlFor="outputFormat">Output Format</Label>
              <Select
                onValueChange={(value) => handleConfigChange("outputFormat", value)}
                defaultValue={localConfig.outputFormat || "csv"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select output format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                </SelectContent>
              </Select>
              <Label htmlFor="outputPath">Output Path</Label>
              <Input
                id="outputPath"
                value={localConfig.outputPath || ""}
                onChange={(e) => handleConfigChange("outputPath", e.target.value)}
                placeholder="Enter output file path"
              />
            </div>
          )}
          {(type === "httpGet" || type === "httpPost" || type === "httpPut") && (
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={localConfig.url || ""}
                onChange={(e) => handleConfigChange("url", e.target.value)}
                placeholder="Enter URL"
              />
              {(type === "httpPost" || type === "httpPut") && (
                <>
                  <Label htmlFor="requestBody">Request Body (JSON)</Label>
                  <Textarea
                    id="requestBody"
                    value={localConfig.requestBody || ""}
                    onChange={(e) => handleConfigChange("requestBody", e.target.value)}
                    placeholder="Enter request body in JSON format"
                  />
                </>
              )}
              <Label htmlFor="headers">Headers (JSON)</Label>
              <Textarea
                id="headers"
                value={localConfig.headers || ""}
                onChange={(e) => handleConfigChange("headers", e.target.value)}
                placeholder="Enter headers in JSON format"
              />
            </div>
          )}
          {type === "pythonCode" && (
            <div className="space-y-2">
              <Label htmlFor="pythonCode">Python Code</Label>
              <Textarea
                id="pythonCode"
                value={localConfig.pythonCode || ""}
                onChange={(e) => handleConfigChange("pythonCode", e.target.value)}
                placeholder="Enter Python code"
                rows={10}
              />
            </div>
          )}
          {type === "customCode" && (
            <div className="space-y-2">
              <Button onClick={openEditor}>Open Code Editor</Button>
              <div>
                <Label>Selected Language: {localConfig.language || "None"}</Label>
              </div>
              <div>
                <Label>Code Snippet: {localConfig.codeSnippet ? "Set" : "Not set"}</Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {isEditorOpen && (
        <CustomCodeEditor
          initialCode={localConfig.codeSnippet || ""}
          initialLanguage={localConfig.language || "javascript"}
          onSave={(language, code) => {
            handleConfigChange("language", language)
            handleConfigChange("codeSnippet", code)
            closeEditor()
          }}
          onClose={closeEditor}
        />
      )}
    </>
  )
}

export default Block

