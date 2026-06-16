import type { Metadata } from "next"
import { getProgramBySlug } from "@/sanity/lib/fetch"
import ProgramPageView from "@/components/programs/ProgramPageView"

const SLUG = "wellness"

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const program = await getProgramBySlug(SLUG)
  return {
    title: program ? `${program.title} | IBTU` : "Wellness & Health Activations | IBTU",
    description: program?.tagline,
    alternates: { canonical: "/wellness" },
  }
}

export default function WellnessPage() {
  return <ProgramPageView slug={SLUG} />
}
