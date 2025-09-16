// Utility functions for the B4U Esports application

/**
 * Format currency with proper decimal places
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(amount)
}

/**
 * Format numbers with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

/**
 * Format date relative to now
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date()
  const targetDate = typeof date === 'string' ? new Date(date) : date
  const diffInMs = now.getTime() - targetDate.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  if (diffInHours < 24) return `${diffInHours}h ago`
  if (diffInDays < 7) return `${diffInDays}d ago`
  
  return targetDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

/**
 * Validate PUBG Mobile UID
 */
export function validatePubgUID(uid: string): boolean {
  return /^\d{8,10}$/.test(uid)
}

/**
 * Validate Mobile Legends User ID
 */
export function validateMLBBUserID(userId: string): boolean {
  return /^\d{6,12}$/.test(userId)
}

/**
 * Validate Mobile Legends Zone ID
 */
export function validateMLBBZoneID(zoneId: string): boolean {
  return /^\d{1,5}$/.test(zoneId)
}

/**
 * Get game display name
 */
export function getGameDisplayName(game: string): string {
  switch (game) {
    case 'PUBG_MOBILE':
      return 'PUBG Mobile'
    case 'MLBB':
      return 'Mobile Legends: Bang Bang'
    default:
      return 'Unknown Game'
  }
}

/**
 * Get currency name for game
 */
export function getGameCurrency(game: string): string {
  switch (game) {
    case 'PUBG_MOBILE':
      return 'UC'
    case 'MLBB':
      return 'Diamonds'
    default:
      return 'Currency'
  }
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Generate random ID
 */
export function generateRandomId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Sleep utility for delays
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Debounce function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}