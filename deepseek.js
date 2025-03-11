// deepseek.js
import { DEEPSEEK_CONFIG } from '../config.js';

export async function deepSeekQuery(prompt) {
  try {
    const response = await fetch(DEEPSEEK_CONFIG.ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_CONFIG.API_KEY}`
      },
      body: JSON.stringify({
        model: DEEPSEEK_CONFIG.MODEL,
        messages: [
          { 
            role: "system", 
            content: "You are a helpful assistant for content creators. Provide detailed, engaging responses."
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('DeepSeek Error:', error);
    throw error;
  }
}