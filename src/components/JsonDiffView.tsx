import Editor from "@monaco-editor/react";

type Props = {
  left: string;
  right: string;
  theme: "light" | "dark";
};

export default function JsonDiffView({ left, right, theme }: Props) {
  return (
    <Editor
      height="400px"
      language="json"
      theme={theme === "dark" ? "vs-dark" : "vs"}
      original={left}
      value={right}
      options={{
        renderSideBySide: true,
        readOnly: true,
        minimap: { enabled: false },
      }}
    />
  );
}
