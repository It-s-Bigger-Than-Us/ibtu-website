import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ConstellationGallery from './ConstellationGallery'

const meta = {
  title: 'Sections/ConstellationGallery',
  component: ConstellationGallery,
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
} satisfies Meta<typeof ConstellationGallery>

export default meta
type Story = StoryObj<typeof meta>

const mockItems = [
  { src: '/images/b2s/2V8A1776.jpg', title: 'Back 2 School 2024', program: 'Back 2 School Festival' },
  { src: '/images/coastal/IMG_4953.jpg', title: 'Venice Beach Cleanup', program: 'Coastal Care' },
  { src: '/images/school/IMG_5406.jpg', title: 'Youth Workshop', program: 'School Program' },
  { src: '/images/wellness/IMG_1614.jpg', title: 'Wellness Activation', program: 'Wellness' },
  { src: '/images/b2s/2V8A1826.jpg', title: 'Backpack Giveaway', program: 'Back 2 School Festival' },
  { src: '/images/coastal/IMG_0568.jpg', title: 'Coastal Cleanup Day', program: 'Coastal Care' },
  { src: '/images/gallery/IMG_4500.jpg', title: 'Community Builder Link Up', program: 'Link Ups' },
  { src: '/images/gallery/IMG_4649.jpg', title: 'Volunteer Day', program: 'Community Events' },
  { src: '/images/school/IMG_0140.jpg', title: 'After-School Program', program: 'School Program' },
  { src: '/images/fire-relief/IMG_8047.jpg', title: 'Fire Relief Hub', program: 'Fire Relief' },
  { src: '/images/b2s/2V8A1895.jpg', title: 'Festival Stage', program: 'Back 2 School Festival' },
  { src: '/images/coastal/IMG_1652.jpg', title: 'Beach Day', program: 'Coastal Care' },
]

export const Default: Story = {
  args: {
    items: mockItems,
  },
}

export const WithCustomTitle: Story = {
  args: {
    items: mockItems,
    title: 'COMMUNITY IS THE INFRASTRUCTURE',
  },
}

export const FewItems: Story = {
  args: {
    items: mockItems.slice(0, 4),
    title: 'DESIGNED WITH DIGNITY',
  },
}
