import React from "react";
import CodeDiffEditor from "./components/DiffEditor";

const originalCode = `
function hello() {
  console.log("helo");
}
`;

const modifiedCode = `
function hello() {
  console.log("hello");
}
`;

function App() {
  return (
    <div style={{ padding: "16px" }}>
      <h2>Monaco Diff Editor</h2>

      <CodeDiffEditor
        original={originalCode}
        modified={modifiedCode}
        language="javascript"
      />
    </div>
  );
}

export default App;
