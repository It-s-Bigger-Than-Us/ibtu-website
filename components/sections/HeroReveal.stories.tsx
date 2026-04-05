import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import HeroReveal from './HeroReveal'

const meta = {
  title: 'Sections/HeroReveal',
  component: HeroReveal,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HeroReveal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
