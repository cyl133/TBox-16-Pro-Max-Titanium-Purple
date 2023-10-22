import { IssueType } from './pages/home'

export function formatMillisecondsString(milliseconds: number): string {
  if (milliseconds < 0) {
    return 'Invalid time' // Handle negative values, if needed
  }

  const seconds = Math.floor((milliseconds / 1000) % 60)
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60)
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24)
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24))

  const parts = []

  if (days > 0) {
    parts.push(`${days} day${days > 1 ? 's' : ''}`)
  }
  if (hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? 's' : ''}`)
  }
  if (minutes > 0) {
    parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`)
  }
  if (seconds > 0) {
    parts.push(`${seconds} second${seconds > 1 ? 's' : ''}`)
  }

  if (parts.length === 0) {
    return '0 seconds'
  }

  return parts.join(', ')
}

export function formatMilliseconds(milliseconds: number): string {
  if (milliseconds < 0) {
    return 'Invalid time' // Handle negative values, if needed
  }

  const seconds = Math.floor((milliseconds / 1000) % 60)
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60)
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24)
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24))

  const formattedDays = days.toString().padStart(2, '0')
  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = seconds.toString().padStart(2, '0')

  return `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}

export const issues_data: IssueType[] = [
  {
    issue_title: 'Update authentication module',
    issue_number: 38,
    issue_state: 'open',
    is_timer_on: false,
    originalTime: 20000,
    remainingTime: 10000,
    startTime: null,
    is_confirmed: false,
    difficulty: 'medium',
    stressLevel: 'low'
  },
  {
    issue_title: 'Delete unused code',
    issue_number: 37,
    issue_state: 'open',
    is_timer_on: false,
    originalTime: 10000,
    remainingTime: 20000,
    startTime: null,
    is_confirmed: false,
    difficulty: 'easy',
    stressLevel: 'no stress'
  },
  {
    issue_title: 'Refactor data retrieval',
    issue_number: 36,
    issue_state: 'open',
    is_timer_on: false,
    originalTime: 30000,
    remainingTime: 15000,
    startTime: null,
    is_confirmed: false,
    difficulty: 'hard',
    stressLevel: 'medium'
  },
  {
    issue_title: 'Implement unit tests for feature X',
    issue_number: 35,
    issue_state: 'open',
    is_timer_on: false,
    originalTime: 15000,
    remainingTime: 30000,
    startTime: null,
    is_confirmed: false,
    difficulty: 'medium',
    stressLevel: 'low'
  },
  {
    issue_title: 'Optimize database queries',
    issue_number: 34,
    issue_state: 'open',
    is_timer_on: false,
    originalTime: 25000,
    remainingTime: 25000,
    startTime: null,
    is_confirmed: false,
    difficulty: 'medium',
    stressLevel: 'low'
  },
  {
    issue_title: 'Fix critical bug in feature Y',
    issue_number: 33,
    issue_state: 'open',
    is_timer_on: false,
    originalTime: 35000,
    remainingTime: 35000,
    startTime: null,
    is_confirmed: false,
    difficulty: 'hard',
    stressLevel: 'high'
  },
  {
    issue_title: 'Update documentation for API endpoints',
    issue_number: 32,
    issue_state: 'open',
    is_timer_on: false,
    originalTime: 45000,
    remainingTime: 45000,
    startTime: null,
    is_confirmed: false,
    difficulty: 'easy',
    stressLevel: 'low'
  },
  {
    issue_title: 'Refactor codebase for improved maintainability',
    issue_number: 31,
    issue_state: 'open',
    is_timer_on: false,
    originalTime: 55000,
    remainingTime: 55000,
    startTime: null,
    is_confirmed: false,
    difficulty: 'medium',
    stressLevel: 'medium'
  },
  {
    issue_title: 'Optimize database queries for faster performance',
    issue_number: 30,
    issue_state: 'open',
    is_timer_on: false,
    originalTime: 65000,
    remainingTime: 65000,
    startTime: null,
    is_confirmed: false,
    difficulty: 'medium',
    stressLevel: 'low'
  },
  {
    issue_title: 'Add new feature Z',
    issue_number: 29,
    issue_state: 'open',
    is_timer_on: false,
    originalTime: 75000,
    remainingTime: 75000,
    startTime: null,
    is_confirmed: false,
    difficulty: 'hard',
    stressLevel: 'high'
  },
  {
    issue_title: 'Implement feature A according to specifications',
    issue_number: 28,
    issue_state: 'open',
    is_timer_on: false,
    originalTime: 85000,
    remainingTime: 85000,
    startTime: null,
    is_confirmed: false,
    difficulty: 'medium',
    stressLevel: 'medium'
  }
]
