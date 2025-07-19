import React, { createContext, useContext, ReactNode } from 'react';
import {
  useForm,
  UseFormWatch,
  UseFormGetValues,
  UseFormSetValue,
  Control,
  FormState,
  UseFormHandleSubmit,
} from 'react-hook-form';

interface FormContextType {
  control: Control<StudyRequest.Recruit>;
  formState: FormState<StudyRequest.Recruit>;
  handleSubmit: UseFormHandleSubmit<StudyRequest.Recruit>;
  watch: UseFormWatch<StudyRequest.Recruit>;
  getValues: UseFormGetValues<StudyRequest.Recruit>;
  setValue: UseFormSetValue<StudyRequest.Recruit>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const FormProvider = ({ children }: { children: ReactNode }) => {
  const { control, formState, handleSubmit, watch, getValues, setValue } = useForm<StudyRequest.Recruit>({
    defaultValues: {
      capacity: 1,
      form: 'ONLINE',
      regular: true,
      rules: [],
    },
  });

  return (
    <FormContext.Provider value={{ control, formState, handleSubmit, watch, getValues, setValue }}>
      {children}
    </FormContext.Provider>
  );
};

const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export { FormProvider, useFormContext };
