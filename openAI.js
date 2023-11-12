import express from 'express';
import OpenAI from 'openai';

function initAI() {
    const openai = new OpenAI({
        apiKey: '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'
    });

    return openai;
}

async function sendToAI(prompt, openai) {
    const response = await openai.chat.completions.create({
        model : "gpt-4",
        messages: [
            {"role": "system", "content": "Do comparisions based on pros and cons from the two \
            companies in the JSONs and output under JSON format with the following fields: \
            list of pros, list of cons, both containing fieldname and description. "},
            {"role": "user", "content": prompt}
        ],
    });

    return response.choices[0].message;
}

export { initAI as initAI, sendToAI as sendToAI };

// const app = express();
// app.use(express.json());

// app.get('/getResponse', async (req,res) => {
//     const response = await sendToAI(req.body.prompt);
//     res.send(response);
// });

// app.listen(3000, () => {
//     console.log("Listening on port 3000");
// });