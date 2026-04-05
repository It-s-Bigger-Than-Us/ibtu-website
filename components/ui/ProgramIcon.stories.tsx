import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import ProgramIcon from './ProgramIcon'

const meta = {
  title: 'UI/ProgramIcon',
  component: ProgramIcon,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgramIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Fire: Story = {
  args: { icon: 'fire', size: 48, color: '#FFC700' },
}

export const School: Story = {
  args: { icon: 'school', size: 48, color: '#FFC700' },
}

export const Youth: Story = {
  args: { icon: 'youth', size: 48, color: '#FFC700' },
}

export const Beach: Story = {
  args: { icon: 'beach', size: 48, color: '#FFC700' },
}

export const Gift: Story = {
  args: { icon: 'gift', size: 48, color: '#FFC700' },
}

export const Wellness: Story = {
  args: { icon: 'wellness', size: 48, color: '#FFC700' },
}

export const Food: Story = {
  args: { icon: 'food', size: 48, color: '#FFC700' },
}

export const WhiteOnBlack: Story = {
  args: { icon: 'fire', size: 48, color: '#FFF' },
}

export const BlackOnGold: Story = {
  args: { icon: 'school', size: 48, color: '#000' },
  decorators: [
    (Story) => (
      <div style={{ background: '#FFC700', padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
}

export const LargeSize: Story = {
  args: { icon: 'wellness', size: 96, color: '#FFC700' },
}
