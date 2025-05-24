import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --primary: ${({ theme }) => theme.primary};
    --secondary: ${({ theme }) => theme.secondary};
    --background: ${({ theme }) => theme.background};
    --surface: ${({ theme }) => theme.surface};
    --text-dark: ${({ theme }) => theme.text};
    --color-danger-bg: ${({ theme }) => theme.danger.background};
    --color-danger-text: ${({ theme }) => theme.danger.text};
    --color-danger-border: ${({ theme }) => theme.danger.border};
    --color-danger-hover-bg: ${({ theme }) => theme.danger.hoverBg};
    --color-disabled: ${({ theme }) => theme.disabled};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Manrope', system-ui, Arial, sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;
