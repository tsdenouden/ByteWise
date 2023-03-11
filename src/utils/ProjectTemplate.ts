const ReactApp = (code: string): string => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>App</title>
    <meta name="author" content="">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      html, body {
        border: 0px;
        margin: 0px;
        padding: 0px;
      }
      #app {
        width: 100%;
        height: 100vh;
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel">
      ${code}
      const rootNode = document.getElementById('app');
      const root = ReactDOM.createRoot(rootNode);
      root.render(React.createElement(App));
    </script>
  </body>
  </html> 
  `
}

const StarterApp = (): string => {
  return `/* 
ByteWise - AI Code Editor 
=========================
-> Develop React apps in the Browser
-> Debug your code with the help of an AI assistant
Get started by modifying the code below!
*/

function App() {
  const [count, setCount] = React.useState(0);
  const reactLogoSrc = "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg";

  return (
    <main style={container}>
      <img src={reactLogoSrc} style={reactLogo} />
      <h1>ByteWise</h1>
      <p>{count}</p>
      <div>
        <button
          onClick={() => setCount(count+1)} 
          style={counterButton}
        >
          Increment
        </button>
        <button
          onClick={() => setCount(count-1)} 
          style={counterButton}
        >
          Decrement
        </button>
      </div>
    </main>
  );
}

/* STYLES */

const container = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#1b1a24",
  color: "#e6e3fa",
  fontFamily: "monospace",
  fontSize: "1.5rem",
  height: "100%"
};

const reactLogo = {
  width: "30%",
  height: "auto",
  animation: "spin 4s linear infinite"
};

const counterButton =  {
  backgroundColor: "#0f0e14",
  borderRadius: "0.375rem",
  color: "#e6e3fa",
  fontFamily: "monospace",
  fontSize: "1.5rem",
  padding: "10px",
  margin: "10px"
};
`
}

const ProjectTemplate = {
  ReactApp,
  StarterApp
}

export default ProjectTemplate;