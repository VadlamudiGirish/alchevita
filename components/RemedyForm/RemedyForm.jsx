import { useState } from "react";
import useSWR from "swr";
import styled, { css } from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  gap: 0.5rem;
  color: var(--text-dark);
`;

const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  border: 1px solid var(--text-dark);
  font-size: 0.75rem;
  color: var(--text-dark);
  font-size: 1rem;
  font-family: inherit;
  background-color: var(--surface);
  outline: none;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px 0 var(--primary);

  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(56, 178, 172, 0.2);
  }

  ${(props) =>
    props.error &&
    css`
      border-color: var(--color-danger-text);
      &:focus {
        box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.2);
      }
    `}
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 0.75rem 1rem;
  border: 1px solid var(--text-dark);
  border-radius: 0.75rem;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  outline: none;
  background-color: var(--surface);
  color: var(--text-dark);
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px 0 var(--primary);

  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(56, 178, 172, 0.2);
  }

  ${(props) =>
    props.error &&
    css`
      border-color: var(--color-danger-text);
    `}
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: var(--primary);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: var(--color-disabled);
    cursor: not-allowed;
    transform: none;
  }
`;

const RemoveBtn = styled.button`
  margin-right: 0.5rem;
  background: none;
  border: none;
  color: var(--color-danger-text);
  cursor: pointer;
  font-weight: bold;
  padding: 0.25rem;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-danger-hover-bg);
  }
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

const ErrorText = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const FileInputContainer = styled.div`
  position: relative;
  margin-top: 0.5rem;
`;

const HiddenFileInput = styled.input`
  position: absolute;
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
`;

const CustomFileButton = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: var(--background);
  color: var(--text-dark);
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid var(--primary);

  &:hover {
    background-color: #e2e8f0;
    border-color: var(--primary);
  }
`;

const PillContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
`;

const IngredientPill = styled.li`
  border-radius: 1rem;
  border: 1px solid var(--text-dark);
  padding: 0;
  font-size: 0.875rem;
  background-color: white;
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 2.5rem;
  box-shadow: 0 1px 2px 0 var(--primary);
  font-family: Manrope;
`;

const IngredientInput = styled.input`
  border: none;
  padding: 0.375rem 0.875rem;
  font-size: 0.875rem;
  background: transparent;
  outline: none;
  color: var(--text-dark);
  min-width: 120px;

  &:focus {
    box-shadow: none;
  }
`;

const SymptomPill = styled.li`
  border-radius: 1rem;
  border: 1px solid var(--text-dark);
  padding: 0.375rem 0.875rem;
  font-size: 0.875rem;
  background-color: white;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 1px 2px 0 var(--primary);
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  transition: background 0.2s ease-in-out;

  &.primary {
    background-color: var(--primary);
    color: white;

    &:hover {
      background-color: #1a9b7d;
    }
  }

  &.cancel {
    background-color: var(--color-danger-bg);
    color: var(--color-danger-text);
    border: 1px solid var(--color-danger-border);

    &:hover {
      background-color: var(--color-danger-hover-bg);
    }
  }
