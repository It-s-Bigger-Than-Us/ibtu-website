import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import PillarTabs from './PillarTabs'

const meta = {
  title: 'Sections/PillarTabs',
  component: PillarTabs,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PillarTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
