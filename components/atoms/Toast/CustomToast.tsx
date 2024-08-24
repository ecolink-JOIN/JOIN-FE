import { View } from 'react-native';
import Toast, { ToastConfig } from 'react-native-toast-message';
import Typography from '../Typography';
import { colors } from '@/theme';
import styled from 'styled-components/native';

export const toastConfig: ToastConfig = {
  form: ({ text1 }) => (
    <StyledView>
      <Typography variant="body4" style={{ color: colors.white }}>
        {text1}
      </Typography>
      <StyledConfirmText variant="body3" onPress={() => Toast.hide()}>
        확인
      </StyledConfirmText>
    </StyledView>
  ),
};

const StyledView = styled(View)`
  background-color: ${colors.gray[11]};
  padding: 0 16px 0 8px;
  border-radius: 4px;
  width: 100%;
  height: 48px;
  margin: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledConfirmText = styled(Typography)`
  color: ${colors.primary};
  padding: 10px;
`;
