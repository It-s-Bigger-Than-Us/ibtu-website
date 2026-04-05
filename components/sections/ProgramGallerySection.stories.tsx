import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ProgramGallerySection from './ProgramGallerySection'

const mockPrograms = [
  {
    slug: 'fire-relief',
    title: 'Fire Relief & The Hub',
    pillar: 'Crisis & Disaster Stabilization',
    tagline: 'When the fires hit, IBTU was already here. Within 72 hours we mobilized. Within 90 days we built permanent infrastructure.',
    cardStat: '324 active clients',
    heroImage: '/images/fire-relief/IMG_8047.jpg',
    galleryImages: [
      '/images/fire-relief/IMG_5909.jpg',
      '/images/fire-relief/IMG_9804.jpg',
      '/images/additional/IMG_0339.jpg',
    ],
  },
  {
    slug: 'back-2-school',
    title: 'Back 2 School Festival',
    pillar: 'Community Health & Resource Access',
    tagline: 'Every year, IBTU transforms community spaces into school-readiness hubs where thousands of families access backpacks and resources.',
    cardStat: '22,550+ backpacks',
    heroImage: '/images/b2s/_D5A5792.jpg',
    galleryImages: [
      '/images/b2s/6D5A0503.jpg',
      '/images/b2s/6D5A0617.jpg',
    ],
  },
  {
    slug: 'youth-programming',
    title: 'School Program',
    pillar: 'School & Youth Stability',
    tagline: 'When families face instability, students feel it first. IBTU works inside schools to protect attendance, engagement, and opportunity.',
    cardStat: '28,025 students',
    heroImage: '/images/school/IMG_5406.jpg',
    galleryImages: [
      '/images/school/IMG_5629.jpg',
      '/images/school/IMG_5893.jpg',
      '/images/school/IMG_5382.jpg',
    ],
  },
  {
    slug: 'coastal-care',
    title: 'Coastal Care',
    pillar: 'Community Health & Resource Access',
    tagline: 'Community infrastructure includes the natural environment. We show up for the beach with the same rigor we bring to schools and food access.',
    cardStat: 'Monthly clean-ups',
    heroImage: '/images/coastal/IMG_4920.jpg',
    galleryImages: [
      '/images/coastal/IMG_1603.jpg',
      '/images/coastal/IMG_4926.jpg',
    ],
  },
]

const meta = {
  title: 'Sections/ProgramGallerySection',
  component: ProgramGallerySection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ProgramGallerySection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    programs: mockPrograms,
  },
}
