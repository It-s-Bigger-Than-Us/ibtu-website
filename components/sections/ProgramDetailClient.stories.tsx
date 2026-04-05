import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ProgramDetailClient from './ProgramDetailClient'

const mockSlides = [
  {
    image: '/images/fire-relief/IMG_8047.jpg',
    alt: 'IBTU fire relief volunteers distributing supplies',
    label: 'Phase 1',
    headline: 'Seventy-Two Hours Changed Everything',
    body: 'When the fires hit, IBTU mobilized within 72 hours. 1,800+ volunteers activated across 87+ locations delivering essential goods to displaced families.',
    stat: '5,000+',
  },
  {
    image: '/images/fire-relief/IMG_5909.jpg',
    alt: 'Relief Resource Hub at Baldwin Hills Crenshaw Plaza',
    label: 'Phase 2',
    headline: 'We Built Permanent Infrastructure',
    body: 'Within 90 days IBTU built a permanent Relief Resource Hub at Baldwin Hills Crenshaw Plaza serving 324 active clients with an average of 23.4 visits per person.',
    stat: '7,581',
  },
  {
    image: '/images/fire-relief/IMG_9804.jpg',
    alt: 'Community members receiving resources at the Hub',
    label: 'Phase 3',
    headline: 'We Are Still Here',
    body: 'The Hub is converting into an all-crisis community center. Housing navigation, mental health counseling, dental care, and food assistance — all under one roof.',
  },
]

const mockGalleryImages = [
  { src: '/images/fire-relief/IMG_8047.jpg', alt: 'Fire relief distribution' },
  { src: '/images/fire-relief/IMG_5909.jpg', alt: 'Hub operations' },
  { src: '/images/fire-relief/IMG_9804.jpg', alt: 'Volunteer coordination' },
  { src: '/images/additional/IMG_0339.jpg', alt: 'Community support' },
]

const mockPastEvents = [
  {
    _id: 'evt-1',
    title: 'Together We Rebuild',
    year: 2025,
    dateStart: '2025-02-01',
    location: 'Baldwin Hills Crenshaw Plaza',
    shortDescription: 'Community rebuilding event for fire-impacted families.',
    proofStats: '2,500+ attendees',
  },
]

const meta = {
  title: 'Sections/ProgramDetailClient',
  component: ProgramDetailClient,
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
} satisfies Meta<typeof ProgramDetailClient>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    slides: mockSlides,
    galleryImages: mockGalleryImages,
    pastEvents: mockPastEvents,
    fieldImages: [
      '/images/fire-relief/IMG_8047.jpg',
      '/images/fire-relief/IMG_5909.jpg',
      '/images/fire-relief/IMG_9804.jpg',
    ],
    programTitle: 'Fire Relief & The Hub',
  },
}

export const MinimalSlides: Story = {
  args: {
    slides: [mockSlides[0]],
    galleryImages: [],
    pastEvents: [],
  },
}
