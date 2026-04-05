import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ProgramsGrid from './ProgramsGrid'

const mockPrograms = [
  {
    slug: 'fire-relief',
    title: 'Fire Relief & The Hub',
    pillar: 'Crisis & Disaster Stabilization',
    heroImage: '/images/fire-relief/IMG_8047.jpg',
    cardStat: '324 active clients',
    description: 'Community-led disaster response and permanent relief infrastructure at Baldwin Hills Crenshaw Plaza.',
  },
  {
    slug: 'back-2-school',
    title: 'Back 2 School Festival',
    pillar: 'Community Health & Resource Access',
    heroImage: '/images/b2s/_D5A5792.jpg',
    cardStat: '22,550+ backpacks',
    description: 'Annual multi-city activation distributing backpacks and partner services to thousands of families.',
  },
  {
    slug: 'youth-programming',
    title: 'School Program',
    pillar: 'School & Youth Stability',
    heroImage: '/images/school/IMG_5406.jpg',
    cardStat: '28,025 students',
    description: 'Year-round school-based programs across 34 Los Angeles sites serving 28,025 students in 2025.',
  },
  {
    slug: 'coastal-care',
    title: 'Coastal Care',
    pillar: 'Community Health & Resource Access',
    heroImage: '/images/coastal/IMG_4920.jpg',
    cardStat: 'Monthly clean-ups',
    description: 'Monthly environmental stewardship at Venice Beach with data-driven debris tracking.',
  },
]

const meta = {
  title: 'Sections/ProgramsGrid',
  component: ProgramsGrid,
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
} satisfies Meta<typeof ProgramsGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    programs: mockPrograms,
  },
}
