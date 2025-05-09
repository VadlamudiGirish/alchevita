import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";

const Wrapper = styled.main`
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
  max-width: 1200px;
`;

const BackButton = styled.button`
  margin-bottom: 1.5rem;
  cursor: pointer;
  color: inherit;
  background: none;
  border: none;
  padding: 0;

  &:hover {
    color: #1fab89;
  }

  transition: color 0.2s ease-in-out;
`;

const StyledSVG = styled.svg`
  width: 2rem;
  height: 2rem;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const Aside = styled.aside`
  width: 100%;
  padding: 0 1rem;
  position: relative;
  margin-top: 2em;
  border-radius: 8px;
  overflow: hidden;
  // box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);

  @media (min-width: 768px) {
    width: 50%;
  }

  img {
    border-radius: 8px;
    object-fit: cover;
  }
`;

const Article = styled.article`
  width: 100%;
  padding: 0 1rem;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const Title = styled.h2`
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Paragraph = styled.p`
  color: rgb(2, 2, 2);
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const StyledList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0 0 1.5rem;

  li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;
    line-height: 1.5;

    &::before {
      content: "🍃";
      position: absolute;
      left: 0;
    }
  }
`;

export default function DetailPage({ element }) {
  const router = useRouter();

  return (
    <Wrapper>
      <BackButton
        data-testid="back-to-remedies"
        aria-label="Back to remedies"
        onClick={(e) => {
          e.preventDefault();
          router.push("/");
        }}
      >
        <StyledSVG
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </StyledSVG>
      </BackButton>

      <Section>
        <Aside>
          <Image
            src={element.imageUrl}
            alt={element.name}
            loading="lazy"
            width={500}
            height={500}
          />
        </Aside>

        <Article>
          <Title>{element.title}</Title>

          <section aria-labelledby="ingredients-heading">
            <p id="ingredients-heading">
              <strong>Ingredients</strong>
            </p>
            <StyledList>
              {element.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </StyledList>
          </section>

          <Paragraph>
            <p>
              <strong>Preparation</strong>
            </p>
            {element.preparation}
          </Paragraph>

          <Paragraph>
            <p>
              <strong>Usage</strong>
            </p>
            {element.usage}
          </Paragraph>

          <section aria-labelledby="symptoms-heading">
            <p id="symptoms-heading">
              <strong>Symptoms</strong>
            </p>
            <StyledList>
              {element.symptoms?.length > 0 ? (
                element.symptoms.map((symptom, index) => (
                  <li key={symptom._id || index}>{symptom.name}</li>
                ))
              ) : (
                <li>No symptoms listed.</li>
              )}
            </StyledList>
          </section>
        </Article>
      </Section>
    </Wrapper>
  );
}
