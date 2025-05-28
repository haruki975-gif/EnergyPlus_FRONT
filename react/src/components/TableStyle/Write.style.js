import styled from "styled-components";

export const WriteFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

export const StyledInput = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const StyledTextarea = styled.textarea`
  padding: 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  min-height: 250px;
  resize: vertical;
`;

export const StyledFileInput = styled.input`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;
