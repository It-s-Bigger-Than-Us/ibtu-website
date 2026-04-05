import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import FullBleedVideo from './FullBleedVideo'

const meta = {
  title: 'UI/FullBleedVideo',
  component: FullBleedVideo,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ background: '#000' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FullBleedVideo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: '/videos/hero-reel.mp4',
    height: '60vh',
  },
}

export const WithAspectRatio: Story = {
  args: {
    src: '/videos/hero-reel.mp4',
    aspectRatio: '16/9',
  },
}

export const Priority: Story = {
  args: {
    src: '/videos/hero-reel.mp4',
    height: '50vh',
    priority: true,
  },
}
