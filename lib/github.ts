// GitHub API client for fetching repository data

interface RepoData {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  open_issues_count: number;
  license: {
    name: string;
  } | null;
}

interface LanguageData {
  [key: string]: number;
}

interface RepoAnalysisData {
  metadata: RepoData;
  languages: LanguageData;
  readme: string;
}

/**
 * Extract owner and repository name from GitHub URL
 */
export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/").filter(Boolean);

    if (pathParts.length >= 2) {
      return {
        owner: pathParts[0],
        repo: pathParts[1],
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch repository metadata from GitHub API
 */
async function fetchRepoMetadata(owner: string, repo: string): Promise<RepoData> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  // Add GitHub token if available (increases rate limit)
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers,
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Repository not found");
    }
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch programming languages used in the repository
 */
async function fetchRepoLanguages(owner: string, repo: string): Promise<LanguageData> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
    headers,
  });

  if (!response.ok) {
    return {};
  }

  return response.json();
}

/**
 * Fetch README content from the repository
 */
async function fetchRepoReadme(owner: string, repo: string): Promise<string> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3.raw",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers,
  });

  if (!response.ok) {
    return "No README available";
  }

  const readme = await response.text();
  
  // Limit README length to avoid token limits (first 3000 characters)
  return readme.slice(0, 3000);
}

/**
 * Main function to fetch all repository data
 */
export async function fetchRepositoryData(repoUrl: string): Promise<RepoAnalysisData> {
  // Parse GitHub URL
  const parsed = parseGitHubUrl(repoUrl);
  
  if (!parsed) {
    throw new Error("Invalid GitHub URL format");
  }

  const { owner, repo } = parsed;

  // Fetch all data in parallel
  const [metadata, languages, readme] = await Promise.all([
    fetchRepoMetadata(owner, repo),
    fetchRepoLanguages(owner, repo),
    fetchRepoReadme(owner, repo),
  ]);

  return {
    metadata,
    languages,
    readme,
  };
}
