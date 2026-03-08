import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * POST /api/chat
 * Handles chat questions about the analyzed repository
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, repoUrl, context, conversationHistory } = body;

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Build conversation context
    let conversationContext = "";
    if (conversationHistory && conversationHistory.length > 0) {
      conversationContext = conversationHistory
        .map((msg: any) => `${msg.role === "user" ? "Student" : "Assistant"}: ${msg.content}`)
        .join("\n\n");
    }

    const prompt = `You are a helpful AI assistant helping students understand a GitHub repository.

Repository URL: ${repoUrl}

Initial Analysis:
${context}

${conversationContext ? `Previous Conversation:\n${conversationContext}\n\n` : ""}

Student's Question: ${question}

Instructions:
- Answer the student's question clearly and helpfully using markdown formatting
- Use **bold** for emphasis, \`code\` for technical terms, and bullet points for lists
- Use the repository analysis context to provide accurate information
- If the question is about something not in the analysis, say so politely
- Be encouraging and educational
- Use simple language when explaining technical concepts
- Provide examples when helpful
- If asked about code, explain it step by step with proper formatting

Answer (use markdown formatting):`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    return NextResponse.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("Chat error:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
