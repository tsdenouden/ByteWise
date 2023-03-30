import { useEffect, useState } from "react";
import ProjectTemplate from "../utils/ProjectTemplate";
import styles from "./Preview.module.css";

const Preview = ({
  srcDoc,
  delayRenderInterval,
}: {
  srcDoc: string;
  delayRenderInterval: number;
}) => {
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
        console.log("Received message:", data);
        // Render the error message to the user
        setHTML(`${data.message}`);
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
      onError={() => {
        console.log("What's up");
      }}
      className={styles.previewFrame}
    ></iframe>
  );
};

export default Preview;
