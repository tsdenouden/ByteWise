import { useEffect, useState } from "react";
import ProjectTemplate from "../utils/ProjectTemplate"
import styles from "./Preview.module.css";

const Preview = ({ 
  srcDoc, 
  delayRenderInterval
}: { srcDoc: string, delayRenderInterval: number }) => {
  const [html, setHTML] = useState<string>("");

  useEffect(() => {
    const renderDelayTimer = setTimeout(() => {
      setHTML(ProjectTemplate.ReactApp(srcDoc));
    }, delayRenderInterval);

    return () => {
      clearTimeout(renderDelayTimer);
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
}

export default Preview;
