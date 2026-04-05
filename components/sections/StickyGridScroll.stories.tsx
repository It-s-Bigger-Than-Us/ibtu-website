import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import StickyGridScroll from './StickyGridScroll'

const mockImages = [
  '/images/fire-relief/IMG_8047.jpg',
  '/images/b2s/_D5A5792.jpg',
  '/images/school/IMG_5406.jpg',
  '/images/coastal/IMG_4920.jpg',
  '/images/fire-relief/IMG_5909.jpg',
  '/images/fire-relief/IMG_9804.jpg',
  '/images/additional/IMG_0339.jpg',
  '/images/additional/IMG_0418.jpg',
  '/images/school/IMG_5382.jpg',
  '/images/school/IMG_6057.jpg',
  '/images/b2s/6D5A0503.jpg',
  '/images/additional/IMG_5680.jpg',
]

const meta = {
  title: 'Sections/StickyGridScroll',
  component: StickyGridScroll,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'black' },
  },
} satisfies Meta<typeof StickyGridScroll>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    images: mockImages,
    headline: 'Community Is The Infrastructure',
    subheadline: 'Since 2020, IBTU has served 62,475+ students, distributed 875,500+ pounds of food, and mobilized 7,500+ volunteers across Los Angeles.',
    ctaText: 'Get Involved',
    ctaHref: '/get-involved',
  },
}
