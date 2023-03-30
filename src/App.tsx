import { useCallback, useState } from "react";
import Code from "./components/Code";
import Preview from "./components/Preview";
import ChatBot from "./components/ChatBot";
import ProjectTemplate from "./utils/ProjectTemplate";
import { ChatMessage } from "./types";
import styles from "./App.module.css";

function App() {
  const [code, setCode] = useState<string>(ProjectTemplate.StarterApp());
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hi there! I'm an AI chatbot designed to assist you with your web application.
To get started, edit the code in the text editor or prompt me for further guidance.`,
    },
  ]);

  const handleCodeChange = useCallback((value: React.SetStateAction<string>) => {
    setCode(value);
  }, []);

  const handleCodeError = useCallback((errorMessage: string) => {
    // When the preview sends an error, prompt the AI to fix the problem
    setMessages(messages.concat({
      role: "user",
      content: `Fix this error for me: ${errorMessage}`
    }));
  }, [messages]);
  
  return (
    <main className={styles.App}>
      {/* <h2 className={styles.logo}>
        ByteWise
      </h2> */}
      <div className={styles.editorContainer}>
        <div className={styles.chatContainer}>
          <ChatBot
            messages={messages}
            setMessages={setMessages}
            code={code}
          />
        </div>
        <div className={styles.textEditor}>
          <Code 
            value={code}
            onChange={handleCodeChange}
            height={55}
            fontSize={12}
          />
        </div>
        <div className={styles.previewContainer}>
          <Preview 
            srcDoc={code}
            delayRenderInterval={1000}
            onError={handleCodeError}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
