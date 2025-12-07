export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Remote"
  salary: string
  description: string
  requirements: string[]
  responsibilities: string[]
  postedDate: string
  department: string
  experience: string
}

export interface TestQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer?: number
}

export interface Application {
  id: string
  jobId: string
  jobTitle: string
  candidateName: string
  email: string
  phone: string
  resume: string
  coverLetter: string
  testScore?: number
  status: "pending" | "reviewing" | "interview" | "rejected" | "accepted"
  appliedDate: string
}
