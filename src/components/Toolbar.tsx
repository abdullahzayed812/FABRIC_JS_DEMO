import { ReactNode } from "react";

interface ToolbarProps {
  children: ReactNode;
}

export const Toolbar: React.FC<ToolbarProps> = ({ children }) => {
  return <section className="fixed top-2 left-[50%] translate-x-[-50%] space-x-2">{children}</section>;
};
