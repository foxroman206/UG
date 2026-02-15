import { GoogleGenAI, Type } from "@google/genai";
import { RiskAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

export const analyzePropertyIncident = async (description: string): Promise<RiskAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this real estate incident for a "stigmatized property" platform: "${description}"`,
      config: {
        systemInstruction: `You are a professional real estate risk analyst.
        Categorize the incident into 1-5 stars based on:
        1: Natural death
        2: Suicide
        3: Tragic accident
        4: Single homicide
        5: Major crime / Mass tragedy
       
        Provide a JSON response with fields: rating (number), reason (string), psychologicalImpact (string), investmentAdvice (string).`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rating: { type: Type.NUMBER },
            reason: { type: Type.STRING },
            psychologicalImpact: { type: Type.STRING },
            investmentAdvice: { type: Type.STRING },
          },
          required: ["rating", "reason", "psychologicalImpact", "investmentAdvice"]
        }
      }
    });
   
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

export const chatWithPsychic = async (message: string, propertyContext?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: `You are "The Oracle" (問問靈媒), an AI chatbot for the GhostGuide app.
        You give professional but slightly mystical advice on buying stigmatized properties.
        Focus on psychological comfort, feng shui, and practical reuse (e.g., storage, studio, religious use).
        Property context: ${propertyContext || "General inquiries"}.
        Keep responses concise and empathetic. Respond in the user's language (likely Traditional Chinese).`,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "The spirits are silent for now... (Connection Error)";
  }
};

export const generatePurificationImage = async (prompt: string) => {
  // Simulating image editing logic using gemini-2.5-flash-image
  // In a real scenario, we'd send the original photo and ask to "purify/modernize" it.
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: `Professional interior design transformation: ${prompt}. Clean, minimalist, bright, high-end real estate photography.`,
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "1K"
        }
      }
    });
   
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Purification Error:", error);
    return null;
  }
};