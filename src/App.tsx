import React, { useState } from "react";
import {
  Search,
  Github,
  CheckCircle2,
  Clock,
  Star,
  BookOpen,
  Zap,
  Loader2,
  GitPullRequest,
  ArrowLeft,
} from "lucide-react";

interface Issue {
  id: number;
  repo: string;
  title: string;
  url: string;
  stars: number;
  language: string;
  labels: string[];
  lastUpdated: string;
  matchReason: string;
  isHacktoberfest: boolean;
  explainer?: string;
  filesToTouch?: string[];
}

interface UserProfile {
  username: string;
  topLanguages: string[];
  mergedPrsThisMonth: number;
}

const MOCK_ISSUES_POOL: Issue[] = [
  {
    id: 1,
    repo: "facebook/react",
    title: "Fix hydration mismatch warning on dev server",
    url: "https://github.com/facebook/react/issues",
    stars: 210000,
    language: "JavaScript",
    labels: ["good first issue", "bug"],
    lastUpdated: "2 days ago",
    matchReason: "",
    isHacktoberfest: false,
  },
  {
    id: 2,
    repo: "vercel/next.js",
    title: "Add documentation for new Image component prop",
    url: "https://github.com/vercel/next.js/issues",
    stars: 112000,
    language: "TypeScript",
    labels: ["good first issue", "docs"],
    lastUpdated: "5 hours ago",
    matchReason: "You frequently contribute to docs.",
    isHacktoberfest: true,
  },
  {
    id: 3,
    repo: "python/cpython",
    title: "Update deprecated module in test suite",
    url: "https://github.com/python/cpython/issues",
    stars: 56000,
    language: "Python",
    labels: ["good first issue", "testing"],
    lastUpdated: "1 week ago",
    matchReason: "",
    isHacktoberfest: true,
  },
  {
    id: 4,
    repo: "tailwindlabs/tailwindcss",
    title: "Typo in configuration error message",
    url: "https://github.com/tailwindlabs/tailwindcss/issues",
    stars: 72000,
    language: "HTML",
    labels: ["good first issue"],
    lastUpdated: "3 days ago",
    matchReason: "",
    isHacktoberfest: false,
  },
  {
    id: 5,
    repo: "freeCodeCamp/freeCodeCamp",
    title: "Fix broken link in basic algorithms section",
    url: "https://github.com/freeCodeCamp/freeCodeCamp/issues",
    stars: 380000,
    language: "JavaScript",
    labels: ["help wanted"],
    lastUpdated: "12 days ago",
    matchReason: "",
    isHacktoberfest: true,
  },
  {
    id: 6,
    repo: "microsoft/vscode",
    title: "Missing aria-label on sidebar toggle button",
    url: "https://github.com/microsoft/vscode/issues",
    stars: 154000,
    language: "TypeScript",
    labels: ["good first issue", "accessibility"],
    lastUpdated: "1 day ago",
    matchReason: "",
    isHacktoberfest: false,
  },
  {
    id: 7,
    repo: "django/django",
    title: "Fix outdated tutorial link in authentication docs",
    url: "https://github.com/django/django/issues",
    stars: 75000,
    language: "Python",
    labels: ["good first issue", "docs"],
    lastUpdated: "4 days ago",
    matchReason: "",
    isHacktoberfest: true,
  },
  {
    id: 8,
    repo: "kubernetes/kubernetes",
    title: "Remove unused constant in kubelet config",
    url: "https://github.com/kubernetes/kubernetes/issues",
    stars: 104000,
    language: "Go",
    labels: ["good first issue"],
    lastUpdated: "2 weeks ago",
    matchReason: "",
    isHacktoberfest: false,
  },
  {
    id: 9,
    repo: "rust-lang/rust",
    title: "Typo in compiler error message for missing trait",
    url: "https://github.com/rust-lang/rust/issues",
    stars: 92000,
    language: "Rust",
    labels: ["E-easy", "help wanted"],
    lastUpdated: "6 hours ago",
    matchReason: "",
    isHacktoberfest: true,
  },
  {
    id: 10,
    repo: "vuejs/core",
    title: "Add warning for deprecated transition hook",
    url: "https://github.com/vuejs/core/issues",
    stars: 43000,
    language: "JavaScript",
    labels: ["good first issue"],
    lastUpdated: "3 days ago",
    matchReason: "",
    isHacktoberfest: false,
  },
  {
    id: 11,
    repo: "spring-projects/spring-boot",
    title: "Add missing @Nullable annotation to WebMvcConfigurer",
    url: "https://github.com/spring-projects/spring-boot/issues",
    stars: 71000,
    language: "Java",
    labels: ["ideal-for-contribution"],
    lastUpdated: "5 days ago",
    matchReason: "",
    isHacktoberfest: true,
  },
  {
    id: 12,
    repo: "nodejs/node",
    title: "Improve error message when fs.readFile fails on directory",
    url: "https://github.com/nodejs/node/issues",
    stars: 102000,
    language: "C++",
    labels: ["good first issue"],
    lastUpdated: "1 week ago",
    matchReason: "",
    isHacktoberfest: false,
  },
];

