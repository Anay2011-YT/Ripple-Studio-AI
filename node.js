// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: "AIzaSyCUKlCNM9lo8uMIuilRQA84kT50-u6Iayk"
}));

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const completion = await openai.createChatCompletion({
      model: "gpt-4", // or "gpt-3.5-turbo"
      messages,
      temperature: 0.7,
    });
    res.json({ reply: completion.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "API error" });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
