import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import StackingGallery from './StackingGallery'

const mockImages = [
  {
    src: '/images/fire-relief/IMG_8047.jpg',
    alt: 'IBTU fire relief volunteers distributing supplies',
    caption: 'Relief distribution',
  },
  {
    src: '/images/b2s/_D5A5792.jpg',
    alt: 'Back 2 School Festival crowd',
    caption: 'Back 2 School 2025',
  },
  {
    src: '/images/school/IMG_5406.jpg',
    alt: 'School program lunchtime takeover',
  },
  {
    src: '/images/coastal/IMG_4920.jpg',
    alt: 'Coastal Care beach cleanup volunteers',
    caption: 'Coastal Care',
  },
  {
    src: '/images/additional/IMG_0418.jpg',
    alt: 'Community food distribution event',
  },
]

const meta = {
  title: 'Sections/StackingGallery',
  component: StackingGallery,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'black' },
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#000' }}>
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#FFC700', fontFamily: 'sans-serif' }}>Scroll down to see the stacking gallery</p>
        </div>
        <Story />
        <div style={{ height: '100vh' }} />
      </div>
    ),
  ],
} satisfies Meta<typeof StackingGallery>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    images: mockImages,
  },
}

export const WithTitle: Story = {
  args: {
    images: mockImages,
    title: 'In the Field',
  },
}
