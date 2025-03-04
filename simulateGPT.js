// simulateGPT.js


// Conversation memory to store user and meco messages
let conversationMemory = [];

// Predefined responses for various niches with variations
const responses = {
  travel: [
    "Travel is undergoing a renaissance with sustainable tourism and virtual experiences. What appeals to you?",
    "The travel industry is reinventing itself. Are you interested in adventure travel or luxury escapes?",
    "With travel evolving, topics like eco-tourism and digital nomadism are gaining traction.",
    "Exploring travel can be exciting. Consider discussing cultural experiences or travel hacks."
  ],
  sports: [
    "Sports are a global phenomenon. Do you enjoy discussing football, basketball, or other sports?",
    "The sports industry is vast. Are you interested in sports analytics or athlete training?",
    "Creating content around sports can be thrilling. Think about covering major events or sports history."
  ],
  fashion: [
    "Fashion is ever-changing. Have you explored sustainable fashion or streetwear trends?",
    "The fashion industry is diverse. What aspect of fashion interests you: design, modeling, or retail?",
    "Fashion blogging can be creative. Consider topics like fashion history or seasonal trends.",
    "Fashion is about expression. Are you interested in haute couture or everyday fashion?"
  ],
  food: [
    "Food trends are constantly changing. Have you explored plant-based diets or gourmet cooking?",
    "The culinary world is vast. What interests you more: baking, international cuisine, or food science?",
    "Food blogging can be exciting. Consider topics like sustainable eating or food photography."
    ],
  education: [
    "Education is evolving with technology. Are you interested in e-learning or educational apps?",
    "The future of education includes personalized learning and AI tutors. What aspect excites you?",
    "Exploring education trends can be rewarding. Think about topics like remote learning or STEM education."
    ],
  entertainment: [
    "Entertainment is diverse. Do you prefer discussing movies, music, or video games?",
    "The entertainment industry is booming with streaming services and virtual reality. What's your favorite trend?",
    "Creating content around entertainment can be fun. Consider exploring pop culture or celebrity news."
    ],
  finance: [
    "Finance is a dynamic field. Are you interested in personal finance, investing, or cryptocurrency?",
    "The world of finance is evolving with fintech and blockchain. What intrigues you the most?",
    "Finance topics can be complex but rewarding. Think about discussing financial planning or market trends."
    ],
  technology: [
    "Technology is evolving rapidly. Have you checked out the latest in AI or IoT?",
    "The tech world buzzes with innovation. Blockchain and AI are reshaping industries.",
    "Exploring tech trends can lead to exciting content ideas. What interests you most in technology?"
  ],
  health: [
    "Health and wellness are trending. Have you considered exploring fitness tech or mental health apps?",
    "The intersection of health and technology offers unique insights. What aspect of health excites you?",
    "There’s a lot happening in health innovation—think nutrition tech or telemedicine."
  ],
  business: [
    "Business today is about digital transformation. What area intrigues you: startups, marketing, or finance?",
    "Modern business trends emphasize agility and innovation. Have you thought about disruptive business models?",
    "The business landscape is evolving with tech. Consider exploring e-commerce or remote work strategies."
  ],
  travel: [
    "Travel is undergoing a renaissance with sustainable tourism and virtual experiences. What appeals to you?",
    "The travel industry is reinventing itself. Are you interested in adventure travel or luxury escapes?",
    "With travel evolving, topics like eco-tourism and digital nomadism are gaining traction."
  ],
  default: [
    "That's an interesting niche! Could you be more specific? Try keywords like 'technology', 'health', 'business', or 'travel'.",
    "I'm not sure I understand. Can you please elaborate or mention a common niche?"
  ],
  greeting: [
    "Hello! How can I assist you today?",
    "Hi there! What niche or topic are you interested in exploring?"
  ],
  farewell: [
    "Goodbye! Feel free to return if you need more content ideas.",
    "Farewell! Remember, the world is full of content inspiration."
  ]
};

// Utility: choose a random element from an array
function chooseRandomResponse(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Main function to simulate a GPT-like response
function simulateGPTResponse(prompt) {
  const lowerPrompt = prompt.toLowerCase(); // Define lowerPrompt here

  // Check for greeting or farewell keywords
  if (lowerPrompt.includes("hello") || lowerPrompt.includes("hi")) {
    const greetingResponse = chooseRandomResponse(responses.greeting);
    conversationMemory.push({
      role: "meco",
      text: greetingResponse,
      timestamp: new Date().toLocaleTimeString()
    });
    return greetingResponse;
  }

  if (lowerPrompt.includes("goodbye") || lowerPrompt.includes("farewell")) {
    const farewellResponse = chooseRandomResponse(responses.farewell);
    conversationMemory.push({
      role: "meco",
      text: farewellResponse,
      timestamp: new Date().toLocaleTimeString()
    });
    return farewellResponse;
  }

  // Save the user's prompt in the conversation memory with a timestamp
  conversationMemory.push({
    role: "user",
    text: prompt,
    timestamp: new Date().toLocaleTimeString()
  });

  let response = "";

  // Check each key in the responses object to find a match
  for (const key in responses) {
    if (lowerPrompt.includes(key)) {
      response = chooseRandomResponse(responses[key]);
      break;
    }
  }

  // If no match is found, use the default responses
  if (!response) {
    response = chooseRandomResponse(responses.default);
  }

  // Save the meco's response in the conversation memory
  conversationMemory.push({
    role: "meco",
    text: response,
    timestamp: new Date().toLocaleTimeString()
  });

  return response;
}

export { simulateGPTResponse };