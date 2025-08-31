import { notFound } from "next/navigation"
import { SmartCard } from "@/src/components/smart-card"
import { getPersonData } from "@/src/lib/person-data"

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function CardPage({ params, searchParams }: PageProps) {
  const { id } = await params
  const search = await searchParams

  // Get person data by ID or hash
  const personData = getPersonData(id, search.h as string)

  if (!personData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <SmartCard person={personData} />
    </div>
  )
}

export async function generateStaticParams() {
  return [{ id: "alejandra" }, { id: "alejandro" }, { id: "luz" }]
}
