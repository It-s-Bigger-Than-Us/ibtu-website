import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import SponsorshipSection from './SponsorshipSection'

const mockPackages = [
  {
    _id: 'pkg-1',
    tierName: 'Title Sponsor',
    tierGroup: 'Event Sponsorship',
    price: 15000,
    priceDisplay: '$15,000+',
    deliverables: [
      'Title sponsor recognition at all events',
      'On-site branded signage at activations',
      'Solo social media spotlight posts',
      'Logo on all printed materials',
      'Custom impact recap report',
    ],
    featured: true,
  },
  {
    _id: 'pkg-2',
    tierName: 'Impact Sponsor',
    tierGroup: 'Event Sponsorship',
    price: 10000,
    priceDisplay: '$10,000',
    deliverables: [
      'Logo on event materials and signage',
      'Carousel social media feature',
      'On-site tabling at events',
      'Inclusion in impact report',
    ],
  },
  {
    _id: 'pkg-3',
    tierName: 'Community Sponsor',
    tierGroup: 'Event Sponsorship',
    price: 5000,
    priceDisplay: '$5,000',
    deliverables: [
      'Logo on select materials',
      'Solo frame in social carousel',
      'Community recognition',
    ],
  },
  {
    _id: 'pkg-4',
    tierName: 'Vendor Booth — Standard',
    tierGroup: 'Vendor Packages',
    price: 500,
    priceDisplay: '$500',
    boothSize: '10x10',
    deliverables: [
      'Standard 10x10 booth space',
      'Event listing on program materials',
      'Table and chairs included',
    ],
  },
  {
    _id: 'pkg-5',
    tierName: 'Food Truck Space',
    tierGroup: 'Vendor Packages',
    price: 750,
    priceDisplay: '$750',
    boothSize: 'Food truck designated area',
    deliverables: [
      'Designated food truck parking area',
      'Electricity access',
      'Event program listing',
    ],
  },
]

const meta = {
  title: 'Sections/SponsorshipSection',
  component: SponsorshipSection,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'black' },
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SponsorshipSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    packages: mockPackages,
    programTitle: 'Back 2 School Festival',
  },
}
