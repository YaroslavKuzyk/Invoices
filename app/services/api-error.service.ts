import type { IApiError, IValidationErrorResponse } from '~/domain'

interface IFetchErrorLike {
  statusCode?: number
  status?: number
  data?: Partial<IValidationErrorResponse>
  message?: string
}

export function normalizeApiError(error: unknown, fallbackMessage = 'Request failed'): IApiError {
  const err = error as IFetchErrorLike
  const status = err?.statusCode ?? err?.status ?? null

  const fields: Record<string, string> = {}
  const rawErrors = err?.data?.errors

  if (rawErrors) {
    for (const [field, messages] of Object.entries(rawErrors)) {
      const first = messages?.[0]
      if (first) fields[field] = first
    }
  }

  return {
    message: err?.data?.message || err?.message || fallbackMessage,
    fields,
    isValidation: status === 422,
    isNotFound: status === 404,
    isConflict: status === 409,
    status
  }
}
