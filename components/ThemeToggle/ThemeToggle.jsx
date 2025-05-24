import styled from "styled-components";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: var(--primary);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ToggleButton
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </ToggleButton>
  );
}
