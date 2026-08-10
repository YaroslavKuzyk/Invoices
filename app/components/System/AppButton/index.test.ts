import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppButton from './index.vue'

describe('AppButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(AppButton, {
      slots: { default: 'Click me' },
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('applies default variant and size classes', () => {
    const wrapper = mount(AppButton)
    expect(wrapper.classes()).toContain('app-button--primary')
    expect(wrapper.classes()).toContain('app-button--medium')
  })

  it.each(['primary', 'secondary', 'danger', 'success', 'info', 'purple', 'transparent'] as const)(
    'applies %s variant class',
    (variant) => {
      const wrapper = mount(AppButton, { props: { variant } })
      expect(wrapper.classes()).toContain(`app-button--${variant}`)
    }
  )

  it('applies size class based on prop', () => {
    const wrapper = mount(AppButton, { props: { size: 'small' } })
    expect(wrapper.classes()).toContain('app-button--small')
  })

  it('applies disabled class and attribute when disabled', () => {
    const wrapper = mount(AppButton, { props: { disabled: true } })
    expect(wrapper.classes()).toContain('app-button--disabled')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('shows loader when loading is true', () => {
    const wrapper = mount(AppButton, { props: { loading: true } })
    expect(wrapper.find('.app-button__loader').exists()).toBe(true)
  })

  it('hides loader when loading is false', () => {
    const wrapper = mount(AppButton, { props: { loading: false } })
    expect(wrapper.find('.app-button__loader').exists()).toBe(false)
  })

  it('is not disabled when only loading', () => {
    const wrapper = mount(AppButton, { props: { loading: true, disabled: false } })
    expect(wrapper.attributes('disabled')).toBeUndefined()
  })
})
