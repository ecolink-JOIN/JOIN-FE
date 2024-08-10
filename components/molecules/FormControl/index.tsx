import Typography from '@/components/atoms/Typography';
import React from 'react';
import styled from 'styled-components/native';

interface FormControlProps {
  label: string;
  children: React.ReactNode;
}

const FormControlContainer = styled.View`
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormControl: React.FC<FormControlProps> = ({ label, children }) => {
  return (
    <FormControlContainer>
      <Typography variant="button">{label}</Typography>
      {children}
    </FormControlContainer>
  );
};

export default FormControl;
