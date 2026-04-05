import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import MissionCard from './MissionCard'

const meta = {
  title: 'Sections/MissionCard',
  component: MissionCard,
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
} satisfies Meta<typeof MissionCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
