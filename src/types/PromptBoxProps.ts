export interface PromptBoxProps {
  onSubmit: (mood: string) => Promise<void>;
  loading: boolean;
}