import React, { useState, useEffect } from 'react';
import { Modal, SafeAreaView, TextInput, View, Pressable, FlatList, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import Icon from '@/components/atoms/Icon';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
}

const OuterContainer = styled(View)`
  flex: 1;
  padding-horizontal: 20px;
  background-color: white;
`;

const ModalContainer = styled(SafeAreaView)`
  flex: 1;
`;

const SearchInputContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.white};
  border-radius: 20px;
  padding-horizontal: 10px;
  height: 44px;
  flex: 1;
  border-width: 1px;
  border-color: ${colors.primary};
`;

const SearchInput = styled(TextInput)`
  flex: 1;
  padding-horizontal: 10px;
  font-family: 'Pretendard-Medium';
  font-weight: 500;
  font-size: 16px;
  letter-spacing: -0.08px;
  text-align: left;
`;

const HeaderContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  height: 76px;
  padding-vertical: 16px;
`;

const BackButton = styled(Pressable)`
  margin-right: 10px;
  justify-content: center;
`;

const RecentSearchContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 24px;
`;

const DeleteButton = styled(Pressable)``;

const RecentSearchItem = styled(Pressable)`
  flex-direction: row;
  gap: 16px;
  margin-bottom: 12px;
`;

const SearchModal: React.FC<SearchModalProps> = ({ visible, onClose }) => {
  const [searchText, setSearchText] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Example 1',
    'Example 2',
    'Example 3',
    'Example 4',
    'Example 5',
  ]);

  useEffect(() => {
    if (visible) {
      setShowResults(false);
      setSearchText('');
    }
  }, [visible]);

  const renderItem = ({ item }: { item: string }) => (
    <RecentSearchItem onPress={() => handleRecentSearch(item)}>
      <Icon name="clock" />
      <Typography variant="body2" style={{ color: colors.gray[10] }}>
        {item}
      </Typography>
    </RecentSearchItem>
  );

  const handleChangeText = (text: string) => {
    setSearchText(text);
  };

  const clearText = () => {
    setSearchText('');
  };

  const handleSearchSubmit = () => {
    if (searchText.trim().length > 0) {
      setRecentSearches((prev) => [searchText, ...prev]);
      setShowResults(true);
      Keyboard.dismiss();
    }
  };

  const handleRecentSearch = (item: string) => {
    setSearchText(item);
    setShowResults(true);
    Keyboard.dismiss();
  };

  const handleDeleteAll = () => {
    setRecentSearches([]);
  };

  return (
    <Modal animationType="fade" transparent={false} visible={visible} onRequestClose={onClose}>
      <OuterContainer>
        <ModalContainer>
          <HeaderContainer>
            <BackButton onPress={onClose}>
              <Ionicons name="arrow-back" size={24} />
            </BackButton>
            <SearchInputContainer>
              <Icon name="search" fill={colors.primary} />
              <SearchInput
                placeholder="검색어를 입력하세요."
                placeholderTextColor={colors.primary}
                value={searchText}
                onChangeText={handleChangeText}
                onSubmitEditing={handleSearchSubmit}
              />
              {searchText.length > 0 && (
                <Pressable onPress={clearText}>
                  <Icon name="close-outline" width={24} height={24} />
                </Pressable>
              )}
            </SearchInputContainer>
          </HeaderContainer>

          {!showResults ? (
            <View>
              <RecentSearchContainer>
                <Typography variant="subtitle2">최근 검색</Typography>
                <DeleteButton onPress={handleDeleteAll}>
                  <Typography variant="body2" style={{ color: colors.gray[7] }}>
                    전체 삭제
                  </Typography>
                </DeleteButton>
              </RecentSearchContainer>
              <FlatList
                data={recentSearches}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{
                  padding: 0,
                  margin: 0,
                }}
              />
            </View>
          ) : (
            <View>
              <Typography variant="subtitle2">검색 결과</Typography>
              <Typography variant="body2">아직 디자인 작업중이라고 하심</Typography>
            </View>
          )}
        </ModalContainer>
      </OuterContainer>
    </Modal>
  );
};

export default SearchModal;
