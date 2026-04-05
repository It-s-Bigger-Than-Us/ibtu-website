import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import EventsPageClient from './EventsPageClient'

const meta = {
  title: 'Sections/EventsPageClient',
  component: EventsPageClient,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'black' },
  },
} satisfies Meta<typeof EventsPageClient>

export default meta
type Story = StoryObj<typeof meta>

const mockPrograms = [
  { slug: 'back-2-school', title: 'Back 2 School Festival' },
  { slug: 'coastal-care', title: 'Coastal Care' },
  { slug: 'fire-relief', title: 'Fire Relief & The Hub' },
]

const mockUpcoming = [
  {
    title: 'Mother\'s Day 5K Run',
    status: 'Upcoming',
    programSlug: 'back-2-school',
    location: 'Los Angeles, CA',
    dateStart: 'May 9, 2026',
    proofStats: '',
  },
  {
    title: 'Back 2 School Festival 2026',
    status: 'Upcoming',
    programSlug: 'back-2-school',
    location: 'Baldwin Hills Crenshaw Plaza',
    dateStart: 'August 1, 2026',
    proofStats: '',
  },
]

const mockAllByProgram = [
  {
    program: mockPrograms[0],
    events: [
      { title: 'Back 2 School Festival 2024', status: 'Closed', location: 'Baldwin Hills Crenshaw Plaza', dateStart: 'Aug 3, 2024', proofStats: '5,000 backpacks' },
      { title: 'Back 2 School Festival 2023', status: 'Closed', location: 'Baldwin Hills Crenshaw Plaza', dateStart: 'Aug 5, 2023', proofStats: '4,000 backpacks' },
    ],
  },
  {
    program: mockPrograms[1],
    events: [
      { title: 'Venice Beach Cleanup', status: 'Closed', location: 'Venice Beach, CA', dateStart: 'Jun 15, 2024', proofStats: '2,400 lbs removed' },
    ],
  },
  {
    program: mockPrograms[2],
    events: [
      { title: 'Fire Relief Hub Launch', status: 'Active', location: 'Los Angeles, CA', dateStart: 'Jan 12, 2025', proofStats: '5,000+ families' },
    ],
  },
]

export const Default: Story = {
  args: {
    events: [...mockUpcoming, ...mockAllByProgram.flatMap((g) => g.events)],
    upcoming: mockUpcoming,
    programs: mockPrograms,
    allByProgram: mockAllByProgram,
  },
}

export const NoUpcoming: Story = {
  args: {
    events: mockAllByProgram.flatMap((g) => g.events),
    upcoming: [],
    programs: mockPrograms,
    allByProgram: mockAllByProgram,
  },
}
