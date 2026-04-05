import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import HoloGlass from './HoloGlass'

const meta = {
  title: 'UI/HoloGlass',
  component: HoloGlass,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: 60 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HoloGlass>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div style={{
        padding: '32px 48px',
        color: '#FFF',
        fontFamily: 'var(--font-body)',
        fontSize: 16,
        borderRadius: 12,
        border: '1px solid #FFC700',
      }}>
        62,475+ students served since 2020
      </div>
    ),
  },
}

export const HoverEffect: Story = {
  args: {
    hover: true,
    children: (
      <div style={{
        padding: '32px 48px',
        color: '#FFF',
        fontFamily: 'var(--font-body)',
        fontSize: 16,
        borderRadius: 12,
        border: '1px solid #FFC700',
      }}>
        Hover to see holographic border
      </div>
    ),
  },
}

export const AsSection: Story = {
  args: {
    as: 'section',
    children: (
      <div style={{
        padding: '48px 60px',
        color: '#FFC700',
        fontFamily: 'var(--font-body)',
        fontSize: 20,
        fontWeight: 700,
        textTransform: 'uppercase' as const,
      }}>
        Designed with dignity.
      </div>
    ),
  },
}
