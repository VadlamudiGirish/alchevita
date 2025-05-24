import Link from "next/link";
import styled from "styled-components";
import { StyledImage } from "../StyledImage/StyledImage";
import SymptomsList from "../SymptomsList/SymptomsList";
import BookMarkButton from "../BookmarkButton/BookmarkButton";
import { useBookmarks } from "@/hooks/useBookmarks";

const CardContainer = styled.li`
  position: relative;
  border: 1px solid var(--text-dark);
  border-radius: 0.8rem;
  padding: 1.5rem;
  background-color: var(--surface);
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 10rem;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0.5rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.2;
  height: 2.4em;
  word-break: break-word;
  color: var(--text-dark);
  transition: color 0.3s ease;
`;

export default function Card({ remedy, currentPath }) {
  const { toggle } = useBookmarks();
  return (
    <CardContainer>
      <ImageContainer>
        <BookMarkButton
          bookmarked={remedy.isBookmarked}
          onToggle={() => toggle(remedy._id, remedy.isBookmarked, currentPath)}
        />
        <Link
          href={`remedies/${remedy._id}`}
          aria-label={`View details for ${remedy.title}`}
        >
          <StyledImage
            src={remedy.imageUrl}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={`Visual representation of ${remedy.title}`}
          />
        </Link>
      </ImageContainer>

      <Title>{remedy.title}</Title>
      <SymptomsList symptoms={remedy.symptoms} currentPath={currentPath} />
    </CardContainer>
  );
}
