import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const LogoLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Logo() {
  return (
    <LogoLink href="/">
      <Image
        src="/images/logo.png"
        alt="Alchevita logo"
        width={48}
        height={48}
      />
    </LogoLink>
  );
}
