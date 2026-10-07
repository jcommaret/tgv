import { act, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ToastContainer } from '@shared/components/Toast'
import { useAppStore } from '@store/appStore'

vi.mock('framer-motion', () => import('../../mocks/framer-motion'))

describe('ToastContainer', () => {
  beforeEach(() => {
    useAppStore.getState().clearNotifications()
  })

  it('affiche les notifications de chaque type', () => {
    render(<ToastContainer />)
    act(() => {
      const { addNotification } = useAppStore.getState()
      addNotification({ type: 'success', message: 'Succès', duration: 0 })
      addNotification({ type: 'error', message: 'Erreur', duration: 0 })
      addNotification({ type: 'warning', message: 'Attention', duration: 0 })
      addNotification({ type: 'info', message: 'Info', duration: 0 })
    })
    expect(screen.getAllByRole('alert')).toHaveLength(4)
  })

  it('ferme une notification au clic', () => {
    render(<ToastContainer />)
    act(() => {
      useAppStore.getState().addNotification({ type: 'info', message: 'Bonjour', duration: 0 })
    })
    fireEvent.click(screen.getByRole('button', { name: 'Fermer la notification' }))
    expect(screen.queryByText('Bonjour')).not.toBeInTheDocument()
  })
})
