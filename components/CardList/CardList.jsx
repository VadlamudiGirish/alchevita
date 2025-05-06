import styled from "styled-components";
import Card from "../Card/Card";

const StyledMain = styled.main`
  padding: 2.5rem 1.5rem 1.5rem;
`;

const StyledGrid = styled.ul`
  display: grid;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 2.5rem 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const EmptyMessage = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #666;
  text-align: center;
`;

export default function CardList({
  elements = [],
  bookmarkedIds = new Set(),
  onBookmarkToggle,
}) {
  return (
    <StyledMain>
      {elements.length === 0 ? (
        <EmptyMessage>No remedies available.</EmptyMessage>
      ) : (
        <StyledGrid>
          {elements.map((el) => (
            <Card
              key={el._id}
              title={el.title}
              imageUrl={el.imageUrl}
              id={el._id}
              symptoms={el.symptoms}
              bookmarked={bookmarkedIds.has(el._id)}
              onBookmarkToggle={onBookmarkToggle}
            />
          ))}
        </StyledGrid>
      )}
    </StyledMain>
  );
}
