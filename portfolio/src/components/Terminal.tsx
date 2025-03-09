import React, { useState, useEffect, useRef } from "react";
import TerminalHeader from "./TerminalHeader";
import TerminalBody from "./TerminalBody";
// import ColorPalette from "./ColorPalette";

const Terminal: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const terminalRef = useRef<HTMLDivElement>(null);

  // Available paths/files for navigation
  

  // Focus terminal on load
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.focus();
    }
  }, []);

  const handleContentChange = (newContent: string): void => {
    setContent(newContent);
  };

  return (
    <div className="w-[98%] min-w-[1600px] h-[80vh] bg-terminal-darkBlue rounded-md shadow-[0_0_30px_5px_rgba(255,255,255,0.15)] overflow-hidden flex flex-col mx-auto mt-10">
      <TerminalHeader title="Terminal" />
      <TerminalBody ref={terminalRef} />
      {/* <ColorPalette /> */}
    </div>
  );
};

export default Terminal;
