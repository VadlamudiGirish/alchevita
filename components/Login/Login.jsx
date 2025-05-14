import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #45a049;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: white;
  border-top: 1px solid #e5e7eb;
`;

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <LoginContainer>
        <p>Signed in as {session.user.email}</p>
        <StyledButton onClick={() => signOut()}>Sign out</StyledButton>
      </LoginContainer>
    );
  }
  return (
    <LoginContainer>
      <p>Not signed in</p>
      <StyledButton onClick={() => signIn()}>Sign in</StyledButton>
    </LoginContainer>
  );
}
