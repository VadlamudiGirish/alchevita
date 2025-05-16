import useSWR from "swr";
import styled from "styled-components";

const FilterWrapper = styled.section`
  margin: 1.5rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 1rem 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(155, 255, 255, 0.1);
  max-width: 800px;
  gap: 0.75rem;
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: white;
  font-size: 1rem;
  color: #111827;
  min-width: 250px;
  outline: none;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231fab89'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.5rem;

  &:focus {
    border-color: #1fab89;
    box-shadow: 0 0 0 3px rgba(31, 171, 137, 0.2);
  }

  &:hover {
    border-color: #9ca3af;
  }
`;

const ClearButton = styled.button`
  background: #1fab89;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 50%;
  color: white;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #178066;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default function RemedyFilter({ selectedSymptom, onSelect, onClear }) {
  const { data: symptoms = [], isLoading, error } = useSWR("/api/symptoms");

  if (isLoading) return <p>Loading filters...</p>;
  if (error) return <p>Failed to loading filters</p>;
  return (
    <FilterWrapper>
      <Select
        value={selectedSymptom}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Choose symptom</option>
        {symptoms.map((symptom) => (
          <option key={symptom._id} value={symptom.name}>
            {symptom.name}
          </option>
        ))}
      </Select>

      {selectedSymptom && (
        <ClearButton onClick={onClear} aria-label="Clear filter">
          x
        </ClearButton>
      )}
    </FilterWrapper>
  );
}
