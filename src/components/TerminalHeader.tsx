import React, { useState } from "react";

interface TerminalHeaderProps {
  title: string;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ title }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-terminal-darkBlue h-14 flex items-center px-4 relative">
      <div
        className="flex gap-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Close button */}
        <div className="w-3.5 h-3.5 bg-[#ff5f56] rounded-full flex items-center justify-center group">
          {isHovered && (
            <svg
              className="w-[8px] h-[8px] text-[#4c0000] opacity-0 group-hover:opacity-100"
              viewBox="0 0 10 10"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path d="M2,2 L8,8 M2,8 L8,2" />
            </svg>
          )}
        </div>

        {/* Minimize button */}
        <div className="w-3.5 h-3.5 bg-[#ffbd2e] rounded-full flex items-center justify-center group">
          {isHovered && (
            <svg
              className="w-[8px] h-[8px] text-[#995700] opacity-0 group-hover:opacity-100"
              viewBox="0 0 10 10"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path d="M2,5 L8,5" />
            </svg>
          )}
        </div>

        {/* Expand button */}
        <div className="w-3.5 h-3.5 bg-[#27c93f] rounded-full flex items-center justify-center group">
          {isHovered && (
            <svg
              className="w-[8px] h-[8px] text-[#006500] opacity-0 group-hover:opacity-100"
              viewBox="0 0 10 10"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
            >
              <path d="M2.5,2.5 L7.5,7.5 M2.5,7.5 L7.5,2.5" />
            </svg>
          )}
        </div>
      </div>

      <div className="absolute left-0 right-0 text-center text-terminal-gray text-2xl font-semibold">
        {title}
      </div>
    </div>
  );
};

export default TerminalHeader;
