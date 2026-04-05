import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import IridescentLogo from './IridescentLogo'

const meta = {
  title: '3D/IridescentLogo',
  component: IridescentLogo,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'black' },
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof IridescentLogo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 56,
  },
}

export const Large: Story = {
  args: {
    size: 120,
  },
}

export const ExtraLarge: Story = {
  args: {
    size: 200,
  },
}
