const chatContainer = document.getElementById("chatContainer");
const userInput = document.getElementById("userInput");
const micBtn = document.getElementById("micBtn");
const languageSelect = document.getElementById("language");
const emptyState = document.getElementById("emptyState");

// Add message to the chat container
function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = `message ${type}`;
  msg.textContent = text;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Handle sending message
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";
  emptyState.style.display = "none";

  try {
    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: text }],
      }),
    });

    const data = await res.json();
    console.log("Server response:", data);

    const botReply = data?.reply || "⚠️ No response from Gemini.";
    addMessage(botReply, "bot");
  } catch (err) {
    console.error("Error:", err);
    addMessage("⚠️ Failed to get response.", "bot");
  }
}

// Button: New Chat
function newChat() {
  chatContainer.innerHTML = "";
  emptyState.style.display = "block";
}

// Button: Search Chats
function searchChats() {
  alert("🔍 Search feature coming soon!");
}

// Button: Load Library
function loadLibrary() {
  alert("📚 Library loading coming soon!");
}

// Voice Recognition
let recognition;

if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => micBtn.classList.add("listening");
  recognition.onend = () => micBtn.classList.remove("listening");

  recognition.onresult = (event) => {
    const speech = event.results[0][0].transcript;
    userInput.value = speech;
    sendMessage();
  };
} else {
  micBtn.style.display = "none";
  console.warn("Speech Recognition not supported");
}

function startListening() {
  const lang = languageSelect.value;
  if (recognition) {
    recognition.lang = lang;
    recognition.start();
  }
}

// Make functions globally accessible
window.sendMessage = sendMessage;
window.newChat = newChat;
window.searchChats = searchChats;
window.loadLibrary = loadLibrary;
window.startListening = startListening;


