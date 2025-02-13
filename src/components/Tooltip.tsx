import React, { useState, useRef, useEffect } from "react";

type TooltipPosition = "top" | "right" | "bottom" | "left";

interface TooltipProps {
  content: React.ReactNode;
  position?: TooltipPosition;
  children: React.ReactElement;
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = "top",
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const tooltipClasses = `
    absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm
    transition-opacity duration-300
    ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
    ${
      position === "top" &&
      "bottom-full left-1/2 transform -translate-x-1/2 mb-2"
    }
    ${
      position === "right" &&
      "left-full top-1/2 transform -translate-y-1/2 ml-2"
    }
    ${
      position === "bottom" &&
      "top-full left-1/2 transform -translate-x-1/2 mt-2"
    }
    ${
      position === "left" &&
      "right-full top-1/2 transform -translate-y-1/2 mr-2"
    }
  `;

  const arrowClasses = `
    absolute w-3 h-3 bg-gray-900
    ${
      position === "top" &&
      "top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
    }
    ${
      position === "right" &&
      "right-full top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45"
    }
    ${
      position === "bottom" &&
      "bottom-full left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45"
    }
    ${
      position === "left" &&
      "left-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
    }
  `;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <div className={tooltipClasses} ref={tooltipRef}>
        {content}
        <div className={arrowClasses}></div>
      </div>
    </div>
  );
};

export default Tooltip;
