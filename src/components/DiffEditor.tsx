import React, { useRef, useState } from "react";
import { DiffEditor } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

type LanguageOption = {
  label: string;
  value: string;
  extension: string;
};

const LANGUAGES: LanguageOption[] = [
  { label: "JavaScript", value: "javascript", extension: "js" },
  { label: "TypeScript", value: "typescript", extension: "ts" },
  { label: "Java", value: "java", extension: "java" },
  { label: "Python", value: "python", extension: "py" },
  { label: "JSON", value: "json", extension: "json" },
];

const EditableDiffEditor: React.FC = () => {
  const [language, setLanguage] = useState<LanguageOption>(LANGUAGES[0]);
  const [theme, setTheme] = useState<"vs-light" | "vs-dark">("vs-light");

  const originalValueRef = useRef<string>(`function hello() {
  console.log("helo");
}`);
  const modifiedValueRef = useRef<string>(`function hello() {
  console.log("hello");
}`);

  const diffEditorRef =
    useRef<monaco.editor.IStandaloneDiffEditor | null>(null);

  const handleMount = (
    editor: monaco.editor.IStandaloneDiffEditor
  ) => {
    diffEditorRef.current = editor;

    const originalEditor = editor.getOriginalEditor();
    const modifiedEditor = editor.getModifiedEditor();

    originalEditor.onDidChangeModelContent(() => {
      originalValueRef.current = originalEditor.getValue();
    });

    modifiedEditor.onDidChangeModelContent(() => {
      modifiedValueRef.current = modifiedEditor.getValue();
    });
  };

  // ---------- FILE IMPORT ----------
  const importFile = (
    side: "original" | "modified",
    file: File
  ) => {
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      if (!diffEditorRef.current) return;

      const editor =
        side === "original"
          ? diffEditorRef.current.getOriginalEditor()
          : diffEditorRef.current.getModifiedEditor();

      editor.setValue(content);

      if (side === "original") {
        originalValueRef.current = content;
      } else {
        modifiedValueRef.current = content;
      }
    };
    reader.readAsText(file);
  };

  // ---------- FILE EXPORT ----------
  const exportFile = (side: "original" | "modified") => {
    const content =
      side === "original"
        ? originalValueRef.current
        : modifiedValueRef.current;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${side}.${language.extension}`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: 12 }}>
      {/* ===== TOOLBAR ===== */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 10,
          flexWrap: "wrap",
        }}
      >
        {/* Language Dropdown */}
        <select
          value={language.value}
          onChange={(e) =>
            setLanguage(
              LANGUAGES.find((l) => l.value === e.target.value)!
            )
          }
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>

        {/* Theme Toggle */}
        <button onClick={() =>
          setTheme((t) => (t === "vs-light" ? "vs-dark" : "vs-light"))
        }>
          Theme: {theme === "vs-light" ? "Light" : "Dark"}
        </button>

        {/* Import Buttons */}
        <label>
          Import Left
          <input
            type="file"
            hidden
            onChange={(e) =>
              e.target.files &&
              importFile("original", e.target.files[0])
            }
          />
        </label>

        <label>
          Import Right
          <input
            type="file"
            hidden
            onChange={(e) =>
              e.target.files &&
              importFile("modified", e.target.files[0])
            }
          />
        </label>

        {/* Export Buttons */}
        <button onClick={() => exportFile("original")}>
          Export Left
        </button>

        <button onClick={() => exportFile("modified")}>
          Export Right
        </button>
      </div>

      {/* ===== DIFF EDITOR ===== */}
      <DiffEditor
        height="75vh"
        language={language.value}
        theme={theme}
        original={originalValueRef.current}
        modified={modifiedValueRef.current}
        onMount={handleMount}
        options={{
          renderSideBySide: true,
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,

          // 🔑 allow left editing
          originalEditable: true,
        }}
      />
    </div>
  );
};

export default EditableDiffEditor;
