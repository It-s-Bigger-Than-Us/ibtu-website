import type { Metadata } from "next"
import { getPrograms, getProgramBySlug } from "@/sanity/lib/fetch"
import ProgramPageView from "@/components/programs/ProgramPageView"
import { programHref } from "@/lib/data/program-routes"

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const programs = await getPrograms()
  return programs.map((p: { slug: string }) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const program = await getProgramBySlug(slug)
  if (!program) return {}
  return {
    title: `${program.title} | IBTU`,
    description: program.tagline,
    // Canonical points at the short URL when one exists (these long paths 301-redirect to it).
    alternates: { canonical: programHref(slug) },
  }
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params
  return <ProgramPageView slug={slug} />
}
