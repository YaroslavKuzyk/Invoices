import { format, parseISO } from 'date-fns'

const EMPTY = '—'

const DATE_FORMAT = 'dd.MM.yyyy'
const DATE_TIME_FORMAT = 'dd.MM.yyyy HH:mm'

function toDate(value?: string | null): Date | null {
  if (!value) return null

  const date = parseISO(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export function formatDate(value?: string | null): string {
  const date = toDate(value)
  return date ? format(date, DATE_FORMAT) : EMPTY
}

export function formatDateTime(value?: string | null): string {
  const date = toDate(value)
  return date ? format(date, DATE_TIME_FORMAT) : EMPTY
}

export function formatMoney(value?: string | number | null, currency?: string): string {
  const amount = Number(value)

  if (value === null || value === undefined || value === '' || !Number.isFinite(amount)) {
    return EMPTY
  }

  const [integer = '0', fraction = '00'] = amount.toFixed(2).split('.')
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  return currency ? `${grouped},${fraction} ${currency}` : `${grouped},${fraction}`
}
