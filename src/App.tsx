import { useCallback, useState } from "react";
import Code from "./components/Code";
import Preview from "./components/Preview";
import ChatBot from "./components/ChatBot";
import ProjectTemplate from "./utils/ProjectTemplate";
import styles from "./App.module.css";

function App() {
  const [code, setCode] = useState<string>(ProjectTemplate.StarterApp());

  const handleChange = useCallback((value: React.SetStateAction<string>) => {
    setCode(value);
  }, []);
  
  return (
    <main className={styles.App}>
      {/* <h2 className={styles.logo}>
        ByteWise
      </h2> */}
      <div className={styles.editorContainer}>
        <div className={styles.chatContainer}>
          <ChatBot 
            code={code}
          />
        </div>
        <div className={styles.textEditor}>
          <Code 
            value={code}
            onChange={handleChange}
            height={55}
            fontSize={12}
          />
        </div>
        <div className={styles.previewContainer}>
          <Preview 
            srcDoc={code}
            delayRenderInterval={1000}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
