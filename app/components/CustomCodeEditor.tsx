"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface CustomCodeEditorProps {
  initialCode: string
  initialLanguage: string
  onSave: (language: string, code: string) => void
  onClose: () => void
}

const languages = ["javascript", "python", "html", "react", "go"]

const codeSnippets = {
  "Search Government Website": `
// JavaScript example
async function searchGovernmentWebsite(query) {
  const response = await fetch(\`https://www.usa.gov/search?query=\${encodeURIComponent(query)}\`);
  const html = await response.text();
  // Process the HTML to extract search results
  // ...
}
  `,
  "Scrape Emails": `
# Python example
import re
import requests

def scrape_emails(url):
    response = requests.get(url)
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    emails = re.findall(email_pattern, response.text)
    return emails
  `,
  "Close Webpage": `
// JavaScript example for browser automation
function closeWebpage(url) {
  // This is a simplified example. In practice, you'd need to use a browser automation tool like Puppeteer
  console.log(\`Closing webpage: \${url}\`);
}
  `,
  "Find New URL": `
// JavaScript example
async function findNewURL(searchQuery, previousURLs) {
  const response = await fetch(\`https://api.example.com/search?q=\${encodeURIComponent(searchQuery)}\`);
  const results = await response.json();
  const newURL = results.find(result => !previousURLs.includes(result.url));
  return newURL ? newURL.url : null;
}
  `,
}

const CustomCodeEditor: React.FC<CustomCodeEditorProps> = ({ initialCode, initialLanguage, onSave, onClose }) => {
  const [code, setCode] = useState(initialCode)
  const [language, setLanguage] = useState(initialLanguage)

  const handleSnippetSelect = (snippet: string) => {
    setCode(codeSnippets[snippet] || "")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 h-3/4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Custom Code Editor</h2>
        <div className="flex space-x-4 mb-4">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleSnippetSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select Snippet" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(codeSnippets).map((snippet) => (
                <SelectItem key={snippet} value={snippet}>
                  {snippet}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-grow font-mono"
          placeholder="Enter your code here..."
        />
        <div className="flex justify-end space-x-4 mt-4">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={() => onSave(language, code)}>Save</Button>
        </div>
      </div>
    </div>
  )
}

export default CustomCodeEditor

