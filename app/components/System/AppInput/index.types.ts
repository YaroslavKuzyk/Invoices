export interface IProps {
  label?: string
  type?: 'text' | 'number' | 'date'
  step?: string
  min?: string
  disabled?: boolean
  readOnly?: boolean
  error?: string
  hint?: string
}
