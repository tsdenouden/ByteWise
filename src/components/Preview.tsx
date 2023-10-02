import { useEffect, useState } from "react";
import ProjectTemplate from "../utils/ProjectTemplate";
import styles from "./Preview.module.css";

import { MouseEventHandler } from "react";

interface PreviewProps {
  srcDoc: string;
  delayRenderInterval: number;
  onError?: (error: string) => void;
  exportApp?: (show: boolean) => void;
}

// Renders ReactJS app inside an Iframe
const Preview = ({srcDoc, delayRenderInterval, onError, exportApp}: PreviewProps) => {
  const [html, setHTML] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const renderDelayTimer = setTimeout(() => {
      // Generate HTML for iframe, (srcDoc is user's ReactJS source code)
      setHTML(ProjectTemplate.ReactApp(srcDoc));

      // Clear any error messages currently being displayed in the iframe
      setErrorMessage(""); 
    }, delayRenderInterval);

    // Receive error messages from the React script and display it in the iframe 
    const handleMessage = (e: MessageEvent) => {
      // check that the message is from a trusted origin
      // if (event.origin !== 'https://example.com') {
      //   console.warn('Received message from untrusted origin:', event.origin);
      //   return;
      // }

      // handle the message
      const data = e.data;
      if (data.message) {
        // Display error message in iframe
        setHTML(`${data.message}`);
        // Save error message, so it can be sent to the AI assistant
        setErrorMessage(data.message)
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      clearTimeout(renderDelayTimer);
      window.removeEventListener("message", handleMessage);
    };
  }, [srcDoc]);

  return (
    <div className={styles.previewFrameContainer}>
      <iframe
        srcDoc={html}
        sandbox="allow-scripts"
        frameBorder="0"
        className={styles.previewFrame}
      ></iframe>
      <div className={styles.buttonsContainer}>
        <div className={styles.toolbuttons}>
          <div 
            className={styles.buttonGreen}
            onClick={() => { setHTML(ProjectTemplate.ReactApp(`${srcDoc += '\n'}`));}}
          >
            Reload
          </div>
          {errorMessage ? (
            <div className={styles.buttonRed}
            onClick={() => {onError? onError(errorMessage) : null}}
          >
            Debug with AI
          </div>
          ): null}
        </div>
        <div 
          className={styles.buttonGreen}
          onClick={() => { if(exportApp) exportApp(true)}}
        >
          Export Project
        </div>
      </div>
    </div>
  );
};

export default Preview;
