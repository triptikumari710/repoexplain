// Google Gemini API client for AI analysis

import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Initialize Gemini AI client
 */
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }

  return new GoogleGenerativeAI(apiKey);
}

/**
 * Generate AI analysis of repository data using Gemini
 */
export async function analyzeRepositoryWithAI(repoData: {
  metadata: any;
  languages: any;
  readme: string;
}): Promise<string> {
  try {
    const genAI = getGeminiClient();
    
    // Use gemini-2.5-flash which is available with the API key
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash"
    });

    // Construct the prompt with repository data
    const prompt = `You are a senior software engineer. Analyze the following GitHub repository data and explain it clearly.

Provide the answer in this structure using markdown formatting:

## Project Overview
Explain what the project does in 2-3 sentences.

## Tech Stack
List programming languages and frameworks used.

## Key Features
List 3-5 main functionalities or capabilities.

## Project Structure
Explain important folders, components, or architecture patterns.

## Who Should Use This Project
Explain the target audience and use cases.

Repository Data:
- Name: ${repoData.metadata.full_name}
- Description: ${repoData.metadata.description || "No description provided"}
- Stars: ${repoData.metadata.stargazers_count}
- Forks: ${repoData.metadata.forks_count}
- Primary Language: ${repoData.metadata.language || "Not specified"}
- Topics: ${repoData.metadata.topics.join(", ") || "None"}
- Languages Used: ${Object.keys(repoData.languages).join(", ") || "Not available"}
- License: ${repoData.metadata.license?.name || "No license"}
- Open Issues: ${repoData.metadata.open_issues_count}

README Content:
${repoData.readme}

Provide a clear, professional analysis.`;

    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Gemini API error:", error);
    
    // Provide more specific error message
    if (error instanceof Error) {
      throw new Error(`Gemini API Error: ${error.message}. Please verify your API key is valid and has access to Gemini models.`);
    }
    
    throw new Error("Failed to generate AI analysis. Please check your API key and try again.");
  }
}
