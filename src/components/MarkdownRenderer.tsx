import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import vs from "react-syntax-highlighter/dist/esm/styles/prism/vs";

const MarkdownRenderer = ({ source }: { source: string }) => {
  const style = {
    fontSize: "12px",
  };

  return (
    <ReactMarkdown
      children={source}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              style={vs}
              language="jsx"
              PreTag="div"
              showLineNumbers={true}
              wrapLines={true}
              wrapLongLines={true}
              customStyle={style}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};

export default MarkdownRenderer;
