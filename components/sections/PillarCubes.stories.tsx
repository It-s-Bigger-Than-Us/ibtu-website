import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import PillarCubes from './PillarCubes'

const meta = {
  title: 'Sections/PillarCubes',
  component: PillarCubes,
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
} satisfies Meta<typeof PillarCubes>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithStats: Story = {
  args: {
    stats: [
      { value: 62475, suffix: '+', label: 'Students Served Since 2020' },
      { value: 875500, suffix: '+', label: 'Pounds of Food Distributed' },
      { value: 300, suffix: '+', label: 'Community Partners' },
      { value: 34, label: 'School Sites' },
      { value: 7500, suffix: '+', label: 'Volunteers Mobilized' },
      { value: 5000, suffix: '+', label: 'Families Stabilized' },
    ],
  },
}
