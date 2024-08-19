import React from 'react';
import { View } from 'react-native';
import FormModView from '@/components/atoms/View/FormMods';
import Typography from '@/components/atoms/Typography';
import { Radio } from '@/components/atoms/Radio';

interface MeetingWayProps {
  online: boolean;
  setOnline: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MeetingWay: React.FC<MeetingWayProps> = ({ online, setOnline }) => {
  return (
    <FormModView>
      <Typography variant="button">모집 방법</Typography>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 40 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <Radio selected={online} onSelect={() => setOnline(true)} />
          <Typography variant="body2" style={{ marginLeft: 8 }} onPress={() => setOnline(true)}>
            온라인
          </Typography>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <Radio selected={!online} onSelect={() => setOnline(false)} />
          <Typography variant="body2" style={{ marginLeft: 8 }} onPress={() => setOnline(false)}>
            오프라인
          </Typography>
        </View>
      </View>
    </FormModView>
  );
};
