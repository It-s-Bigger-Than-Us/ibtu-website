import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ProgramSponsorSlider from './ProgramSponsorSlider'

const meta = {
  title: 'Sections/ProgramSponsorSlider',
  component: ProgramSponsorSlider,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'black' },
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', minHeight: '100vh', padding: '40px' }}>
        <p style={{ color: '#FFF', fontFamily: 'sans-serif', marginBottom: 20 }}>
          The sponsor slider tab is fixed to the right edge of the viewport.
        </p>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgramSponsorSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    programName: 'Back 2 School Festival',
  },
}

export const CustomTiers: Story = {
  args: {
    programName: 'Fire Relief & The Hub',
    tiers: [
      {
        name: 'Title Sponsor',
        price: '$25,000+',
        featured: true,
        deliverables: [
          'Exclusive title recognition across all Hub events',
          'Branded signage at Relief Resource Hub entrance',
          'Custom impact report with client outcomes',
          'Employee volunteer activation days',
        ],
      },
      {
        name: 'Impact Partner',
        price: '$10,000',
        deliverables: [
          'Logo on Hub materials and signage',
          'Social media feature posts',
          'Quarterly impact report inclusion',
        ],
      },
      {
        name: 'Community Ally',
        price: '$5,000',
        deliverables: [
          'Name recognition on select materials',
          'Group social acknowledgment',
        ],
      },
    ],
  },
}
