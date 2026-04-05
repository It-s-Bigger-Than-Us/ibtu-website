import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import FloatingShapes from './FloatingShapes'

const meta = {
  title: 'UI/FloatingShapes',
  component: FloatingShapes,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: '40px 0' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FloatingShapes>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    count: 8,
    seed: 0,
    height: '200px',
  },
}

export const Dense: Story = {
  args: {
    count: 16,
    seed: 42,
    height: '300px',
  },
}

export const Sparse: Story = {
  args: {
    count: 3,
    seed: 7,
    height: '150px',
  },
}

export const OnWhiteBackground: Story = {
  args: {
    count: 6,
    seed: 11,
    height: '200px',
    bgColor: '#FFF',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#FFF', padding: '40px 0' }}>
        <Story />
      </div>
    ),
  ],
}
