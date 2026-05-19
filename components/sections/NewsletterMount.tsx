'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const NewsletterSignup = dynamic(
  () => import('@/components/sections/NewsletterSignup'),
  { ssr: false },
)

export default function NewsletterMount() {
  const pathname = usePathname()
  if (pathname?.startsWith('/studio')) return null
  return <NewsletterSignup />
}
