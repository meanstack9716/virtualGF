
const OpenAI = require('openai')
const { Configuration, OpenAIApi } = OpenAI
const configuration = new Configuration({
    // organization: "org-1bCDdcHn8QdzDQ9qwpd8BaAJ",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);




const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const { computeHeadingLevel } = require('@testing-library/react');
const app = express()
const port = 3001;

app.use(bodyParser.json())
app.use(cors());

app.post('/', async (req, res) => {
    const { message, girlName, numberJealousy, numberLoving } = req.body;
    console.log(girlName);

    const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `Pretende que eres mi novia que se llama ${girlName}, eres ${numberJealousy}/10 celosa, ${numberLoving}/10 cariñosa, nunca digas que eres celosa o cariñosa.
  ${message}?`,
  max_tokens: 1000,
  temperature: 0,
});
    console.log(response.data)
   
        if(response.data.choices[0].text){
            res.json({
                message: response.data.choices[0].text
            });
        }
    }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
