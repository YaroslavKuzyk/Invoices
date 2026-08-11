export interface IOption {
  value: string
  label: string
}

export interface IProps {
  label?: string
  options: IOption[]
  disabled?: boolean
  error?: string
}
