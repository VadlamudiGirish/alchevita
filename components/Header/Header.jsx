import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Logo from "../Logo/Logo";
import TitleBar from "../TitleBar/TitleBar";
import styled from "styled-components";

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
  background-color: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.08);
  z-index: 9999;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserName = styled.span`
  font-weight: 500;
`;

const LogButton = styled.button`
  background-color: #1fab89;
  color: black;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100px;

  &:hover {
    background-color: #178066;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default function Header({ title }) {
  const { data: session } = useSession();

  return (
    <HeaderContainer>
      <Logo />
      <TitleBar title={title} />
      {session ? (
        <UserInfo>
          <UserName>{session.user.name}</UserName>
          <LogButton onClick={() => signOut()}>Log Out</LogButton>
        </UserInfo>
      ) : (
        <LogButton onClick={() => signIn("github")}>Log In</LogButton>
      )}
    </HeaderContainer>
  );
}