export default function App() {
  const [username, setUsername] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [hacktoberfestOnly, setHacktoberfestOnly] = useState<boolean>(false);
  const [explainingIssueId, setExplainingIssueId] = useState<number | null>(
    null,
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsSearching(true);

    // Simulate GitHub API latency and generate dynamic results
    setTimeout(() => {
      // 1. Pick 5 random issues from the pool
      const randomIssues = [...MOCK_ISSUES_POOL]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

      // 2. Extract languages from those issues to build a realistic profile
      const extractedLangs = Array.from(
        new Set(randomIssues.map((i) => i.language)),
      ).slice(0, 3);
      const fallbacks = ["JavaScript", "Python", "TypeScript"];
      while (extractedLangs.length < 3) {
        const fb = fallbacks[Math.floor(Math.random() * fallbacks.length)];
        if (!extractedLangs.includes(fb)) extractedLangs.push(fb);
      }

      // 3. Set the simulated profile
      setProfile({
        username: username,
        topLanguages: extractedLangs,
        mergedPrsThisMonth: Math.floor(Math.random() * 8),
      });

      // 4. Update the match reasons dynamically based on the language
      const finalIssues = randomIssues.map((issue) => ({
        ...issue,
        matchReason:
          issue.matchReason || `Matches your top language: ${issue.language}`,
      }));

      setIssues(finalIssues);
      setIsSearching(false);
    }, 1200);
  };

  const handleExplain = (id: number) => {
    setExplainingIssueId(id);

    // Simulate AI Explainer LLM latency
    setTimeout(() => {
      setIssues((prev) =>
        prev.map((issue) => {
          if (issue.id === id) {
            return {
              ...issue,
              explainer:
                "This issue requires you to locate the relevant string in the files and update it to fix the problem. It is a straightforward replacement.",
              filesToTouch: ["src/index.ts", "tests/main.test.ts"],
            };
          }
          return issue;
        }),
      );
      setExplainingIssueId(null);
    }, 1500);
  };

  const handleReset = () => {
    setProfile(null);
    setUsername("");
    setIssues([]);
    setHacktoberfestOnly(false);
    setExplainingIssueId(null);
  };

  const filteredIssues = hacktoberfestOnly
    ? issues.filter((i) => i.isHacktoberfest)
    : issues;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleReset}
          >
            <Github className="w-6 h-6" />
            <span className="font-bold text-lg tracking-tight">FirstPR</span>
          </div>
          {profile && (
            <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Search
              </button>
              <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200">
                <GitPullRequest className="w-4 h-4" />
                {profile.mergedPrsThisMonth} PRs merged this month
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {!profile ? (
          <div className="max-w-xl mx-auto text-center space-y-8 mt-12">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                Find your first open source contribution.
              </h1>
              <p className="text-lg text-gray-600">
                We analyze your GitHub profile to find unassigned, active{" "}
                <i>good first issues</i> in languages you actually use.
              </p>
            </div>

            <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-4 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your GitHub username"
                  className="w-full pl-12 pr-32 py-4 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="absolute right-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors disabled:opacity-70 flex items-center gap-2"
                >
                  {isSearching ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Search"
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">
                  Welcome, {profile.username}
                </h2>
                <p className="text-gray-600 mt-1">
                  You code mostly in{" "}
                  <span className="font-semibold text-gray-900">
                    {profile.topLanguages.join(", ")}
                  </span>
                </p>
              </div>

              <label className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={hacktoberfestOnly}
                    onChange={(e) => setHacktoberfestOnly(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-orange-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </div>
                <span className="font-medium text-orange-900">
                  Hacktoberfest only
                </span>
              </label>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Top 5 Recommended Issues for You
              </h3>

              <div className="grid gap-4">
                {filteredIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <BookOpen className="w-4 h-4" />
                          <span className="font-medium">{issue.repo}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5" />
                            {(issue.stars / 1000).toFixed(1)}k
                          </span>
                        </div>
                        <a
                          href={issue.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {issue.title}
                        </a>
                      </div>
                      <a
                        href={issue.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium rounded-lg transition-colors border border-blue-200 text-sm"
                      >
                        Go to issue
                      </a>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
                      <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md">
                        <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                        {issue.language}
                      </span>
                      {issue.labels.map((label) => (
                        <span
                          key={label}
                          className="bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-md font-medium"
                        >
                          {label}
                        </span>
                      ))}
                      <span className="flex items-center gap-1 text-gray-500 ml-auto">
                        <Clock className="w-4 h-4" />
                        Updated {issue.lastUpdated}
                      </span>
                    </div>

                    <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4">
                      <p className="text-sm font-medium text-blue-900 mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-blue-500" />
                        {issue.matchReason}
                      </p>

                      {issue.explainer ? (
                        <div className="bg-white p-4 rounded-md border border-blue-100 text-sm space-y-3">
                          <p className="text-gray-700 leading-relaxed">
                            <span className="font-bold text-gray-900">
                              AI Summary:
                            </span>{" "}
                            {issue.explainer}
                          </p>
                          <div>
                            <span className="font-bold text-gray-900 text-xs uppercase tracking-wider">
                              Likely files to touch:
                            </span>
                            <ul className="mt-1.5 space-y-1">
                              {issue.filesToTouch?.map((file) => (
                                <li
                                  key={file}
                                  className="font-mono text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-200 w-fit"
                                >
                                  {file}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleExplain(issue.id)}
                          disabled={explainingIssueId === issue.id}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1.5 transition-colors"
                        >
                          {explainingIssueId === issue.id ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />{" "}
                              Analyzing issue...
                            </>
                          ) : (
                            <>Explain this issue in plain English</>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {filteredIssues.length === 0 && (
                  <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
                    <p className="text-gray-500">
                      No issues found matching your criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