`;

export default function RemedyForm({ mode = "create", onSubmit, initialData }) {
  const { data: symptomsList = [], error, isLoading } = useSWR("/api/symptoms");
  const [ingredients, setIngredients] = useState(
    initialData?.ingredients || [""]
  );
  const [symptoms, setSymptoms] = useState(
    initialData?.symptoms?.map((s) => s._id) || []
  );
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState("");

  const MAX_UPLOAD_SIZE_MB =
    parseInt(process.env.NEXT_PUBLIC_MAX_UPLOAD_SIZE_MB, 10) || 2;

  const validate = (title, ingredientsList, symptomsList) => {
    const errs = {};
    if (!title.trim()) errs.title = "Title is required.";
    if (ingredientsList.filter((i) => i.trim()).length < 1)
      errs.ingredients = "At least one ingredient is required.";
    if (symptomsList.length < 1) errs.symptoms = "Select at least one symptom.";
    if (mode === "create" && !imageFile) errs.image = "An image is required.";
    return errs;
  };

  const handleAddSymptom = () => {
    if (selectedSymptom && !symptoms.includes(selectedSymptom)) {
      setSymptoms([...symptoms, selectedSymptom]);
      setSelectedSymptom("");
      setErrors((prev) => ({ ...prev, symptoms: undefined }));
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
    if (newIngredients.some((i) => i.trim())) {
      setErrors((prev) => ({ ...prev, ingredients: undefined }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageError("");
    if (file) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setImageError("Please select a JPG, PNG or WEBP image.");
        e.target.value = "";
        setImageFile(null);
        return;
      }
      if (file.size > MAX_UPLOAD_SIZE_MB * 1024 * 1024) {
        setImageError(`File too large. Max size is ${MAX_UPLOAD_SIZE_MB} MB.`);
        e.target.value = "";
        setImageFile(null);
        return;
      }
      setImageFile(file);
      setErrors((prev) => ({ ...prev, image: undefined }));
    }
  };

  const handleCancel = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel? Any unsaved changes will be lost."
      )
    ) {
      window.history.back();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title") || "";
    const preparation = formData.get("preparation") || "";
    const usage = formData.get("usage") || "";

    const validationErrors = validate(title, ingredients, symptoms);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    onSubmit({
      title,
      ingredients: ingredients.filter((i) => i.trim()),
      preparation,
      usage,
      symptoms,
      imageFile,
    });
  };

  const canAddIngredient = ingredients[ingredients.length - 1].trim() !== "";

  if (isLoading) return <p>Loading symptoms...</p>;
  if (error) return <p>Failed to load symptoms.</p>;

  return (
    <Form onSubmit={handleSubmit} id="remedy-form">
      <Label>
        Title *
        <Input
          name="title"
          error={!!errors.title}
          required
          defaultValue={initialData?.title}
        />
        {errors.title && <ErrorText>{errors.title}</ErrorText>}
      </Label>

      <Label>
        Ingredients *
        <PillContainer>
          {ingredients.map((value, index) => (
            <IngredientPill key={index}>
              <IngredientInput
                value={value}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                required={index === 0}
                placeholder="Add ingredient"
              />
              <RemoveBtn
                type="button"
                onClick={() =>
                  setIngredients((prev) =>
                    prev.length > 1 ? prev.filter((_, i) => i !== index) : prev
                  )
                }
              >
                ✕
              </RemoveBtn>
            </IngredientPill>
          ))}
        </PillContainer>
        <Button
          type="button"
          onClick={() => setIngredients([...ingredients, ""])}
          disabled={!canAddIngredient}
        >
          +
        </Button>
        {errors.ingredients && <ErrorText>{errors.ingredients}</ErrorText>}
      </Label>

      <Label>
        Preparation
        <Textarea
          name="preparation"
          rows={4}
          defaultValue={initialData?.preparation}
        />
      </Label>

      <Label>
        Usage
        <Textarea name="usage" rows={4} defaultValue={initialData?.usage} />
      </Label>

      <Label>
        Symptoms *
        <Select
          value={selectedSymptom}
          onChange={(e) => setSelectedSymptom(e.target.value)}
        >
          <option value="">Select symptom</option>
          {symptomsList
            .filter((s) => !symptoms.includes(s._id))
            .map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
        </Select>
        <Button
          type="button"
          onClick={handleAddSymptom}
          disabled={!selectedSymptom}
        >
          +
        </Button>
        <PillContainer>
          {symptoms.map((symId, i) => {
            const sym = symptomsList.find((s) => s._id === symId);
            return (
              <SymptomPill key={symId}>
                {sym?.name || symId}
                <RemoveBtn
                  type="button"
                  onClick={() =>
                    setSymptoms((prev) =>
                      prev.filter((_, index) => index !== i)
                    )
                  }
                >
                  ✕
                </RemoveBtn>
              </SymptomPill>
            );
          })}
        </PillContainer>
        {errors.symptoms && <ErrorText>{errors.symptoms}</ErrorText>}
      </Label>

      <Label>
        Upload Image {mode === "create" && "*"}
        <FileInputContainer>
          <HiddenFileInput
            type="file"
            id="image-upload"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleImageChange}
          />
          <CustomFileButton htmlFor="image-upload">
            Choose File
          </CustomFileButton>
          {imageFile && (
            <span style={{ marginLeft: "1rem" }}>{imageFile.name}</span>
          )}
        </FileInputContainer>
        {(imageError || errors.image) && (
          <ErrorText>{imageError || errors.image}</ErrorText>
        )}
        {mode === "edit" && initialData?.imageUrl && (
          <p>Current image will be kept if no new image is uploaded</p>
        )}
      </Label>
      <ButtonContainer>
        {mode === "edit" && (
          <ActionButton type="button" className="cancel" onClick={handleCancel}>
            Cancel
          </ActionButton>
        )}
        <ActionButton
          type="submit"
          className="primary"
          disabled={mode === "create" && !imageFile}
        >
          {mode === "create" ? "Create Remedy" : "Update Remedy"}
        </ActionButton>
      </ButtonContainer>
    </Form>
  );
}
