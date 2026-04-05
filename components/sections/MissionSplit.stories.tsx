import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import MissionSplit from './MissionSplit'

const meta = {
  title: 'Sections/MissionSplit',
  component: MissionSplit,
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
} satisfies Meta<typeof MissionSplit>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomHeadline: Story = {
  args: {
    headline: 'Community Is The Infrastructure',
  },
}
