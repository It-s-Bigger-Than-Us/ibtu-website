import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import ScrollText from './ScrollText'

const meta = {
  title: 'UI/ScrollText',
  component: ScrollText,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: '120px 40px', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ScrollText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Community',
    color: '#FFF',
  },
}

export const GoldLeft: Story = {
  args: {
    children: 'Impact',
    direction: 'left',
    color: '#FFC700',
  },
}

export const WhiteRight: Story = {
  args: {
    children: 'Dignity',
    direction: 'right',
    color: '#FFF',
  },
}

export const UpDirection: Story = {
  args: {
    children: 'Programs',
    direction: 'up',
    color: '#FFC700',
  },
}

export const CustomSize: Story = {
  args: {
    children: 'Fire Relief',
    color: '#FFC700',
    size: 'clamp(40px, 8vw, 120px)',
    speed: 0.5,
  },
}
