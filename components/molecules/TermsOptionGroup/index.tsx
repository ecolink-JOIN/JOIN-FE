import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import TermsOption from '@/components/molecules/TermsOption';
import Typography from '@/components/atoms/Typography';
import { TermsContext } from '@/context/TermsContext';
import { CircleCheckbox } from '@/components/atoms/Checkbox';
import Divider from '@/components/atoms/Divider';
import { View } from 'react-native';
import { TermsService } from '@/apis';

const GroupContainer = styled.View`
  padding-vertical: 12px;
`;

const SelectAllContainer = styled.Pressable`
  padding-vertical: 12px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const TermsOptionGroup: React.FC = () => {
  const [data, setData] = useState<Terms.BaseDto>();
  const context = useContext(TermsContext);

  const fetchTerms = async () => {
    TermsService()
      .Base()
      .then((data) => setData(data));
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!context) {
    throw new Error('TermsContext must be used within a TermsProvider');
  }

  const { terms, setTerms } = context;

  const allChecked = terms.every((option) => option.checked);
  const allRequiredChecked = terms.filter((option) => option.required).every((option) => option.checked);

  const handleCheckChange = async (index: number) => {
    setTerms((prevTerms) =>
      prevTerms.map((option, i) => (i === index ? { ...option, checked: !option.checked } : option)),
    );
  };

  const handleViewPress = async (index: number) => {
    const term = data?.data[index];
    if (!term) {
      return;
    }
  };

  const handleSelectAll = () => {
    setTerms((prevTerms) =>
      prevTerms.map((option) => ({
        ...option,
        checked: !allChecked || (option.required && !allRequiredChecked),
      })),
    );
  };

  return (
    <GroupContainer>
      <SelectAllContainer onPress={handleSelectAll}>
        <CircleCheckbox onSelect={handleSelectAll} selected={allChecked} />
        <Typography variant="body2" style={{ marginLeft: 4 }}>
          모두 동의 (선택 정보 포함)
        </Typography>
      </SelectAllContainer>

      <View
        style={{
          position: 'relative',
          paddingVertical: 12,
        }}
      >
        <Divider style={{ height: 2 }} />
      </View>

      {data?.data === undefined ? (
        <Typography variant="body2">약관을 불러오는 중입니다.</Typography>
      ) : (
        data.data.map((option, index) => (
          <TermsOption
            key={option.id}
            text={option.title}
            checked={terms[index].checked}
            onCheckChange={() => handleCheckChange(index)}
            onViewPress={() => handleViewPress(index)}
          />
        ))
      )}
    </GroupContainer>
  );
};

export default TermsOptionGroup;
