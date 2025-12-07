"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { mockJobs, mockTestQuestions } from "@/lib/mock-data"

const TestClient = ({ job, questions }) => {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswer = (questionId: string, answerIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    let correctAnswers = 0
    questions.forEach((q) => {
      if (q.correctAnswer !== undefined && answers[q.id] === q.correctAnswer) {
        correctAnswers++
      }
    })
    const finalScore = Math.round((correctAnswers / questions.length) * 100)
    setScore(finalScore)
    setIsComplete(true)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentQ = questions[currentQuestion]

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-lg w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Test Complete!</CardTitle>
            <CardDescription>You've completed the skills assessment for {job.title}</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">{score}%</div>
              <p className="text-muted-foreground">Your Score</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Your test results will be included with your application. You can now proceed to apply for this position.
            </p>
            <div className="flex flex-col gap-3">
              <Button size="lg" asChild>
                <Link href={`/jobs/${job.id}/apply`}>Continue to Application</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={`/jobs/${job.id}`}>Back to Job Details</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link href={`/jobs/${job.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Job Details
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Skills Assessment</CardTitle>
            <CardDescription className="text-base">
              {job.title} - Question {currentQuestion + 1} of {questions.length}
            </CardDescription>
            <Progress value={progress} className="mt-4" />
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
              <RadioGroup
                value={answers[currentQ.id]?.toString()}
                onValueChange={(value) => handleAnswer(currentQ.id, Number.parseInt(value))}
              >
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent transition-colors"
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-normal">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                Previous
              </Button>
              {currentQuestion === questions.length - 1 ? (
                <Button onClick={handleSubmit} disabled={answers[currentQ.id] === undefined}>
                  Submit Test
                </Button>
              ) : (
                <Button onClick={handleNext} disabled={answers[currentQ.id] === undefined}>
                  Next Question
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default async function TestPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const job = mockJobs.find((j) => j.id === id)
  const questions = mockTestQuestions[id] || []

  if (!job || questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>No Test Available</CardTitle>
            <CardDescription>There is no skills test available for this position.</CardDescription>
          </CardHeader>
          <div className="px-6 pb-6">
            <Button asChild>
              <Link href={`/jobs/${id}`}>Back to Job Details</Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return <TestClient job={job} questions={questions} />
}
