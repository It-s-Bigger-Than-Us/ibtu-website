import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import HoverAccent from './HoverAccent'
import { ALL_SOURCES } from '@/lib/video-library'

const meta = {
  title: 'UI/HoverAccent',
  component: HoverAccent,
  parameters: { layout: 'centered' },
  argTypes: {
    src: { control: 'select', options: ALL_SOURCES },
  },
} satisfies Meta<typeof HoverAccent>

export default meta
type Story = StoryObj<typeof meta>

export const ProgramCard: Story = {
  args: { src: 'holo01', borderRadius: 16 },
  render: (args) => (
    <HoverAccent {...args}>
      <div
        style={{
          padding: 48,
          width: 360,
          height: 220,
          background: 'rgba(0,0,0,0.4)',
          color: '#FFF',
          display: 'flex',
          alignItems: 'flex-end',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}
      >
        Hover me — Back 2 School
      </div>
    </HoverAccent>
  ),
}
