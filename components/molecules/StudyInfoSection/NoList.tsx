import { View } from 'react-native';
import React from 'react';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import Button from '@/components/atoms/Button';
import { router } from 'expo-router';

interface NoListProps {
  desc: string;
  buttonText: string;
  buttonHref: string;
}

const NoList = ({ desc, buttonText, buttonHref }: NoListProps) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 48, gap: 24 }}>
      <Typography variant="body3" style={{ color: colors.gray[8] }}>
        {desc}
      </Typography>
      <Button
        variant="contained"
        onPress={() => {
          router.push(buttonHref);
        }}
        fullWidth
      >
        {buttonText}
      </Button>
    </View>
  );
};

export default NoList;
