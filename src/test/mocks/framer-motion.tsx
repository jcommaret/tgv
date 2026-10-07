/**
 * Lightweight framer-motion mock for tests.
 *
 * Renders `motion.<tag>` as the plain DOM element, stripping animation props.
 * Usage: vi.mock('framer-motion', () => import('../mocks/framer-motion'))
 */

import { createElement, forwardRef, type ReactNode } from 'react'

const MOTION_PROPS = new Set([
  'initial',
  'animate',
  'exit',
  'transition',
  'variants',
  'whileHover',
  'whileTap',
  'whileInView',
  'whileFocus',
  'viewport',
  'layout',
  'layoutId',
])

const cache = new Map<string, unknown>()

const createMotionComponent = (tag: string) =>
  forwardRef<HTMLElement, { children?: ReactNode; [key: string]: unknown }>(
    ({ children, ...props }, ref) => {
      const domProps = Object.fromEntries(
        Object.entries(props).filter(([key]) => !MOTION_PROPS.has(key))
      )
      return createElement(tag, { ...domProps, ref }, children as ReactNode)
    }
  )

export const motion = new Proxy(
  {},
  {
    get: (_target, tag: string) => {
      if (!cache.has(tag)) cache.set(tag, createMotionComponent(tag))
      return cache.get(tag)
    },
  }
)

export const AnimatePresence = ({ children }: { children?: ReactNode }) => <>{children}</>
