import React, { useEffect, useRef } from "react";
import TerminalHeader from "./TerminalHeader";
import TerminalBody from "./TerminalBody";
// import ColorPalette from "./ColorPalette";

const Terminal: React.FC = () => {
  // const [content, setContent] = useState<string>("");
  const terminalRef = useRef<HTMLDivElement>(null);

  // Focus terminal on load
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.focus();
    }
  }, []);

  return (
    <div className="w-[500px] sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[900px] h-[500px] sm:h-[550px] md:h-[600px] bg-terminal-darkBlue rounded-md shadow-[0_0_30px_5px_rgba(255,255,255,0.15)] overflow-hidden flex flex-col mx-auto mt-10">
      <TerminalHeader title="Terminal" />
      <TerminalBody ref={terminalRef} />
    </div>
  );
};

export default Terminal;
