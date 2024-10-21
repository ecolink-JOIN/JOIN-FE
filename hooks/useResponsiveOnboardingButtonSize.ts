import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

interface ButtonSizeConfig {
  buttonCountByRow?: number;
  gap?: number;
}

const useOnboardingButtonSize = ({ buttonCountByRow = 2, gap = 20 }: ButtonSizeConfig) => {
  const [buttonSize, setButtonSize] = useState(0);

  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    const padding = 40;
    const totalGapWidth = gap * (buttonCountByRow - 1);
    const size = (screenWidth - totalGapWidth - padding) / buttonCountByRow;
    setButtonSize(size);
  }, [buttonCountByRow]);

  return buttonSize;
};

export default useOnboardingButtonSize;
