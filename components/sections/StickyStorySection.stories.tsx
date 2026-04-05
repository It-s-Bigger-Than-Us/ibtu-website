import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import StickyStorySection from './StickyStorySection'

const mockSlides = [
  {
    image: '/images/fire-relief/IMG_8047.jpg',
    alt: 'IBTU fire relief volunteers distributing supplies to families',
    label: 'Crisis Response',
    headline: 'We Were Already Here',
    body: 'When the Palisades and Eaton fires displaced thousands of families in January 2025, IBTU mobilized within 72 hours. This was not a campaign. This was a community that already had the relationships, the logistics, and the trust to move.',
    stat: '5,000+',
  },
  {
    image: '/images/school/IMG_5406.jpg',
    alt: 'IBTU school program lunchtime takeover with students',
    label: 'School Stability',
    headline: 'Inside 34 Schools Across LA',
    body: 'IBTU works inside schools to protect attendance, engagement, and opportunity. Lunchtime Takeovers, parent workshops, resource fairs, and staff appreciation days — because when families face instability, students feel it first.',
    stat: '28,025',
  },
  {
    image: '/images/additional/IMG_0418.jpg',
    alt: 'Community food distribution at IBTU event',
    label: 'Resource Access',
    headline: 'Designed With Dignity',
    body: 'Since 2020, IBTU has distributed 875,500+ pounds of food across 389+ events. Dental care, health screenings, wellness programming — all free, all dignified, all in the neighborhoods that need it most.',
    stat: '875,500+',
  },
]

const meta = {
  title: 'Sections/StickyStorySection',
  component: StickyStorySection,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'black' },
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#000' }}>
        <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#FFC700', fontFamily: 'sans-serif' }}>Scroll down to see the sticky story section</p>
        </div>
        <Story />
        <div style={{ height: '100vh' }} />
      </div>
    ),
  ],
} satisfies Meta<typeof StickyStorySection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    slides: mockSlides,
    sectionLabel: 'THE STORY',
  },
}

export const WithVideo: Story = {
  args: {
    slides: [
      {
        image: '/images/fire-relief/IMG_8047.jpg',
        alt: 'Fire relief footage',
        label: 'Phase 1',
        headline: 'Seventy-Two Hours',
        body: 'Within 72 hours, IBTU activated 1,800+ volunteers across 87+ locations.',
        type: 'image' as const,
      },
      ...mockSlides.slice(1),
    ],
    sectionLabel: 'OUR IMPACT',
  },
}
