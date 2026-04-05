import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ProgramPageClient from './ProgramPageClient'
import type { ProgramContent } from '@/lib/data/program-content'

const mockProgram: ProgramContent = {
  slug: 'fire-relief',
  heroTitle: 'WHEN THE FIRES HIT, IBTU WAS ALREADY HERE.',
  pillar: 'Crisis & Disaster Stabilization',
  tagline: 'Within 72 hours we mobilized. Within 90 days we built permanent infrastructure. We are still here — and we are not leaving.',
  overview: 'When the Palisades and Eaton fires displaced thousands of families in January 2025, IBTU transformed from a community programming organization into a fully operational disaster response hub. Over three phases IBTU has stabilized 5,000+ families, delivered 7,581 assistance instances to 324 active clients, and built a Relief Resource Hub that fire-impacted community members return to an average of 23.4 times. This is not temporary aid. This is community infrastructure, designed with dignity and built to last.',
  overviewHighlights: [
    'stabilized 5,000+ families',
    '7,581 assistance instances to 324 active clients',
    'designed with dignity and built to last',
  ],
  stats: [
    { value: '5,000+', label: 'Families Stabilized' },
    { value: '7,581', label: 'Assistance Instances' },
    { value: '324', label: 'Active Hub Clients' },
    { value: '23.4', label: 'Avg Visits Per Client' },
    { value: '90+', label: 'Zip Codes Served' },
    { value: '1,800+', label: 'Phase 1 Volunteers' },
  ],
  sections: [
    {
      heading: 'Seventy-Two Hours Changed Everything',
      body: 'On January 7, 2025, the fires started. By January 10, IBTU had activated 1,800+ volunteers, opened supply staging at Baldwin Hills Crenshaw Plaza, and begun delivering essential goods to displaced families across Los Angeles.',
      image: '/images/fire-relief/IMG_8047.jpg',
      imageAlt: 'IBTU volunteers distributing supplies to fire-impacted families',
      imagePosition: 'left',
      highlights: ['1,800+ volunteers'],
    },
    {
      heading: 'The Hub Was Built In 90 Days',
      body: 'Phase 2 converted emergency response into permanent infrastructure. The Relief Resource Hub at Baldwin Hills Crenshaw Plaza opened five days a week with housing navigation, mental health counseling, dental care, and food assistance.',
      image: '/images/fire-relief/IMG_5909.jpg',
      imageAlt: 'Relief Resource Hub interior with community members receiving services',
      imagePosition: 'right',
      highlights: ['permanent infrastructure'],
    },
  ],
  whoWeServe: [
    'Fire-displaced families across 90+ zip codes',
    'Community members needing housing navigation',
    'Individuals seeking mental health support',
    'Families requiring food assistance and dental care',
  ],
  images: [
    '/images/fire-relief/IMG_8047.jpg',
    '/images/fire-relief/IMG_5909.jpg',
    '/images/fire-relief/IMG_9804.jpg',
    '/images/additional/IMG_0339.jpg',
  ],
  volunteerUrl: 'https://volunteer.bloomerang.co/JE/7haetjfrq5g190',
  donateUrl: 'https://secure.qgiv.com/for/ibt/',
  ctaText: 'Support the Hub',
  ctaBody: 'The Relief Resource Hub serves hundreds of families every week. Your support keeps the doors open and the services running.',
}

const meta = {
  title: 'Sections/ProgramPageClient',
  component: ProgramPageClient,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'black' },
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgramPageClient>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    program: mockProgram,
    heroImageUrl: '/images/fire-relief/IMG_8047.jpg',
    pastEvents: [
      {
        _id: 'evt-1',
        title: 'Together We Rebuild',
        year: 2025,
        dateStart: '2025-02-01',
        location: 'Baldwin Hills Crenshaw Plaza',
        shortDescription: 'Community rebuilding event for fire-impacted families.',
        proofStats: '2,500+ attendees',
      },
    ],
  },
}

export const NoPastEvents: Story = {
  args: {
    program: mockProgram,
    heroImageUrl: '/images/fire-relief/IMG_8047.jpg',
    pastEvents: [],
  },
}
