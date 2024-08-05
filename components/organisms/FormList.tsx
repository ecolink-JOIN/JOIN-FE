import React, { useRef, useState } from 'react';
import TextField from '../atoms/TextField';
import FormControl from '../molecules/FormControl';

function FormList() {
  const testRef = useRef(null);
  const [value, setValue] = useState<string>('');

  return (
    <>
      <TextField ref={testRef} />
      <TextField placeholder="12321321" />
      <TextField value="123213" />
      <TextField value={value} onChangeText={setValue} />

      <FormControl label="Label">
        <TextField />
      </FormControl>
    </>
  );
}

export default FormList;
