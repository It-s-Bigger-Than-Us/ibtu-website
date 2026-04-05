import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import StickyFlipbook from './StickyFlipbook'

const meta = {
  title: 'UI/StickyFlipbook',
  component: StickyFlipbook,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof StickyFlipbook>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    images: [
      {
        src: '/images/fire-relief/hub-interior-1.jpg',
        alt: 'IBTU Community Hub interior during fire relief operations',
        caption: '5,000+ families stabilized through fire relief efforts',
      },
      {
        src: '/images/fire-relief/hub-interior-1.jpg',
        alt: 'Volunteers distributing supplies at Baldwin Hills Crenshaw Plaza',
        caption: '875,500+ lbs of food distributed to families in need',
      },
      {
        src: '/images/fire-relief/hub-interior-1.jpg',
        alt: 'Students at IBTU school site program',
        caption: '62,475+ students served across 34 school sites since 2020',
      },
      {
        src: '/images/fire-relief/hub-interior-1.jpg',
        alt: 'Community gathering at IBTU event',
        caption: '7,500+ volunteers powering our community programs',
      },
    ],
    height: '300vh',
  },
}

export const TwoImages: Story = {
  args: {
    images: [
      {
        src: '/images/fire-relief/hub-interior-1.jpg',
        alt: 'Before: empty space',
      },
      {
        src: '/images/fire-relief/hub-interior-1.jpg',
        alt: 'After: community hub in action',
        caption: 'Designed with dignity.',
      },
    ],
    height: '200vh',
  },
}
