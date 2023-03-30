import { ChatMessage } from "../types";

const apiKey = import.meta.env.VITE_REACT_APP_GPT_API_KEY;

const systemMessage = {
  role: "system",
  content: `As a ReactJS AI assistant, you're helping a programmer 
  develop a web app in the ByteWise IDE. React & JSX are delivered 
  via a CDN, so you can't use import/export statements. Instead, use native ReactJS 
  functionalities like React.useState(). The user doesn't have access to the HTML file.

  Please follow these guidelines for easy-to-read code: 
  -IMPORTANT: avoid import/export statements in code blocks
  -IMPORTANT: use an "App" component as the root, make sure it exists
  -Format all messages with Markdown
  -Never use single backticks in Markdown
  -use Markdown code blocks & specify the language for all code snippets. 
  -Make sure the examples provided can run without external dependencies or libraries.

  Debugging:
  -If the app is not rendering, check if there is an <App /> component.
  `,
};

const Prompt = (messages: ChatMessage[], code?: string) => {
  // Send the code of the App to the AI as well
  if (code) {
    systemMessage.content += `Here is the complete code of the app: ${code}`
  }
  
  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...messages],
      max_tokens: 200,
      n: 1,
      temperature: 0.5,
    }),
  })
    .then((res) => res.json())
    .catch((e) => console.error(e));
};

export default Prompt;
