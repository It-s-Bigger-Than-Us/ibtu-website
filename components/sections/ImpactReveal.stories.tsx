import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ImpactReveal from './ImpactReveal'

const meta = {
  title: 'Sections/ImpactReveal',
  component: ImpactReveal,
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
} satisfies Meta<typeof ImpactReveal>

export default meta
type Story = StoryObj<typeof meta>

const mockPillars = [
  {
    name: 'Crisis & Disaster Stabilization',
    stat: '5,000+',
    statLabel: 'Families Stabilized',
    imageSrc: '/images/fire-relief/IMG_8047.jpg',
  },
  {
    name: 'School & Youth Stability',
    stat: '62,475+',
    statLabel: 'Students Served Since 2020',
    imageSrc: '/images/school/IMG_5406.jpg',
  },
  {
    name: 'Community Health & Resource Access',
    stat: '875,500+',
    statLabel: 'Lbs Food Distributed',
    imageSrc: '/images/b2s/2V8A1776.jpg',
  },
]

const mockStats = [
  { value: 62475, suffix: '+', label: 'Students Served' },
  { value: 875500, suffix: '+', label: 'Lbs Food Distributed' },
  { value: 34, label: 'School Sites' },
  { value: 7500, suffix: '+', label: 'Volunteers' },
  { value: 300, suffix: '+', label: 'Partners' },
  { value: 5000, suffix: '+', label: 'Families Stabilized' },
]

export const Default: Story = {
  args: {
    pillars: mockPillars,
    stats: mockStats,
  },
}
