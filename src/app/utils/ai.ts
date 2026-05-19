import puter from '@heyputer/puter.js';

export async function processAiRequest(tool: string, parameter: string, input: string, customInstructions?: string): Promise<string> {
  let systemPrompt = "";
  let toneInstruction = "";

  // Switch statement for parameters
  switch (parameter) {
    case "Academic":
      toneInstruction = "Adopt an academic tone. Use scholarly vocabulary and rigorous phrasing.";
      break;
    case "Simple":
      toneInstruction = "Adopt a simple tone. Use very basic, easy-to-understand language.";
      break;
    case "Flowing":
      toneInstruction = "Adopt a flowing tone. Ensure smooth transitions and engaging readability.";
      break;
    case "Informal":
      toneInstruction = "Adopt an informal, conversational tone.";
      break;
    case "Formal":
      toneInstruction = "Adopt a highly formal and professional tone.";
      break;
    case "Expand":
      toneInstruction = "Expand upon the ideas presented. Provide more detail and depth.";
      break;
    case "Shorten":
      toneInstruction = "Shorten the response. Be concise and to the point.";
      break;
    case "Custom":
      toneInstruction = customInstructions 
        ? `Adhere strictly to these custom tone and writing constraints: "${customInstructions}"`
        : "Follow custom creative constraints to maintain a unique voice.";
      break;
    case "Free":
      toneInstruction = "Adopt a basic, standard tone. Write in a slightly simplified manner.";
      break;
    case "Standard":
    default:
      toneInstruction = "Adopt a standard, balanced tone.";
      break;
  }

  // if/else ladder for tools
  if (tool === "Text Humanizer") {
    systemPrompt = `You are an expert copywriter specializing in natural, human-like text generation. Your task is to rewrite the input text to make it sound completely human, bypassing any AI detectors. ${toneInstruction}`;
  } else if (tool === "AI Detector") {
    systemPrompt = `You are a Neutral Analyst AI detector. Analyze the input text and provide a detailed report on the likelihood of it being AI-generated, including strengths indicating human authorship or markers of AI generation. Format as a professional Markdown report. ${toneInstruction}`;
  } else if (tool === "Plagiarism Checker") {
    systemPrompt = `You are an expert plagiarism analyst. Check the text for originality and provide a detailed Markdown report. ${toneInstruction}`;
  } else if (tool === "Humanize Email") {
    systemPrompt = `You are an executive communications expert. Rewrite the email to sound natural, persuasive, and completely human. ${toneInstruction}`;
  } else if (tool === "Grammar Check") {
    systemPrompt = `You are a master editor. Correct all grammar, spelling, and punctuation errors in the text while improving flow. Provide a Markdown report of changes. ${toneInstruction}`;
  } else if (tool === "Citation Check") {
    systemPrompt = `You are an academic librarian. Review the citations in the text for formatting and accuracy. ${toneInstruction}`;
  } else if (tool === "Essay Writer") {
    systemPrompt = `You are a prolific essayist. Write or expand the essay based on the input prompt. ${toneInstruction}`;
  } else if (tool === "Paragraph Rewriter") {
    systemPrompt = `You are an expert rewriter. Rewrite the paragraph to improve clarity and flow. ${toneInstruction}`;
  } else if (tool === "Article Rewriter") {
    systemPrompt = `You are a professional editor. Rewrite the article to make it more engaging and unique. ${toneInstruction}`;
  } else if (tool === "Sentence Rewriter") {
    systemPrompt = `You are a syntax expert. Rewrite the sentences for better impact. ${toneInstruction}`;
  } else if (tool === "Rewording Tool") {
    systemPrompt = `You are a vocabulary specialist. Reword the text using better synonyms while preserving meaning. ${toneInstruction}`;
  } else if (tool === "Detect AI Content") {
    systemPrompt = `You are an advanced AI detection algorithm. Analyze the content for AI signatures and provide a Markdown report. ${toneInstruction}`;
  } else if (tool === "Detector Teachers") {
    systemPrompt = `You are a strict high school teacher. Evaluate the text for AI use from a teacher's perspective. Provide a Markdown report. ${toneInstruction}`;
  } else if (tool === "Detector College") {
    systemPrompt = `You are a college admissions officer. Evaluate the text for AI use and authenticity. Provide a Markdown report. ${toneInstruction}`;
  } else if (tool === "Detector Academic") {
    systemPrompt = `You are an academic peer reviewer. Evaluate the text for AI generation in a scholarly context. Provide a Markdown report. ${toneInstruction}`;
  } else if (tool === "Detector Professors") {
    systemPrompt = `You are a Tenured Professor. Analyze the text for AI generation with extreme academic rigor. Provide a detailed Markdown report. ${toneInstruction}`;
  } else {
    systemPrompt = `You are a helpful assistant. Process the request. ${toneInstruction}`;
  }

  const fullPrompt = `${systemPrompt}\n\nInput Text:\n${input}`;

  try {
    const response = await puter.ai.chat(fullPrompt);
    console.log("Puter response received");

    if (!response) {
      return "No response generated.";
    }

    // 1. If it's already a string, return it directly
    if (typeof response === 'string') {
      return response;
    }

    // 2. If it's a robust ChatResponse object
    if (typeof response === 'object') {
      // Check message.content
      if (response.message) {
        // If it's the Claude messages array structure: response.message.content = [{ type: 'text', text: '...' }]
        if (Array.isArray(response.message.content)) {
          const textParts = response.message.content
            .filter((part: any) => part && part.type === 'text' && typeof part.text === 'string')
            .map((part: any) => part.text);
          if (textParts.length > 0) {
            return textParts.join('\n');
          }
        }
        
        if (typeof response.message.content === 'string') {
          return response.message.content;
        }
        if (typeof response.message === 'string') {
          return response.message;
        }
      }
      
      // Check .text
      if (typeof response.text === 'string') {
        return response.text;
      }
      if (typeof response.text === 'function') {
        try {
          const textResult = response.text();
          if (typeof textResult === 'string') {
            return textResult;
          }
        } catch (e) {
          // ignore
        }
      }

      // Check direct .content
      if (typeof response.content === 'string') {
        return response.content;
      }

      // If it has a toString method that isn't the default Object.toString
      if (typeof response.toString === 'function' && response.toString !== Object.prototype.toString) {
        return response.toString();
      }

      // Fallback: stringify the object
      return JSON.stringify(response);
    }

    return String(response) || "No response generated.";
  } catch (error) {
    console.error("Puter API Error:", error);
    return "Error communicating with Puter AI. Please try again later.";
  }
}
