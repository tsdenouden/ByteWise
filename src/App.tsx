import { useCallback, useState, useRef } from "react";
import Code from "./components/Code";
import Preview from "./components/Preview";
import ChatBot from "./components/ChatBot";
import Modal from "./components/Modal";
import ProjectTemplate from "./utils/ProjectTemplate";
import { ChatMessage } from "./types";
import styles from "./App.module.css";

function App() {
  // Source code, initialised with basic React App Template
  const [code, setCode] = useState<string>(ProjectTemplate.StarterApp());

  // Messages with AI Chatbot
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hi there! I'm an AI chatbot designed to assist you with your web application.
To get started, edit the code in the text editor or prompt me for further guidance.`,
    },
  ]);

  const [modalVisible, setModalVisible] = useState<boolean>(true);

  const handleCodeChange = useCallback((value: React.SetStateAction<string>) => {
    setCode(value);
  }, []);

  // Prompt the AI to fix an error in the user's React app 
  const handleCodeError = useCallback((errorMessage: string) => {
    setMessages(messages.concat({ 
      role: "user",
      content: `Fix this error for me: ${errorMessage}`
    }));
  }, [messages]);
  
  // Toggle modal visibility
  const handleModal = (show: boolean) => {
    if (show) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }

  // Copy source code to clipboard
  const inputRef = useRef<HTMLInputElement | null>(null);;

  const copyToClipboard = () => {
    const input = inputRef.current;

    if (input) {
      input.value = ProjectTemplate.ReactApp(code);
      input.select();
      document.execCommand('copy');
    }
  };

  return (
    <main className={styles.App}>
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
            exportApp={handleModal}
          />
        </div>
      </div>

      {/*Export Code Modal*/}
      <Modal
        visible={modalVisible}
        onClose={() => {setModalVisible(false)}}
      >
        <h2>HTML Source</h2>
       <div className={styles.sourceCodeContainer}>
        <code style={{wordWrap: "break-word"}}
          >{ProjectTemplate.ReactApp(code)}
        </code>
       </div>

       {/*Copy code to cipboard*/}
        <input 
          ref={inputRef}
          style={{ position: 'absolute', left: '-9999px' }}
        ></input>
        <div 
          className={styles.buttonGreen}
          onClick={copyToClipboard}
          style={{marginTop: "20px"}}
        >
          📋 Copy Code 
        </div>
      </Modal>
    </main>
  );
}

export default App;
