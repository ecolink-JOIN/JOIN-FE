import React from 'react';
import { ManageView, ManageBox } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { MemberEvaluation } from '@/components/organisms/MyPage/Manage';
import { useLocalSearchParams } from 'expo-router';
import { FlatList, View } from 'react-native';

const Evaluation = () => {
  const params = useLocalSearchParams<{ memberId: string }>();

  console.log(params);

  return (
    <View>
      <FlatList
        data={[null]}
        renderItem={() => {
          return (
            <ManageView>
              <Typography variant="heading3">스터디원 평가</Typography>
              <ManageBox>
                <MemberEvaluation />
              </ManageBox>
            </ManageView>
          );
        }}
      />
    </View>
  );
};

export default Evaluation;
