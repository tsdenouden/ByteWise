import { useEffect, useRef, useState } from "react";
import ProjectTemplate from "../utils/ProjectTemplate"
import styles from "./Preview.module.css";

const Preview = ({ 
  srcDoc, 
  delayRenderInterval
}: { srcDoc: string, delayRenderInterval: number }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [html, setHTML] = useState<string>("");

  // Rerender iframe when srcDoc prop changes
  useEffect(() => {
    // delay the render by value of delayRenderInterval in miliseconds
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
      ref={iframeRef} 
      sandbox="allow-scripts"
      frameBorder="0"
      className={styles.previewFrame}
    ></iframe>
  );
}

export default Preview;
