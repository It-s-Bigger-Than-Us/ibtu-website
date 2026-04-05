import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import MissionSection from './MissionSection'

const meta = {
  title: 'Sections/MissionSection',
  component: MissionSection,
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
} satisfies Meta<typeof MissionSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
