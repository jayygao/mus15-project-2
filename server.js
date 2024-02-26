const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: "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"
});

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/", async(req,res) => {
    const {prompt} = req.body;
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": prompt}],
        max_tokens: 512,
        temperature: 0.7,
    });
    console.log(chatCompletion.choices[0].message);
    const reply = chatCompletion.choices[0].message.content;
    res.status(200).json({ message: reply });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT);
});