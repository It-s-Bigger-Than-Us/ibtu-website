import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import EventGallery3D from './EventGallery3D'

const meta = {
  title: 'Sections/EventGallery3D',
  component: EventGallery3D,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'black' },
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', minHeight: '100vh', padding: '80px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EventGallery3D>

export default meta
type Story = StoryObj<typeof meta>

const mockEvents = [
  {
    _id: 'ev3d-1',
    title: 'Back 2 School Festival 2024',
    year: 2024,
    dateStart: 'August 3, 2024',
    location: 'Baldwin Hills Crenshaw Plaza',
    shortDescription: 'Annual backpack and supply giveaway serving thousands of students across Los Angeles.',
    proofStats: '5,000 backpacks distributed',
  },
  {
    _id: 'ev3d-2',
    title: 'Coastal Care Venice',
    year: 2024,
    dateStart: 'June 15, 2024',
    location: 'Venice Beach, CA',
    proofStats: '2,400 lbs trash removed',
  },
  {
    _id: 'ev3d-3',
    title: 'Fire Relief Hub',
    year: 2025,
    dateStart: 'January 12, 2025',
    location: 'Los Angeles, CA',
    proofStats: '5,000+ families stabilized',
  },
  {
    _id: 'ev3d-4',
    title: 'Wellness Activation',
    year: 2024,
    dateStart: 'October 5, 2024',
    location: 'Baldwin Hills Crenshaw Plaza',
  },
  {
    _id: 'ev3d-5',
    title: 'Community Builder Link Up',
    year: 2024,
    dateStart: 'March 22, 2024',
    location: 'Los Angeles, CA',
    proofStats: '300+ partners connected',
  },
  {
    _id: 'ev3d-6',
    title: 'Giving Season 2024',
    year: 2024,
    dateStart: 'December 1, 2024',
    location: 'Los Angeles, CA',
  },
]

export const Default: Story = {
  args: {
    events: mockEvents,
  },
}

export const ManyEvents: Story = {
  args: {
    events: [
      ...mockEvents,
      { _id: 'ev3d-7', title: 'School Program Kickoff', year: 2023, location: 'Los Angeles, CA' },
      { _id: 'ev3d-8', title: 'Backpack Drive', year: 2023, location: 'Baldwin Hills Crenshaw Plaza' },
      { _id: 'ev3d-9', title: 'Holiday Giveaway', year: 2023, dateStart: 'December 20, 2023', location: 'Los Angeles, CA' },
    ],
  },
}
