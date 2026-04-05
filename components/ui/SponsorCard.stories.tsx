import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import SponsorCard from './SponsorCard'

const meta = {
  title: 'UI/SponsorCard',
  component: SponsorCard,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: 40, maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SponsorCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tierName: 'Community Partner',
    priceDisplay: '$2,500',
    deliverables: [
      'Logo on event signage',
      'Social media shoutout',
      'Two event tickets',
    ],
    href: '#',
  },
}

export const Featured: Story = {
  args: {
    tierName: 'Title Sponsor',
    priceDisplay: '$25,000',
    featured: true,
    boothSize: '10x20 ft premium',
    deliverables: [
      'Naming rights on event',
      'Premium booth placement',
      'Full-page program ad',
      'VIP table for 10',
      'Logo on all marketing materials',
      'Speaking opportunity',
    ],
    href: '#',
  },
}

export const MidTier: Story = {
  args: {
    tierName: 'Gold Sponsor',
    priceDisplay: '$10,000',
    boothSize: '10x10 ft',
    deliverables: [
      'Logo on event signage',
      'Half-page program ad',
      'Booth at event',
      'Four VIP tickets',
    ],
    href: '#',
  },
}

export const EntryLevel: Story = {
  args: {
    tierName: 'Friend of IBTU',
    priceDisplay: '$500',
    deliverables: [
      'Name listed in program',
      'Social media mention',
    ],
    href: '#',
  },
}
