import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import SectionTransition from './SectionTransition'
import { ALL_SOURCES } from '@/lib/video-library'

const meta = {
  title: 'UI/SectionTransition',
  component: SectionTransition,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    src: { control: 'select', options: ALL_SOURCES },
  },
} satisfies Meta<typeof SectionTransition>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { src: 'holo01' },
  render: (args) => (
    <div style={{ background: '#000', color: '#fff' }}>
      <section style={{ height: '60vh', padding: 40 }}>Scroll down →</section>
      <SectionTransition {...args} />
      <section style={{ height: '60vh', padding: 40, background: '#FFC700', color: '#000' }}>
        Next section
      </section>
    </div>
  ),
}
