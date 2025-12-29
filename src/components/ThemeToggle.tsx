type Props = {
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
};

export default function ThemeToggle({ theme, setTheme }: Props) {
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? "🌙 Night" : "☀️ Normal"}
    </button>
  );
}
