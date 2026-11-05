import { useEffect, useState } from 'react'
import { fetchRepos, type GitHubRepo } from '../lib/github'

type State =
  | { status: 'loading'; repos: GitHubRepo[] }
  | { status: 'ready'; repos: GitHubRepo[] }
  | { status: 'error'; repos: GitHubRepo[]; error: string }

/** Loads public repos once; on failure exposes the error so callers can fall back to curated data. */
export function useGitHubRepos(username: string): State {
  const [state, setState] = useState<State>({ status: 'loading', repos: [] })

  useEffect(() => {
    const controller = new AbortController()
    fetchRepos(username, controller.signal)
      .then((repos) => setState({ status: 'ready', repos }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setState({
          status: 'error',
          repos: [],
          error: err instanceof Error ? err.message : 'Could not reach GitHub',
        })
      })
    return () => controller.abort()
  }, [username])

  return state
}
