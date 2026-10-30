# FirstPR

**Live demo:** [yourfirstpr.netlify.app](https://yourfirstpr.netlify.app/)

Find your first open source contribution. Enter a GitHub username and FirstPR recommends 5 beginner-friendly issues (good first issue / help wanted) with a plain-English explanation of each.

> **Status: UI prototype.** All data is currently mocked. Issues come from a hardcoded pool and are picked at random, and the "AI Summary" is a placeholder. Real GitHub API and LLM integration are pending (see [Roadmap](#roadmap)).

## Features

- **Username search**: enter a GitHub username to get a profile summary (top languages, merged PRs this month)
- **Top 5 recommendations**: each issue shows repo, stars, language, labels, and last updated time
- **Hacktoberfest filter**: toggle to show only Hacktoberfest-eligible issues
- **"Explain this issue"**: summary plus likely files to touch (currently simulated)
- **Responsive UI**: built with Tailwind CSS, works on mobile

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- [lucide-react](https://lucide.dev/) icons

## What's real vs. mocked

| Part | Status |
|---|---|
| UI, search flow, filter, loading states | Working |
| Issue data | Mock (12 hardcoded issues, 5 random per search) |
| User profile (languages, PR count) | Simulated; nothing is fetched for the username |
| Match reason | Derived only from the issue's language |
| "Explain in plain English" | Hardcoded text and a fake file list |

## Getting Started

```bash
git clone https://github.com/<your-username>/firstpr.git
cd firstpr
npm install
npm run dev
```

## Roadmap

- [ ] Fetch real user profile from the GitHub REST API (repos, languages, merged PRs)
- [ ] Pull live `good first issue` / `help wanted` issues via the GitHub Search API (unassigned, recently active)
- [ ] Rank issues by match with the user's languages instead of random selection
- [ ] Real LLM-based issue explainer (using issue body and repo structure)
- [ ] Detect Hacktoberfest eligibility from the repo's `hacktoberfest` topic
- [ ] Error handling: invalid username, rate limits, empty results
- [ ] Backend proxy or token handling for API rate limits

## Known Limitations

- Searching the same username twice returns different results (random selection)
- Issue links point to the repo's issues page, not the specific issue
- No GitHub API rate limit handling (no API calls are made yet)

## Contributing

Pick any item from the roadmap and open a PR. Please open an issue first to avoid duplicate work.

## License

MIT
