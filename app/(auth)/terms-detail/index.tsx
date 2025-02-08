import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Typography from '@/components/atoms/Typography';
import { TermsContext } from '@/context/TermsContext';
import Button from '@/components/atoms/Button';
import { useRouter } from 'expo-router';
import { colors } from '@/theme';

const TermsDetail = () => {
  const context = useContext(TermsContext);
  const router = useRouter();
  const { id, title, content } = useLocalSearchParams();

  if (!context) {
    throw new Error('TermsContext must be used within a TermsProvider');
  }
  const { setTerms } = context;

  const handleCheckChange = async () => {
    setTerms((prevTerms) =>
      prevTerms.map((option) => (option.id === Number(id) ? { ...option, checked: !option.checked } : option)),
    );
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, padding: 20 }}>
        <Typography variant="heading3" style={{ textAlign: 'center' }}>
          {title}
        </Typography>
        <Text>{content}</Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 20,
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: colors.gray[3],
        }}
      >
        <Button variant="contained" onPress={handleCheckChange} style={{ width: '100%' }}>
          동의
        </Button>
      </View>
    </View>
  );
};

export default TermsDetail;
