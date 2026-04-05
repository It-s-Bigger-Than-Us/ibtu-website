import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import ImageTile from './ImageTile'

const meta = {
  title: 'UI/ImageTile',
  component: ImageTile,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: 40 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ImageTile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: '/images/fire-relief/hub-interior-1.jpg',
    alt: 'IBTU Community Hub interior during fire relief operations',
    width: 500,
    height: 350,
  },
}

export const SlowParallax: Story = {
  args: {
    src: '/images/fire-relief/hub-interior-1.jpg',
    alt: 'IBTU Community Hub with slow parallax',
    width: 500,
    height: 350,
    parallaxSpeed: 0.05,
  },
}

export const FastParallax: Story = {
  args: {
    src: '/images/fire-relief/hub-interior-1.jpg',
    alt: 'IBTU Community Hub with fast parallax',
    width: 500,
    height: 350,
    parallaxSpeed: 0.4,
  },
}
