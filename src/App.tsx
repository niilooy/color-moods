import React, { useState } from "react";
import Greeting from "./components/Greeting";
import PromptBox from "./components/PromptBox";
import ColorPalette from "./components/ColorPalette";
import { generateColors } from "./services/openai";
import "./App.css";

const App: React.FC = () => {
  const [colors, setColors] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (mood: string): Promise<void> => {
    setLoading(true);
    try {
      const newColors = await generateColors(mood);
      setColors(newColors);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setColors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app fade-in">
      <Greeting />
      <PromptBox onSubmit={handleSubmit} loading={loading} />
      {error && <p className="error fade-in">{error}</p>}
      <ColorPalette colors={colors} />
    </div>
  );
};

export default App;
