import type { Metadata } from "next"
import { getProgramBySlug } from "@/sanity/lib/fetch"
import ProgramPageView from "@/components/programs/ProgramPageView"

const SLUG = "community-health"

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const program = await getProgramBySlug(SLUG)
  return {
    title: program ? `${program.title} | IBTU` : "Food & Resource Distribution | IBTU",
    description: program?.tagline,
    alternates: { canonical: "/food" },
  }
}

export default function FoodPage() {
  return <ProgramPageView slug={SLUG} />
}
