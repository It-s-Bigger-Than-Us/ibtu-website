import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import HomePageClient from './HomePageClient'

const meta = {
  title: 'Sections/HomePageClient',
  component: HomePageClient,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HomePageClient>

export default meta
type Story = StoryObj<typeof meta>

const mockProgramCards = [
  { slug: 'fire-relief', title: 'Fire Relief & The Hub', pillar: 'Crisis & Disaster Stabilization', heroImage: '/images/fire-relief/IMG_8047.jpg' },
  { slug: 'back-2-school', title: 'Back 2 School Festival', pillar: 'Community Health & Resource Access', heroImage: '/images/b2s/2V8A1776.jpg' },
  { slug: 'youth-programming', title: 'School Program', pillar: 'School & Youth Stability', heroImage: '/images/school/IMG_5406.jpg' },
  { slug: 'coastal-care', title: 'Coastal Care', pillar: 'Community Health & Resource Access', heroImage: '/images/coastal/IMG_4953.jpg' },
  { slug: 'wellness', title: 'Wellness & Health Activations', pillar: 'Community Health & Resource Access', heroImage: '/images/wellness/IMG_1614.jpg' },
]

const mockStats = [
  { value: 62475, suffix: '+', label: 'Students Served' },
  { value: 875500, suffix: '+', label: 'Lbs Food Distributed' },
  { value: 34, label: 'School Sites' },
  { value: 7500, suffix: '+', label: 'Volunteers' },
  { value: 300, suffix: '+', label: 'Partners' },
  { value: 5000, suffix: '+', label: 'Families Stabilized' },
]

const mockTickerPhrases = [
  'Community is the Infrastructure',
  'Designed with Dignity',
  'We Listen. We Build. We Stay.',
  'Resilience',
  'Access',
  'Equity',
  'Stability',
  'Trust',
]

export const Default: Story = {
  args: {
    programCards: mockProgramCards,
    missionMedia: [],
    stats: mockStats,
    tickerPhrases: mockTickerPhrases,
  },
}
