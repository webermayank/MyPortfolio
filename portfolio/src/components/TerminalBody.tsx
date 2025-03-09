import React, { forwardRef, useState, KeyboardEvent, useEffect } from "react";
import { ProjectsContent } from "./sections/Projects";
import { AboutContent } from "./sections/About";
import { ContactContent } from "./sections/Contact";
import { useTypewriter } from "../hooks/useTypewriter";

interface TerminalBodyProps {
  ref: React.RefObject<HTMLDivElement>;
}

const TerminalBody = forwardRef<HTMLDivElement, TerminalBodyProps>(
  (props, ref) => {
    const [commands, setCommands] = useState<string[]>([]);
    const [currentPath, setCurrentPath] = useState("~/home");

    // Define available commands for tab completion
    const availableCommands = {
      p: "projects",
      a: "about",
      c: "contact",
    };

    const welcomeText = [
      "Hello!",
      "Welcome to my portfolio.",
      "",
      "Click or input a choice:",
      "1> Projects",
      "2> About",
      "3> Contact",
    ];

    const displayedLines = useTypewriter(welcomeText, 20, 100);
    const [output, setOutput] = useState<string[]>([]);

    // Update output when animation is complete
    useEffect(() => {
      if (displayedLines.length === welcomeText.length) {
        setOutput(displayedLines);
      }
    }, [displayedLines]);

    const handleNavigation = (path: string) => {
      switch (path) {
        case "projects":
        case "1":
          setOutput(ProjectsContent);
          setCurrentPath("~/home/projects");
          break;
        case "about":
        case "2":
          setOutput(AboutContent);
          setCurrentPath("~/home/about");
          break;
        case "contact":
        case "3":
          setOutput(ContactContent);
          setCurrentPath("~/home/contact");
          break;
        case "..":
          // Reset to welcome text with animation
          setOutput([]);
          setCurrentPath("~/home");
          const displayAnimation = async () => {
            const lines = [];
            for (const line of welcomeText) {
              lines.push(line);
              setOutput([...lines]);
              await new Promise((resolve) => setTimeout(resolve, 50));
            }
          };
          displayAnimation();
          break;
        default:
          setOutput([
            "Command not found, Click on home to go back",
            "Available commands:",
            "projects or cd projects - View my projects",
            "about or cd about - Learn about me",
            "contact or cd contact - Get in touch",
            ".. or cd .. - Go back to main menu",
          ]);
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      const currentInput =
        e.currentTarget.textContent?.trim().toLowerCase() || "";

      // Handle tab completion
      if (e.key === "Tab") {
        e.preventDefault();

        // Check if the input starts with 'cd '
        const inputWithoutCd = currentInput.startsWith("cd ")
          ? currentInput.slice(3)
          : currentInput;

        // Get the first character for matching
        const firstChar = inputWithoutCd.charAt(0);

        // If we have a matching command
        if (availableCommands[firstChar as keyof typeof availableCommands]) {
          const completedCommand = currentInput.startsWith("cd ")
            ? `cd ${
                availableCommands[firstChar as keyof typeof availableCommands]
              }`
            : availableCommands[firstChar as keyof typeof availableCommands];

          e.currentTarget.textContent = completedCommand;
        }
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const command = currentInput;

        if (command === "cd .." || command === "..") {
          handleNavigation("..");
        } else {
          const path = command.startsWith("cd ") ? command.slice(3) : command;

          if (["projects", "1", "about", "2", "contact", "3"].includes(path)) {
            handleNavigation(path);
          } else {
            setOutput([
              "Command not found, Click on home to go back",
              "Available commands:",
              "projects or cd projects - View my projects",
              "about or cd about - Learn about me",
              "contact or cd contact - Get in touch",
              ".. or cd .. - Go back to main menu",
            ]);
          }
        }

        setCommands((prev) => [...prev, command]);
        e.currentTarget.textContent = "";
      }
    };

    const handleClick = (option: string) => {
      handleNavigation(option);
      setCommands((prev) => [...prev, `cd ${option}`]);
    };

    return (
      <div className="flex-1 bg-black p-6 overflow-y-auto flex flex-col rounded-lg">
        {/* Menu Output */}
        {(output.length > 0 ? output : displayedLines).map((line, index) => (
          <div
            key={index}
            className={`text-terminal-gray text-2xl mb-2 cursor-pointer font-semibold tracking-wide ${
              line.startsWith("1>") ||
              line.startsWith("2>") ||
              line.startsWith("3>")
                ? "hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-200 ease-in-out"
                : ""
            }`}
            onClick={() => {
              if (line.startsWith("1>")) handleClick("projects");
              if (line.startsWith("2>")) handleClick("about");
              if (line.startsWith("3>")) handleClick("contact");
            }}
            dangerouslySetInnerHTML={{ __html: line }} // ✅ Fix applied
          />
        ))}

        {/* Current Input Line - Only show at the bottom */}
        <div className="text-2xl mt-4 flex items-center">
          <span className="text-terminal-green">Mayank Verma &nbsp;</span>
          <span
            className="text-terminal-yellow cursor-pointer hover:text-yellow-300"
            onClick={() => handleNavigation("..")}
          >
            MINGW64 {currentPath}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-terminal-gray text-2xl">$ </span>
          <div
            ref={ref}
            className="text-terminal-gray outline-none whitespace-pre-wrap break-words leading-relaxed text-2xl flex-1"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onKeyDown={handleKeyDown}
            style={{ caretColor: "#B3B4BD" }}
          />
        </div>
      </div>
    );
  }
);

TerminalBody.displayName = "TerminalBody";

export default TerminalBody;
