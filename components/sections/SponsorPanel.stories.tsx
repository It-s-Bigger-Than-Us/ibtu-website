import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import SponsorPanel from './SponsorPanel'

const meta = {
  title: 'Sections/SponsorPanel',
  component: SponsorPanel,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'black' },
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', minHeight: '200vh', padding: '40px' }}>
        <p style={{ color: '#FFF', fontFamily: 'sans-serif', marginBottom: 20 }}>
          Scroll past the first viewport to see the sponsor tab appear on the right edge.
        </p>
        <div style={{ height: '120vh' }} />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SponsorPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomTiers: Story = {
  args: {
    tiers: [
      {
        name: 'Presenting Sponsor',
        price: '$25,000+',
        featured: true,
        benefits: [
          'Exclusive presenting sponsor recognition',
          'Keynote introduction at flagship events',
          'Full-page feature in annual impact report',
          'Employee volunteer activation days',
          'Custom branded content series',
        ],
      },
      {
        name: 'Gold Sponsor',
        price: '$15,000',
        benefits: [
          'Logo on all event materials',
          'Dedicated social media spotlight',
          'On-site branded activation space',
          'Quarterly impact metrics report',
        ],
      },
      {
        name: 'Community Partner',
        price: '$5,000',
        benefits: [
          'Logo on select materials',
          'Group social acknowledgment',
          'Community wall recognition',
        ],
      },
    ],
  },
}
