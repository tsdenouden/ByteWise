import { useEffect, useState } from "react";
import ProjectTemplate from "../utils/ProjectTemplate";
import styles from "./Preview.module.css";

interface PreviewProps {
  srcDoc: string;
  delayRenderInterval: number;
  onError?: (error: string) => void;
}

const Preview = ({srcDoc, delayRenderInterval, onError}: PreviewProps) => {
  const [html, setHTML] = useState<string>("");

  useEffect(() => {
    const renderDelayTimer = setTimeout(() => {
      setHTML(ProjectTemplate.ReactApp(srcDoc));
    }, delayRenderInterval);

    // Receive errors from React script in iframe
    const handleMessage = (e: MessageEvent) => {
      // check that the message is from a trusted origin
      // if (event.origin !== 'https://example.com') {
      //   console.warn('Received message from untrusted origin:', event.origin);
      //   return;
      // }

      // handle the message
      const data = e.data;
      if (data.message) {
        // Render the error message in iframe
        setHTML(`${data.message}`);

        if (onError) {
          onError(data.message);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      clearTimeout(renderDelayTimer);
      window.removeEventListener("message", handleMessage);
    };
  }, [srcDoc]);

  return (
    <iframe
      srcDoc={html}
      sandbox="allow-scripts"
      frameBorder="0"
      className={styles.previewFrame}
    ></iframe>
  );
};

export default Preview;
