import useSWR from "swr";
import styled from "styled-components";

const FilterWrapper = styled.section`
  margin: 1.5rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  gap: 0.75rem;
  background-color: var(--surface);
  transition: background-color 0.3s ease;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  border: 1px solid var(--text-dark);
  background-color: var(--surface);
  font-size: 1rem;
  font-family: Manrope;
  color: var(--text-dark);
  min-width: 250px;
  outline: none;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231fab89'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 2rem;

  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(31, 171, 137, 0.2);
  }

  &:hover {
    border-color: var(--primary);
  }
`;

const ClearButton = styled.button`
  background: var(--primary);
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
    background: var(--text-dark);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default function RemedyFilter({ selectedSymptom, onSelect, onClear }) {
  const { data: symptoms = [], isLoading, error } = useSWR("/api/symptoms");

  if (isLoading) return <p>Loading filters...</p>;
  if (error) return <p>Failed to load filters</p>;
  return (
    <FilterWrapper>
      <Select
        value={selectedSymptom}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select symptom</option>
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
