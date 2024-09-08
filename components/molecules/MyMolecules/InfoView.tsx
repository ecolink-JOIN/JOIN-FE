import styled from 'styled-components/native';
import { colors } from '@/theme';
import { View } from 'react-native';
import Typography from '../../atoms/Typography';

const InfoView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background-color: ${colors.primary + '30'};
  border-radius: 16px;
`;

interface InfoProps {
  title: string;
  value: string;
}

export const InfoViewBox = ({ InfoList }: { InfoList: InfoProps[] }) => {
  return (
    <InfoView>
      {InfoList.map((info) => (
        <View key={info.title} style={{ alignItems: 'center', gap: 11, flex: 1 }}>
          <Typography variant="body3" style={{ color: colors.primary }}>
            {info.title}
          </Typography>
          <Typography variant="heading3">{info.value}</Typography>
        </View>
      ))}
    </InfoView>
  );
};
