import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { aura } from "@uiw/codemirror-theme-aura";
import styles from "./Code.module.css";

interface CodeProps {
  value: string,
  onChange: React.Dispatch<React.SetStateAction<string>>,
  height: number,
  fontSize: number
}

const Code = ({value, onChange, height, fontSize}: CodeProps) => {

  return (
    <CodeMirror 
      value={value}
      height={`${height}rem`}
      theme={aura}
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
      style={{ fontSize: `${fontSize}px` }}
    />
  );
}

export default Code;
