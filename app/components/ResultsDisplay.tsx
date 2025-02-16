import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const ResultsDisplay = ({ results }: { results: string }) => {
  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="whitespace-pre-wrap">{results}</pre>
      </CardContent>
    </Card>
  )
}

export default ResultsDisplay

