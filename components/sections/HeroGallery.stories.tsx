import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import HeroGallery from './HeroGallery'

const meta = {
  title: 'Sections/HeroGallery',
  component: HeroGallery,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HeroGallery>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
