import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, DollarSign, Briefcase, Building2 } from "lucide-react"
import { mockJobs } from "@/lib/mock-data"

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const job = mockJobs.find((j) => j.id === id)

  if (!job) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{job.type}</Badge>
              <Badge variant="outline">{job.department}</Badge>
            </div>
            <CardTitle className="text-3xl mb-2">{job.title}</CardTitle>
            <CardDescription className="text-lg font-medium text-foreground">{job.company}</CardDescription>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-5 w-5 flex-shrink-0" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-5 w-5 flex-shrink-0" />
                <span>{job.experience}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-5 w-5 flex-shrink-0" />
                <span>{job.department} Department</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Separator />

            <div>
              <h3 className="text-xl font-semibold mb-3">About the Role</h3>
              <p className="text-muted-foreground leading-relaxed">{job.description}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-xl font-semibold mb-3">Key Responsibilities</h3>
              <ul className="space-y-2">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span className="text-muted-foreground">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="text-xl font-semibold mb-3">Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span className="text-muted-foreground">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="flex-1" asChild>
                <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="flex-1 bg-transparent" asChild>
                <Link href={`/jobs/${job.id}/test`}>Take Skills Test</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
