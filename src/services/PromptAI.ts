const apiKey = import.meta.env.VITE_REACT_APP_GPT_API_KEY;

interface ChatMessage {
  role: string;
  content: string;
}

const systemMessage = {
  role: "system",
  content: `Your name is assistant, you are a ReactJS expert.
  -Your only purpose is helping a programmer on a ReactJS app.
  -The app is being compiled by CDNs so you can't import, export files or use libraries.
    -E.g. you need to use React.useState(); because you can't import useState.
  -It's mandatory to have an "App" component because this will be root component.
  -Format all messages with Markdown e.g. put code in code blocks.
  `,
};

const Prompt = (messages: ChatMessage[], code: string) => {
  // Send the code of the App to the AI as well
  // (this message is hidden from the user)
  const currentCode: ChatMessage = {
    role: "user",
    content: `Here is the code of the app: ${code}`,
  };

  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, currentCode, ...messages],
      max_tokens: 200,
      n: 1,
      temperature: 0.5,
    }),
  })
    .then((res) => res.json())
    .catch((e) => console.error(e));
};

export default Prompt;
