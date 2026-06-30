import { useState } from "react";
import AuthPage from "./components/AuthPage";
import TrademarkApp from "./components/TrademarkApp.tsx";

export default function App() {
  const [authed, setAuthed] = useState(false);
  if (!authed) return <AuthPage onEnter={() => setAuthed(true)} />;
  return <TrademarkApp />;
}
