import { useState } from 'react';
import { Switch } from '../atoms/Switch';
import { Radio } from '../atoms/Radio';
import { Checkbox, CircleCheckbox } from '../atoms/Checkbox';

function ToggleComponentList() {
  const [value, setValue] = useState<boolean>(false);
  const [value2, setValue2] = useState<boolean>(false);
  const [value3, setValue3] = useState<boolean>(false);
  const [value4, setValue4] = useState<boolean>(false);

  return (
    <>
      <Switch value={value} onValueChange={setValue} />
      <Switch value />
      <Switch />

      <Radio selected={value2} onSelect={setValue2} />
      <Radio />
      <Radio selected />

      <Checkbox selected={value3} onSelect={setValue3} />
      <Checkbox />
      <Checkbox selected />

      <CircleCheckbox selected={value4} onSelect={setValue4} />
      <CircleCheckbox />
      <CircleCheckbox selected />
    </>
  );
}

export default ToggleComponentList;
