import { encodeShare } from "../utils/share";

type Props = {
  left: string;
  right: string;
};

export default function Toolbar({ left, right }: Props) {
  const copy = (text: string) => navigator.clipboard.writeText(text);

  const download = (text: string, name: string) => {
    const blob = new Blob([text], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
  };

  const share = () => {
    const hash = encodeShare(left, right);
    window.location.hash = hash;
  };

  return (
    <div style={{ marginBottom: 12 }}>
      <button onClick={() => copy(left)}>Copy Left</button>
      <button onClick={() => copy(right)}>Copy Right</button>
      <button onClick={() => download(left, "left.json")}>Download Left</button>
      <button onClick={() => download(right, "right.json")}>Download Right</button>
      <button onClick={share}>Share URL</button>
    </div>
  );
}
