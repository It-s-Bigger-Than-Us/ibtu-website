import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import SparkleStroke from './SparkleStroke'

const meta = {
  title: 'UI/SparkleStroke',
  component: SparkleStroke,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: 60 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SparkleStroke>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div style={{
        padding: '24px 48px',
        color: '#FFC700',
        fontFamily: 'var(--font-body)',
        fontSize: 16,
        fontWeight: 600,
      }}>
        28,025 students in 2025
      </div>
    ),
  },
}

export const RoundedBorder: Story = {
  args: {
    borderRadius: '20px',
    children: (
      <div style={{
        padding: '20px 40px',
        color: '#FFF',
        fontFamily: 'var(--font-body)',
        fontSize: 14,
      }}>
        300+ community partners
      </div>
    ),
  },
}

export const FullyRounded: Story = {
  args: {
    borderRadius: '100px',
    children: (
      <div style={{
        padding: '14px 32px',
        color: '#FFC700',
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        fontWeight: 700,
        textTransform: 'uppercase' as const,
        letterSpacing: 2,
      }}>
        Learn More
      </div>
    ),
  },
}
