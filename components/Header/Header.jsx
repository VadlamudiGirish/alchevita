import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Logo from "../Logo/Logo";
import TitleBar from "../TitleBar/TitleBar";
import styled from "styled-components";
import { Menu } from "lucide-react";
import SlideInMenu from "../SlideInMenu/SlideInMenu";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: var(--surface);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.08);
  z-index: 9999;
  border-bottom: 1px solid var(--text-dark);
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--primary);
  }
`;

const UserSection = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserName = styled.strong`
  font-size: 0.9rem;
  color: var(--text-dark);
  font-weight: 500;
  display: block;
`;

export default function Header({ title }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <HeaderContainer>
      <Logo />
      <TitleBar title={title} />
      <UserSection>
        {session?.user?.name && <UserName>{session.user.name}</UserName>}
        <ThemeToggle />
        <MenuButton onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
          <Menu size={32} />
        </MenuButton>
      </UserSection>
      <SlideInMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </HeaderContainer>
  );
}
