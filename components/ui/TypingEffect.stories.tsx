import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import TypingEffect from './TypingEffect'

const meta = {
  title: 'UI/TypingEffect',
  component: TypingEffect,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: 60 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TypingEffect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'Community is the infrastructure.',
    style: {
      color: '#FFC700',
      fontFamily: 'var(--font-body)',
      fontSize: 24,
      fontWeight: 700,
    },
  },
}

export const FastSpeed: Story = {
  args: {
    text: 'We listen, we build, we stay.',
    speed: 20,
    style: {
      color: '#FFF',
      fontFamily: 'var(--font-body)',
      fontSize: 20,
    },
  },
}

export const SlowSpeed: Story = {
  args: {
    text: 'Designed with dignity.',
    speed: 80,
    style: {
      color: '#FFC700',
      fontFamily: 'var(--font-body)',
      fontSize: 28,
      fontWeight: 700,
    },
  },
}

export const LongText: Story = {
  args: {
    text: 'It\'s Bigger Than Us is a 501(c)(3) nonprofit organization serving Los Angeles through 7 core programs across 34 school sites.',
    speed: 30,
    style: {
      color: '#FFF',
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      lineHeight: 1.6,
      maxWidth: 500,
    },
  },
}
