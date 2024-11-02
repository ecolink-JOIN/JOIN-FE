import Toast, { ToastConfig } from 'react-native-toast-message';
import Typography from '../Typography';
import { colors } from '@/theme';
import styled from 'styled-components/native';
import RowView from '../View/RowView';

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
  formNoButton: ({ text1 }) => (
    <StyledView2>
      <Typography variant="body4" style={{ color: colors.white }}>
        {text1}
      </Typography>
      {/* <StyledConfirmText variant="body3" onPress={() => Toast.hide()}>
        확인
      </StyledConfirmText> */}
    </StyledView2>
  ),
};

const StyledView = styled(RowView)`
  background-color: ${colors.gray[11]};
  padding: 0 16px 0 8px;
  border-radius: 4px;
  width: 100%;
  height: 48px;
  margin: 0;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
`;

const StyledConfirmText = styled(Typography)`
  color: ${colors.primary};
  padding: 10px;
`;

const StyledView2 = styled(RowView)`
  background-color: ${colors.gray[11]};
  padding: 10px 16px 0 8px;
  border-radius: 4px;
  width: 100%;
  height: 48px;
  margin: 0;
  justify-content: start;
  align-items: center;
  z-index: 9999;
`;
