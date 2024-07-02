import React, { useState } from "react";
import { PromptBoxProps } from "../types/PromptBoxProps";

const PromptBox: React.FC<PromptBoxProps> = ({ onSubmit, loading }) => {
  const [prompt, setPrompt] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit(prompt);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={prompt}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPrompt(e.target.value)
        }
        placeholder="How are you feeling today?"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate Colors"}
      </button>
    </form>
  );
};

export default PromptBox;
