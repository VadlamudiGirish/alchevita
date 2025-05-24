import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";
import { X } from "lucide-react";
import Image from "next/image";

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out;
`;

const MenuContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: var(--surface);
  z-index: 1001;
  transform: translateY(${({ isOpen }) => (isOpen ? "0" : "100%")});
  transition: transform 0.3s ease-in-out, background-color 0.3s ease;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  border-radius: 12px 12px 0 0;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--text-dark);
  transition: color 0.2s ease-in-out;

  &:hover {
    color: var(--primary);
  }
`;

const MenuContent = styled.div`
  padding: 4rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  align-items: center;
`;

const MenuTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-dark);
  margin: 0;
  text-align: center;
  transition: color 0.3s ease;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 100%;
`;

const MenuItem = styled.button`
  background: linear-gradient(135deg, #1fab89 0%, #178066 100%);
  border: none;
  padding: 1rem 2rem;
  text-align: center;
  font-size: 1.1rem;
  color: white;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  min-width: 200px;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(31, 171, 137, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(31, 171, 137, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(31, 171, 137, 0.2);
  }
`;

const BoldText = styled.strong`
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--text-dark);
  display: block;
  text-align: center;
  transition: color 0.3s ease;
`;

const AboutDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-dark);
  text-align: center;
  max-width: 500px;
  margin: 0;
  transition: color 0.3s ease;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 1rem 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 1rem 0 2rem;
`;

export default function SlideInMenu({ isOpen, onClose }) {
  const { data: session } = useSession();

  const handleMenuItemClick = () => {
    onClose();
  };

  return (
    <>
      <MenuOverlay isOpen={isOpen} onClick={onClose} />
      <MenuContainer isOpen={isOpen}>
        <CloseButton onClick={onClose} aria-label="Close menu">
          <X size={24} />
        </CloseButton>
        <MenuContent>
          <MenuTitle>Alchevita</MenuTitle>

          {session ? (
            <MenuItem
              onClick={() => {
                signOut({ callbackUrl: "/" });
                handleMenuItemClick();
              }}
            >
              Log Out
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() => {
                signIn("github");
                handleMenuItemClick();
              }}
            >
              Log In
            </MenuItem>
          )}

          <BoldText>About</BoldText>
          <AboutDescription>
            Alchevita is your go-to app for natural remedies.
            <br />
            Discover and bookmark your favourites or add your own to build a
            personalized wellness library. <br />
            Simple, natural healing at your fingertips.
          </AboutDescription>
          <BoldText>Made with 💚 by</BoldText>
          <MenuSection>
            <ImageContainer>
              <Image
                src="/images/about-image.jpg"
                alt="Natural remedies illustration"
                fill
                style={{ objectFit: "cover" }}
              />
            </ImageContainer>
          </MenuSection>
        </MenuContent>
      </MenuContainer>
    </>
  );
}
