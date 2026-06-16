import type { Metadata } from "next"
import { getProgramBySlug } from "@/sanity/lib/fetch"
import ProgramPageView from "@/components/programs/ProgramPageView"

const SLUG = "coastal-care"

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const program = await getProgramBySlug(SLUG)
  return {
    title: program ? `${program.title} | IBTU` : "Coastal Care | IBTU",
    description: program?.tagline,
    alternates: { canonical: "/coastal" },
  }
}

export default function CoastalPage() {
  return <ProgramPageView slug={SLUG} />
}
