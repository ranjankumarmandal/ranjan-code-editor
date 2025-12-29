import { useEffect, useState } from "react";
import ThemeToggle from "./components/ThemeToggle";
import Toolbar from "./components/Toolbar";
import JsonDiffView from "./components/JsonDiffView";
import CodeFormatter from "./components/CodeFormatter";
import { decodeShare } from "./utils/share";

export default function App() {
  const [left, setLeft] = useState("{}");
  const [right, setRight] = useState("{}");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const data = decodeShare(hash);
      if (data) {
        setLeft(data.left);
        setRight(data.right);
      }
    }
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <Toolbar left={left} right={right} />
      <JsonDiffView left={left} right={right} theme={theme} />
      <CodeFormatter theme={theme} />
    </div>
  );
}
