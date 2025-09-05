// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Gemini client with your API key
const genAI = new GoogleGenerativeAI("AIzaSyCeGjERSVfavU-aZIWCHEyxB05Ucc4NT-Y");

// Choose a Gemini model (latest is gemini-1.5-flash or gemini-1.5-pro)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    // Convert messages (like OpenAI format) into a single prompt
    const prompt = messages.map(m => `${m.role}: ${m.content}`).join("\n");

    const result = await model.generateContent(prompt);

    res.json({ reply: result.response.text() });
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: "API error", details: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
