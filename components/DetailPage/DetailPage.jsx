import { useRouter } from "next/router";
import { useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import Image from "next/image";

const Wrapper = styled.section`
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

const Flex = styled.div`
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

const AllButtons = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  transition: background 0.2s ease-in-out;

  &.delete {
    background-color: rgb(226, 10, 64);
    color: white;
  }

  &.confirm {
    background-color: rgb(226, 10, 64);
    color: white;
  }

  &.cancel {
    background-color: #f8d7da;
    color: rgb(226, 10, 64);
    border: 1px solid rgb(235, 151, 159);

    &:hover {
      background-color: #f1c0c4;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h3`
  margin-bottom: 1rem;
`;

const ModalText = styled.p`
  margin-bottom: 2rem;
  color: #333333;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

function DeleteConfirmationModal({ onCancel, onConfirm }) {
  const modalRef = useRef(null);
  const handleOverlayClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onCancel();
    }
  };
  return (
    <ModalOverlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleOverlayClick}
    >
      <ModalContent ref={modalRef}>
        <ModalTitle id="modal-title">Confirm remedy deletion</ModalTitle>
        <ModalText id="modal-description">
          Are you sure you want to delete this remedy? This action cannot be
          undone.
        </ModalText>
        <ModalActions>
          <Button className="cancel" onClick={onCancel} autoFocus>
            Cancel
          </Button>
          <Button className="confirm" onClick={onConfirm}>
            Confirm Delete
          </Button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
}

export default function DetailPage({ element }) {
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    const res = await fetch(`/api/remedies/${element._id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.push("/");
    } else {
      alert("Failed to delete remedy.");
    }
  };

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

      <Flex>
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
            <h3 id="ingredients-heading">Ingredients</h3>
            <StyledList>
              {element.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </StyledList>
          </section>

          <section aria-labelledby="preparation-heading">
            <h3 id="preparation-heading">Preparation</h3>
            <p>{element.preparation}</p>
          </section>

          <section aria-labelledby="usage-heading">
            <h3 id="usage-heading">Usage</h3>
            <p>{element.usage}</p>
          </section>

          <section aria-labelledby="symptoms-heading">
            <h3 id="symptoms-heading">Symptoms</h3>
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

          {confirmDelete && (
            <DeleteConfirmationModal
              onCancel={() => setConfirmDelete(false)}
              onConfirm={handleDelete}
            />
          )}
          <AllButtons>
            <Button className="delete" onClick={() => setConfirmDelete(true)}>
              Delete
            </Button>
          </AllButtons>
        </Article>
      </Flex>
    </Wrapper>
  );
}
