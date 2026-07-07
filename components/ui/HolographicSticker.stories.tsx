import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import HolographicSticker from './HolographicSticker'

const meta = {
  title: 'UI/HolographicSticker',
  component: HolographicSticker,
  parameters: { layout: 'centered', backgrounds: { default: 'gold' } },
} satisfies Meta<typeof HolographicSticker>

export default meta
type Story = StoryObj<typeof meta>

export const SacredPhrase: Story = {
  args: {
    shape: 'pill',
    tone: 'light',
    size: 80,
    rotate: -4,
    children: 'Designed with dignity.',
  },
}

export const CommunityIsInfrastructure: Story = {
  args: {
    shape: 'rounded',
    tone: 'light',
    size: 130,
    rotate: 2,
    children: (
      <>
        Community
        <br />
        is the
        <br />
        Infrastructure.
      </>
    ),
  },
}

export const ListenBuildStay: Story = {
  args: {
    shape: 'pill',
    tone: 'gold',
    size: 64,
    children: 'We listen, we build, we stay.',
  },
}

export const SponsorTier: Story = {
  args: {
    shape: 'circle',
    tone: 'black',
    size: 120,
    children: (
      <>
        Founder
        <br />
        $50,000
      </>
    ),
  },
}

export const VerifiedStamp: Story = {
  args: {
    shape: 'circle',
    tone: 'light',
    size: 84,
    rotate: -8,
    children: 'Verified',
  },
}
