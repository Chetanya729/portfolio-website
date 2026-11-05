export interface GitHubRepo {
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  html_url: string
  pushed_at: string
  homepage?: string | null
  fork?: boolean
  archived?: boolean
  size?: number
  topics?: string[]
}

const CACHE_KEY = 'gh-repos-v1'
const CACHE_TTL_MS = 30 * 60 * 1000

interface CacheEntry {
  at: number
  repos: GitHubRepo[]
}

function readCache(): GitHubRepo[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const entry = JSON.parse(raw) as CacheEntry
    return Date.now() - entry.at < CACHE_TTL_MS ? entry.repos : null
  } catch {
    return null
  }
}

function writeCache(repos: GitHubRepo[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos } satisfies CacheEntry))
  } catch {
    // Storage can be unavailable (private mode, quota); caching is optional.
  }
}

/**
 * Fetch public repositories for a user. Unauthenticated requests are limited
 * to 60/hour per IP, so results are cached for the browser session.
 * Throws on network failure, rate limiting or a malformed response.
 */
export async function fetchRepos(username: string, signal?: AbortSignal): Promise<GitHubRepo[]> {
  const cached = readCache()
  if (cached) return cached

  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, {
    headers: { Accept: 'application/vnd.github+json' },
    signal,
  })
  if (!res.ok) {
    const limited = res.status === 403 || res.status === 429
    throw new Error(limited ? 'GitHub API rate limit reached' : `GitHub API responded ${res.status}`)
  }
  const data: unknown = await res.json()
  if (!Array.isArray(data)) throw new Error('Unexpected GitHub API response')

  const repos = data as GitHubRepo[]
  writeCache(repos)
  return repos
}

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

export function timeAgo(iso: string): string {
  const diff = (new Date(iso).getTime() - Date.now()) / 1000
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  for (const [unit, secs] of units) {
    if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit)
  }
  return 'just now'
}
