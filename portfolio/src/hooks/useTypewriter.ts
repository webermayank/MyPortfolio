import { useState, useEffect } from "react";

export const useTypewriter = (
  texts: string[],
  typingSpeed = 20, // Changed from 100
  delayBetweenLines = 100 // Changed from 800
) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= texts.length) return;

    const currentText = texts[currentLineIndex];

    if (currentCharIndex >= currentText.length) {
      // Line is complete, move to next line after delay
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, delayBetweenLines);

      return () => clearTimeout(timeout);
    }

    // Type next character
    const timeout = setTimeout(() => {
      setDisplayedLines((prev) => {
        const newLines = [...prev];
        if (currentLineIndex >= newLines.length) {
          newLines.push("");
        }
        newLines[currentLineIndex] = currentText.slice(0, currentCharIndex + 1);
        return newLines;
      });
      setCurrentCharIndex((prev) => prev + 1);
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [
    currentLineIndex,
    currentCharIndex,
    texts,
    typingSpeed,
    delayBetweenLines,
  ]);

  return displayedLines;
};
