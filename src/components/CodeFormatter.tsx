import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import * as monaco from "monaco-editor";

type Language = "javascript" | "typescript" | "java" | "python";

type Props = {
  theme: "light" | "dark";
};

export default function CodeFormatter({ theme }: Props) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [language, setLanguage] = useState<Language>("javascript");
  const [code, setCode] = useState("");

  const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const format = () => {
    editorRef.current
      ?.getAction("editor.action.formatDocument")
      ?.run();
  };

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Code Formatter</h3>

      <div style={{ marginBottom: 8 }}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>

        <button onClick={format}>Format</button>
      </div>

      <Editor
        height="300px"
        language={language}
        value={code}
        theme={theme === "dark" ? "vs-dark" : "vs"}
        onMount={onMount}
        onChange={(v) => setCode(v || "")}
        options={{
          formatOnType: true,
          formatOnPaste: true,
          minimap: { enabled: false },
        }}
      />
    </div>
  );
}
