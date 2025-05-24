import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const StyledSymptomsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
`;

const SymptomPill = styled(Link)`
  border-radius: 1rem;
  border: 1px solid var(--text-dark);
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  color: var(--text-dark);
  background-color: var(--surface);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  max-width: 100%;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--primary);
    color: white;
    border-color: var(--primary);
  }

  @media (min-width: 640px) {
    font-size: 0.875rem;
    padding: 0.375rem 0.875rem;
  }
`;

export default function SymptomsList({ symptoms }) {
  const router = useRouter();

  if (!symptoms || symptoms.length === 0) return null;

  return (
    <StyledSymptomsList>
      {symptoms.map((symptom) => (
        <SymptomPill
          key={symptom._id}
          href={{
            pathname: router.pathname,
            query: { ...router.query, symptom: symptom.name },
          }}
          shallow
          passHref
          scroll={false}
        >
          {symptom.name}
        </SymptomPill>
      ))}
    </StyledSymptomsList>
  );
}
