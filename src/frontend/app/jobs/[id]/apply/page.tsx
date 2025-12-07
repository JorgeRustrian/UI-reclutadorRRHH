import { notFound } from "next/navigation"
import { mockJobs } from "@/lib/mock-data"
import ApplyClient from "./apply-client"

export default async function ApplyPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const job = mockJobs.find((j) => j.id === id)

  if (!job) {
    notFound()
  }

  return <ApplyClient job={job} />
}
