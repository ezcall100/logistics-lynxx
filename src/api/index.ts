// Centralized API exports
export * from './users'
export * from './analytics'
export * from './system'

// API Service Types
export interface APIResponse<T> {
  data: T | null
  error: any
  loading?: boolean
}

// Common API utilities
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num)
}

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`
}

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const formatUptime = (uptime: number): string => {
  return `${uptime.toFixed(2)}%`
}

// API Error handling
export const handleAPIError = (error: any): string => {
  if (typeof error === 'string') return error
  if (error?.message) return error.message
  if (error?.error_description) return error.error_description
  return 'An unexpected error occurred'
}

// API Loading states
export const createLoadingState = () => ({
  loading: true,
  data: null,
  error: null,
})

export const createSuccessState = <T>(data: T) => ({
  loading: false,
  data,
  error: null,
})

export const createErrorState = (error: any) => ({
  loading: false,
  data: null,
  error: handleAPIError(error),
})
