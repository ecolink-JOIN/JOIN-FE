import styled from 'styled-components/native';
import { colors } from '@/theme';
import { View } from 'react-native';
import Typography from '../../atoms/Typography';

interface InfoViewProps {
  center?: boolean;
}

const InfoView = styled.View<InfoViewProps>`
  flex-direction: row;
  justify-content: ${({ center }) => (center ? 'space-between' : 'flex-start')};
  align-items: center;
  padding: ${({ center }) => (center ? '16px 40px' : '16px 20px')};
  gap: 24px;
  background-color: ${colors.primary + '30'};
  border-radius: 16px;
`;

interface InfoProps {
  title: string;
  value: string;
}

interface InfoViewBoxProps {
  InfoList: InfoProps[];
  center?: boolean;
}

export const InfoViewBox = ({ InfoList, center = false }: InfoViewBoxProps) => {
  return (
    <InfoView center={center}>
      {InfoList.map((info) => (
        <View
          key={info.title}
          style={{
            alignItems: center ? 'center' : 'flex-start',
            gap: 8,
            flex: center ? 1 : 0,
          }}
        >
          <Typography variant="body3" style={{ color: colors.primary }}>
            {info.title}
          </Typography>
          <Typography variant="heading3" style={{ paddingHorizontal: 5 }}>
            {info.value}
          </Typography>
        </View>
      ))}
    </InfoView>
  );
};
