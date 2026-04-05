import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import Canvas3DWrapper from './Canvas3DWrapper'

const meta = {
  title: 'UI/Canvas3DWrapper',
  component: Canvas3DWrapper,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: 40, width: 400, height: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Canvas3DWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFC700',
        fontFamily: 'var(--font-body)',
        fontSize: 14,
      }}>
        3D content renders here
      </div>
    ),
  },
}

export const WithDelay: Story = {
  args: {
    delay: 1000,
    children: (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFC700',
        fontFamily: 'var(--font-body)',
        fontSize: 14,
      }}>
        Deferred content (1s delay)
      </div>
    ),
  },
}

export const WithCustomFallback: Story = {
  args: {
    delay: 5000,
    fallback: (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        color: '#FFC700',
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        border: '1px solid #FFC700',
      }}>
        Loading 3D scene...
      </div>
    ),
    children: (
      <div style={{ color: '#FFF', textAlign: 'center', padding: 40 }}>
        3D scene loaded
      </div>
    ),
  },
}
