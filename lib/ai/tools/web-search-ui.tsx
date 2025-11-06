import { tavily } from "@tavily/core";
import { tool } from "ai";
import { Loader2, Search } from "lucide-react";
import { z } from "zod";

// Initialize Tavily client
const tavilyClient = process.env.TAVILY_API_KEY
  ? tavily({ apiKey: process.env.TAVILY_API_KEY })
  : null;

// Loading component
function WebSearchLoading({ query }: { query: string }) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-xl border border-border bg-muted/30 p-4">
      <div className="flex items-center gap-2">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <div className="flex items-center gap-2 font-medium text-foreground text-sm">
          <Search className="h-4 w-4" />
          Searching the web...
        </div>
      </div>
      <div className="rounded-lg bg-background/50 p-3">
        <p className="text-muted-foreground text-sm">
          Query: <span className="font-medium text-foreground">{query}</span>
        </p>
      </div>
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div
            className="animate-pulse rounded-lg border border-border bg-background p-3"
            key={i}
          >
            <div className="mb-2 h-4 w-3/4 rounded bg-muted" />
            <div className="h-3 w-full rounded bg-muted/50" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Result component
function WebSearchResults({
  query,
  answer,
  results,
  images,
  responseTime,
}: {
  query: string;
  answer?: string;
  results: Array<{
    title: string;
    url: string;
    content: string;
    score: number;
    publishedDate?: string;
  }>;
  images?: Array<string | { url: string; description?: string }>;
  responseTime?: number;
}) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border border-border bg-background p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Web Search Results</h3>
        </div>
        {responseTime && (
          <span className="text-muted-foreground text-xs">
            {(responseTime / 1000).toFixed(2)}s
          </span>
        )}
      </div>

      {/* Query */}
      <div className="rounded-lg bg-muted/50 p-3">
        <p className="text-muted-foreground text-sm">
          Query: <span className="font-medium text-foreground">{query}</span>
        </p>
      </div>

      {/* AI Answer */}
      {answer && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded-full bg-primary/20 p-1">
              <svg
                className="h-4 w-4 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Answer</title>
                <path
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <span className="font-semibold text-primary text-sm">
              AI Summary
            </span>
          </div>
          <p className="text-foreground text-sm leading-relaxed">{answer}</p>
        </div>
      )}

      {/* Images */}
      {images && images.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-foreground text-sm">Images</h4>
          <div className="grid grid-cols-3 gap-2">
            {images.slice(0, 6).map((image, index) => {
              const imageUrl = typeof image === "string" ? image : image.url;
              return (
                <div
                  className="aspect-video overflow-hidden rounded-lg border border-border bg-muted"
                  key={index}
                >
                  <img
                    alt={`Search result ${index + 1}`}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23f0f0f0' width='100' height='100'/%3E%3C/svg%3E";
                    }}
                    src={imageUrl}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Results */}
      <div className="space-y-2">
        <h4 className="font-medium text-foreground text-sm">
          Sources ({results.length})
        </h4>
        <div className="space-y-2">
          {results.map((result, index) => (
            <a
              className="block rounded-lg border border-border bg-muted/30 p-3 transition-colors hover:border-primary/50 hover:bg-muted/50"
              href={result.url}
              key={index}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="mb-1 flex items-start justify-between gap-2">
                <h5 className="line-clamp-1 font-medium text-foreground">
                  {result.title}
                </h5>
                <svg
                  className="h-4 w-4 shrink-0 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>External link</title>
                  <path
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <p className="mb-2 line-clamp-2 text-muted-foreground text-sm">
                {result.content}
              </p>
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <span className="truncate">{new URL(result.url).hostname}</span>
                {result.publishedDate && (
                  <>
                    <span>•</span>
                    <span>{result.publishedDate}</span>
                  </>
                )}
                <span>•</span>
                <span>Score: {(result.score * 100).toFixed(0)}%</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export const webSearchUI = tool({
  description:
    "Search the web for up-to-date information, news, facts, and current events. Use this when you need real-time information that might not be in your training data.",
  inputSchema: z.object({
    query: z
      .string()
      .min(1)
      .max(200)
      .describe("The search query to find relevant information on the web"),
    maxResults: z
      .number()
      .int()
      .min(1)
      .max(10)
      .optional()
      .describe("Maximum number of results to return (default: 5)"),
    searchDepth: z
      .enum(["basic", "advanced"])
      .optional()
      .describe(
        "Search depth - 'basic' for quick results, 'advanced' for more comprehensive search (default: basic)"
      ),
    includeAnswer: z
      .boolean()
      .optional()
      .describe(
        "Whether to include a generated answer based on search results (default: true)"
      ),
  }),
  async *generate({
    query,
    maxResults = 5,
    searchDepth = "basic",
    includeAnswer = true,
  }) {
    // Show loading state
    yield <WebSearchLoading query={query} />;

    // Check if Tavily API key is configured
    if (!tavilyClient) {
      return (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/50">
          <p className="text-amber-700 text-sm dark:text-amber-400">
            Web search is not configured. Please add TAVILY_API_KEY to your
            environment variables.
          </p>
        </div>
      );
    }

    try {
      // Perform the search using Tavily
      const response = await tavilyClient.search(query, {
        maxResults,
        searchDepth,
        includeAnswer,
        includeRawContent: false,
      });

      // Format the results
      const formattedResults = response.results.map((result) => ({
        title: result.title,
        url: result.url,
        content: result.content,
        score: result.score,
        publishedDate: result.publishedDate,
      }));

      // Return the results component
      return (
        <WebSearchResults
          answer={response.answer}
          images={response.images}
          query={query}
          responseTime={response.responseTime}
          results={formattedResults}
        />
      );
    } catch (error) {
      console.error("Tavily search error:", error);

      return (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/50">
          <p className="text-red-600 text-sm dark:text-red-400">
            {error instanceof Error
              ? error.message
              : "Failed to perform web search"}
          </p>
        </div>
      );
    }
  },
});
