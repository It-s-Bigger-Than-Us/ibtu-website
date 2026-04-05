import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import RevealOnScroll from './RevealOnScroll'

const meta = {
  title: 'UI/RevealOnScroll',
  component: RevealOnScroll,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: 60 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RevealOnScroll>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div style={{
        padding: '40px 60px',
        color: '#FFC700',
        fontFamily: 'var(--font-body)',
        fontSize: 24,
        fontWeight: 700,
        textTransform: 'uppercase' as const,
        border: '1px solid #FFC700',
      }}>
        875,500+ lbs food distributed
      </div>
    ),
  },
}

export const WithDelay: Story = {
  args: {
    delay: 0.5,
    children: (
      <div style={{
        padding: '40px 60px',
        color: '#FFF',
        fontFamily: 'var(--font-body)',
        fontSize: 18,
      }}>
        Delayed reveal animation (0.5s)
      </div>
    ),
  },
}

export const LargeSlide: Story = {
  args: {
    y: 120,
    duration: 1.2,
    children: (
      <div style={{
        padding: '40px 60px',
        color: '#FFC700',
        fontFamily: 'var(--font-body)',
        fontSize: 18,
      }}>
        Deep slide from 120px below
      </div>
    ),
  },
}
