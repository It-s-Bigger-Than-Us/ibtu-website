import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import EventGallery from './EventGallery'

const meta = {
  title: 'Sections/EventGallery',
  component: EventGallery,
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
} satisfies Meta<typeof EventGallery>

export default meta
type Story = StoryObj<typeof meta>

const mockEvents = [
  {
    _id: 'ev-1',
    title: 'Back 2 School Festival 2024',
    year: 2024,
    dateStart: 'August 3, 2024',
    location: 'Baldwin Hills Crenshaw Plaza',
    shortDescription: 'Annual backpack and supply giveaway serving thousands of students across Los Angeles.',
    proofStats: '5,000 backpacks distributed, 8,000+ attendees',
  },
  {
    _id: 'ev-2',
    title: 'Coastal Care Cleanup',
    year: 2024,
    dateStart: 'June 15, 2024',
    location: 'Venice Beach, CA',
    shortDescription: 'Community-led beach cleanup restoring coastline health and access.',
    proofStats: '2,400 lbs of trash removed',
  },
  {
    _id: 'ev-3',
    title: 'Fire Relief Hub Launch',
    year: 2025,
    dateStart: 'January 12, 2025',
    location: 'Los Angeles, CA',
    shortDescription: 'Emergency resource distribution hub activated within 48 hours of the LA fires.',
    proofStats: '5,000+ families stabilized',
  },
  {
    _id: 'ev-4',
    title: 'Wellness Activation',
    year: 2024,
    dateStart: 'October 5, 2024',
    location: 'Baldwin Hills Crenshaw Plaza',
    proofStats: '300+ health screenings provided',
  },
]

export const Default: Story = {
  args: {
    events: mockEvents,
  },
}

export const SingleEvent: Story = {
  args: {
    events: [mockEvents[0]],
  },
}
