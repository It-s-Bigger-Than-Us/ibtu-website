import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ProgramCarousel3D from './ProgramCarousel3D'

const mockPrograms = [
  {
    slug: 'fire-relief',
    title: 'Fire Relief & The Hub',
    pillar: 'Crisis & Disaster Stabilization',
    heroImage: '/images/fire-relief/IMG_8047.jpg',
    description: 'Community-led disaster response and permanent relief infrastructure.',
  },
  {
    slug: 'back-2-school',
    title: 'Back 2 School Festival',
    pillar: 'Community Health & Resource Access',
    heroImage: '/images/b2s/_D5A5792.jpg',
    description: 'Annual multi-city activation distributing backpacks and resources.',
  },
  {
    slug: 'youth-programming',
    title: 'School Program',
    pillar: 'School & Youth Stability',
    heroImage: '/images/school/IMG_5406.jpg',
    description: 'Year-round school-based programs across 34 Los Angeles sites.',
  },
  {
    slug: 'coastal-care',
    title: 'Coastal Care',
    pillar: 'Community Health & Resource Access',
    heroImage: '/images/coastal/IMG_4920.jpg',
    description: 'Monthly environmental stewardship at Venice Beach.',
  },
]

const meta = {
  title: 'Sections/ProgramCarousel3D',
  component: ProgramCarousel3D,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ProgramCarousel3D>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    programs: mockPrograms,
  },
}
