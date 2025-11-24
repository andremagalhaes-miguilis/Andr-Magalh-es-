import { GoogleGenAI } from "@google/genai";
import { Sale, Product, Supply } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getBusinessInsight = async (
  prompt: string,
  context: { sales: Sale[], products: Product[], supplies: Supply[] }
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Prepare context for the AI
    const contextString = `
      Context Data:
      Total Sales Records: ${context.sales.length}
      Top Selling Product Context: ${context.products.map(p => `${p.name} ($${p.price})`).join(', ')}
      Supply Status: ${context.supplies.map(s => `${s.name}: ${s.status}`).join(', ')}
    `;

    const fullPrompt = `
      You are an expert Coffee Shop Manager AI Assistant. 
      Analyze the following context and answer the user's question.
      Keep the answer concise, professional, and actionable.
      
      ${contextString}

      User Question: ${prompt}
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
    });

    return response.text || "I couldn't generate an insight at this moment.";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "Sorry, I am having trouble connecting to the AI brain right now. Please check your API key.";
  }
};