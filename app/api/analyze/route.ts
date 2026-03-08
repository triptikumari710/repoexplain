import { NextRequest, NextResponse } from "next/server";
import { fetchRepositoryData } from "@/lib/github";
import { analyzeRepositoryWithAI } from "@/lib/gemini";

/**
 * POST /api/analyze
 * Analyzes a GitHub repository using AI
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { repoUrl, eli5 } = body;

    // Validate input
    if (!repoUrl || typeof repoUrl !== "string") {
      return NextResponse.json(
        { error: "Repository URL is required" },
        { status: 400 }
      );
    }

    // Step 1: Fetch repository data from GitHub
    const repoData = await fetchRepositoryData(repoUrl);

    // Step 2: Analyze repository with Gemini AI
    const analysis = await analyzeRepositoryWithAI(repoData, eli5 || false);

    // Step 3: Return the analysis
    return NextResponse.json({
      success: true,
      analysis,
      metadata: {
        name: repoData.metadata.full_name,
        stars: repoData.metadata.stargazers_count,
        url: repoData.metadata.html_url,
      },
    });
  } catch (error) {
    console.error("Analysis error:", error);

    // Handle specific error types
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
