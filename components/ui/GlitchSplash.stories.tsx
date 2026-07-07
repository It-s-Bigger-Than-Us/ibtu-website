import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'

import GlitchSplash from './GlitchSplash'

const meta = {
  title: 'UI/GlitchSplash',
  component: GlitchSplash,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof GlitchSplash>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { show: true },
  render: () => {
    const [show, setShow] = useState(true)
    return (
      <div style={{ height: '100vh', background: '#FFC700', padding: 40 }}>
        <button
          onClick={() => setShow(true)}
          style={{
            padding: '12px 24px',
            background: '#000',
            color: '#FFF',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          Replay splash
        </button>
        <GlitchSplash show={show} onComplete={() => setShow(false)} />
      </div>
    )
  },
}

export const CustomPhrase: Story = {
  args: { show: true, lines: ['Designed', 'with', 'dignity.'] },
  render: () => {
    const [show, setShow] = useState(true)
    return (
      <div style={{ height: '100vh', background: '#000', padding: 40, color: '#FFF' }}>
        <button onClick={() => setShow(true)} style={{ padding: '12px 24px' }}>
          Replay
        </button>
        <GlitchSplash
          show={show}
          onComplete={() => setShow(false)}
          lines={['Designed', 'with', 'dignity.']}
        />
      </div>
    )
  },
}
