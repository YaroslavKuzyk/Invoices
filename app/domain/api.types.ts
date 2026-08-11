
export interface IPaginationLinks {
  first: string | null
  last: string | null
  prev: string | null
  next: string | null
}

export interface IPaginationMetaLink {
  url: string | null
  label: string
  page: number | null
  active: boolean
}

export interface IPaginationMeta {
  current_page: number
  from: number | null
  last_page: number
  links: IPaginationMetaLink[]
  path: string
  per_page: number
  to: number | null
  total: number
}

export interface IPaginated<T> {
  data: T[]
  links: IPaginationLinks
  meta: IPaginationMeta
}

export interface IPaginationParams {
  page?: number
  per_page?: number
}

export interface IValidationErrorResponse {
  message: string
  errors: Record<string, string[]>
}

export interface IApiError {
  message: string
  fields: Record<string, string>
  isValidation: boolean
  isNotFound: boolean
  isConflict: boolean
  status: number | null
}
