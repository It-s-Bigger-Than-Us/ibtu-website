import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import GlitchLogoMark from './GlitchLogoMark'

const meta = {
  title: 'UI/GlitchLogoMark',
  component: GlitchLogoMark,
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
} satisfies Meta<typeof GlitchLogoMark>

export default meta
type Story = StoryObj<typeof meta>

export const Subtle: Story = { args: { size: 240, intensity: 0.25, cycleSeconds: 5 } }
export const Lively: Story = { args: { size: 240, intensity: 0.45, cycleSeconds: 3.5 } }
export const Flashing: Story = { args: { size: 240, flash: true, cycleSeconds: 2 } }
export const OneShot: Story = { args: { size: 240, triggerOnce: true, intensity: 0.5 } }
