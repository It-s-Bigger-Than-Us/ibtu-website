import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import SanityImage from './SanityImage'

const meta = {
  title: 'UI/SanityImage',
  component: SanityImage,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: 40 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SanityImage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: '/images/fire-relief/hub-interior-1.jpg',
    alt: 'IBTU Community Hub interior',
    width: 800,
    height: 600,
  },
}

export const WarmFilter: Story = {
  args: {
    src: '/images/fire-relief/hub-interior-1.jpg',
    alt: 'IBTU event with warm color grading',
    width: 800,
    height: 600,
    warmFilter: true,
  },
}

export const NoFilter: Story = {
  args: {
    src: '/images/fire-relief/hub-interior-1.jpg',
    alt: 'IBTU event without color filter',
    width: 800,
    height: 600,
    warmFilter: false,
  },
}

export const Fill: Story = {
  args: {
    src: '/images/fire-relief/hub-interior-1.jpg',
    alt: 'IBTU fill mode image',
    fill: true,
    priority: true,
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: 0, position: 'relative', width: 600, height: 400 }}>
        <Story />
      </div>
    ),
  ],
}
