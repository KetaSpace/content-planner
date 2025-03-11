// simulateGPT.js

// Conversation memory to store user and meco messages
let conversationMemory = [];

// Predefined responses for various niches and common phrases
const responses = {
  greeting: [
    "Hey there! 👋 How can I help you today? Let's dive into some exciting topics! 🚀",
    "Hi! 😊 What niche or topic are you curious about? Let's explore together! 🌟"
  ],
  farewell: [
    "Goodbye! 👋 Don't hesitate to come back if you need more content ideas. Stay inspired! ✨",
    "Farewell! 🌈 Remember, creativity is just a message away. See you soon! 🌟"
  ],
  travel: [
    "🌍 Travel is booming with sustainable tourism and virtual experiences. What excites you the most? ✈️ #Travel #Explore",
    "🌟 The travel industry is reinventing itself! Are you into adventure travel or luxury escapes? 🏝️ #TravelGoals #Wanderlust"
  ],
  sports: [
    "🏀 Sports are a global phenomenon! Do you love talking about football, basketball, or other sports? ⚽ #SportsTalk #GameOn",
    "⚡ Creating content around sports can be thrilling! What aspect interests you the most? 🏆 #SportsContent #AthleteLife"
  ],
  fashion: [
    "👗 Fashion is ever-changing! Have you explored sustainable fashion or streetwear trends? 🌿 #FashionTrends #Style",
    "✨ The fashion industry offers endless inspiration! What intrigues you: design, modeling, or retail? 👠 #FashionInspo #Runway"
  ],
  food: [
    "🍽️ Food trends are always evolving! Do you prefer gourmet cooking, baking, or international cuisine? 🍰 #Foodie #Yum",
    "🍴 Food content can be deliciously creative! What interests you most in culinary topics? 🌮 #CulinaryArts #FoodLover"
  ],
  education: [
    "📚 Education is transforming with digital innovation! Are you into e-learning or educational apps? 💻 #EdTech #Learning",
    "🎓 The future of education is dynamic! What excites you: remote learning or STEM education? 🔬 #Education #FutureLearning"
  ],
  finance: [
    "💰 Finance is a dynamic field! Are you interested in personal finance, investing, or cryptocurrency? 📈 #Finance #Investing",
    "📊 Modern finance trends are evolving rapidly! What intrigues you the most? 💸 #Crypto #FinancialFreedom"
  ],
  technology: [
    "🤖 Technology is evolving rapidly! Have you checked out the latest in AI or IoT? 🌐 #TechTrends #Innovation",
    "💡 The tech world buzzes with innovation! What interests you most in technology? 🚀 #TechNews #FutureTech"
  ],
  health: [
    "💪 Health and wellness are trending! Have you considered exploring fitness tech or mental health apps? 🧘 #Wellness #HealthTech",
    "🩺 There’s a lot happening in health innovation! What aspect excites you most? 🌿 #Health #Innovation"
  ],
  business: [
    "📈 Business today is about digital transformation! What area intrigues you: startups, marketing, or finance? 💼 #Business #Entrepreneur",
    "🚀 Modern business trends emphasize agility and innovation! What interests you most in business? 🌟 #BusinessTrends #Innovation"
  ],
  default: [
    "🤔 That's an interesting niche! Could you be more specific? Try keywords like 'technology', 'health', 'business', or 'travel'. 🌍 #ContentIdeas #Niche",
    "❓ I'm not sure I understand. Could you please elaborate? Let's get to the bottom of it! 💬 #Clarify #Help"
  ]
};

// Utility: choose a random element from an array
function chooseRandomResponse(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Main function to simulate a GPT-like response
function simulateGPTResponse(prompt) {
  if (prompt.toLowerCase().includes("[deep]")) {
    return "Deep analysis requested - please use the 'deep ' prefix for detailed insights.";
  }
  const lowerPrompt = prompt.toLowerCase();

  // Handle greetings and farewells
  if (lowerPrompt.includes("hello") || lowerPrompt.includes("hi")) {
    const greetingResponse = chooseRandomResponse(responses.greeting);
    conversationMemory.push({ role: "meco", text: greetingResponse, timestamp: new Date().toLocaleTimeString() });
    return greetingResponse;
  }
  if (lowerPrompt.includes("goodbye") || lowerPrompt.includes("farewell")) {
    const farewellResponse = chooseRandomResponse(responses.farewell);
    conversationMemory.push({ role: "meco", text: farewellResponse, timestamp: new Date().toLocaleTimeString() });
    return farewellResponse;
  }

  // Save user prompt in conversation memory
  conversationMemory.push({ role: "user", text: prompt, timestamp: new Date().toLocaleTimeString() });

  // Try to find a matching category based on keywords
  let response = "";
  for (const key in responses) {
    if (key !== "greeting" && key !== "farewell" && key !== "default" && lowerPrompt.includes(key)) {
      response = chooseRandomResponse(responses[key]);
      break;
    }
  }
  if (!response) {
    response = chooseRandomResponse(responses.default);
  }
  
  // Save meco response in conversation memory
  conversationMemory.push({ role: "meco", text: response, timestamp: new Date().toLocaleTimeString() });
  return response;
}

export { simulateGPTResponse };
