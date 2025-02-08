import React, { useContext, useEffect } from 'react';
import styled from 'styled-components/native';
import TermsOption from '@/components/molecules/TermsOption';
import Typography from '@/components/atoms/Typography';
import { TermsContext } from '@/context/TermsContext';
import { CircleCheckbox } from '@/components/atoms/Checkbox';
import Divider from '@/components/atoms/Divider';
import { View } from 'react-native';
import { TermsService } from '@/apis';
import { useRouter } from 'expo-router';

const GroupContainer = styled.View`
  padding-top: 12px;
  padding-bottom: 12px;
`;

const SelectAllContainer = styled.Pressable`
  padding-top: 12px;
  padding-bottom: 12px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const TermsOptionGroup: React.FC = () => {
  const router = useRouter();
  // const [data, setData] = useState<Terms.Term[]>();
  const context = useContext(TermsContext);

  useEffect(() => {
    fetchTerms();
  }, []);

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

  const fetchTerms = async () => {
    TermsService()
      .Base()
      .then((data) =>
        setTerms(
          data.map((option) => ({
            id: option.id,
            version: option.version,
            title: option.title,
            context: option.content,
            checked: false,
            required: option.type === 'REQUIRED',
          })),
        ),
      );
  };

  const handleViewPress = async (index: number) => {
    const term = terms[index];
    router.push({
      pathname: `/(auth)/terms-detail`,
      params: {
        id: term.id,
        version: term.version,
        title: term.title,
        type: term.required ? 'REQUIRED' : 'OPTIONAL',
        content: term.context,
      },
    });
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

      {terms.length < 1 ? (
        <Typography variant="body2">동의가 필요한 약관이 존재하지 않습니다.</Typography>
      ) : (
        terms.map((option, index) => (
          <TermsOption
            key={option.id}
            text={option.title}
            type={option.required ? 'REQUIRED' : 'OPTIONAL'}
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
