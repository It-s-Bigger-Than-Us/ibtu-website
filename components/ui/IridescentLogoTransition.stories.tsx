import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import IridescentLogoTransition from './IridescentLogoTransition'

const meta = {
  title: 'UI/IridescentLogoTransition',
  component: IridescentLogoTransition,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof IridescentLogoTransition>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 200,
    duration: 3,
    autoPlay: true,
  },
}

export const Small: Story = {
  args: {
    size: 80,
    duration: 3,
    autoPlay: true,
  },
}

export const Large: Story = {
  args: {
    size: 400,
    duration: 4,
    autoPlay: true,
  },
}

export const HoverOnly: Story = {
  args: {
    size: 200,
    duration: 3,
    autoPlay: false,
  },
}
