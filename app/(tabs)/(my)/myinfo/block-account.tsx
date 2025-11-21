import { ManageView, shadowStyles, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import React, { useEffect, useState } from 'react';
import Typography from '@/components/atoms/Typography';
import { styled } from 'styled-components/native';
import { colors } from '@/theme';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import Chip from '@/components/atoms/Badge';
import { Image, ScrollView, ActivityIndicator, View, Alert } from 'react-native';
import { ModalWrapper } from '@/components/molecules/ModalViews';
import { BlocksService } from '@/apis';

const Index = () => {
  const [search, setSearch] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [studyList, setStudyList] = useState<BlocksResponse.StudyBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<{
    avatarToken: string;
    nickname: string;
    studyToken: string;
    isActive: boolean;
    profileUrl?: string;
  } | null>(null);
  const [isBlocking, setIsBlocking] = useState(false);

  useEffect(() => {
    fetchStudyList();
  }, []);

  const fetchStudyList = async () => {
    try {
      setIsLoading(true);
      const data = await BlocksService().getStudyBlock();
      setStudyList(data);
    } catch (error) {
      console.error('스터디 목록 조회 실패:', error);
      Alert.alert('오류', '스터디 목록을 불러오는데 실패했습니다.');
      setStudyList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    if (isModalVisible) {
      setSelectedMember(null);
    }
  };

  const handleBlockPress = (member: BlocksResponse.Member, studyToken: string, isActive: boolean) => {
    setSelectedMember({
      avatarToken: member.avatarToken,
      nickname: member.nickname,
      studyToken,
      isActive,
      profileUrl: member.profileUrl,
    });
    setIsModalVisible(true);
  };

  const handleBlockConfirm = async () => {
    if (!selectedMember) return;

    try {
      setIsBlocking(true);
      const blockDate = new Date().toISOString();

      if (selectedMember.isActive) {
        // 진행 중인 스터디 멤버 차단
        await BlocksService().postBlockStudyMember({
          targetAvatarToken: selectedMember.avatarToken,
          studyToken: selectedMember.studyToken,
          blockDate,
        });
      } else {
        // 일반 사용자 차단
        await BlocksService().postBlocks({
          targetAvatarToken: selectedMember.avatarToken,
          blockDate,
        });
      }

      Alert.alert('완료', '차단이 완료되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            toggleModal();
            fetchStudyList();
          },
        },
      ]);
    } catch (error) {
      console.error('차단 실패:', error);
      Alert.alert('오류', '차단에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsBlocking(false);
    }
  };

  // 검색 필터링
  const filteredStudyList = studyList.filter((study) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      (study.title || '').toLowerCase().includes(searchLower) ||
      study.members.some((member) => (member.nickname || '').toLowerCase().includes(searchLower))
    );
  });

  if (isLoading) {
    return (
      <ManageView>
        <Typography variant="heading3">계정 차단</Typography>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 }}>
          <ActivityIndicator size="large" color={colors.primary[5]} />
        </View>
      </ManageView>
    );
  }

  return (
    <ScrollView>
      <ManageView>
        <Typography variant="heading3">계정 차단</Typography>
        <SearchWrapper>
          <SearchBox>
            <SearchImg name="search" />
            <SearchInput placeholder="스터디 또는 닉네임 검색" value={search} onChangeText={setSearch} />
          </SearchBox>
          <Button variant="contained" onPress={() => setSearch(search)}>
            검색
          </Button>
        </SearchWrapper>

        {filteredStudyList.length === 0 ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <Typography variant="body3" style={{ color: colors.gray[8] }}>
              {search ? '검색 결과가 없습니다.' : '차단 가능한 스터디원이 없습니다.'}
            </Typography>
          </View>
        ) : (
          filteredStudyList.map((study, index) => (
            <ManageBoxView style={shadowStyles.shadow} key={index}>
              <TitleView>
                <Typography variant="body3" style={{ color: colors.gray[9] }}>
                  {study.title}
                </Typography>
                <Chip
                  variant={study.isActive ? 'outlined' : 'default'}
                  value={study.isActive ? '진행중' : '완료'}
                  size="large"
                />
              </TitleView>
              {study.members.map((member, memberIndex) => (
                <Profiles key={memberIndex}>
                  <Image
                    source={member.profileUrl ? { uri: member.profileUrl } : require('@/assets/images/profile.png')}
                    style={{ width: 24, height: 24, borderRadius: 100 }}
                  />
                  <Typography variant="body3" style={{ marginLeft: 10 }}>
                    {member.nickname}
                  </Typography>
                  <ButtonView onPress={() => handleBlockPress(member, study.studyToken, study.isActive)}>
                    <Typography variant="body3" style={{ color: colors.primary }}>
                      차단
                    </Typography>
                  </ButtonView>
                </Profiles>
              ))}
            </ManageBoxView>
          ))
        )}
      </ManageView>

      <ModalWrapper isModalVisible={isModalVisible} toggleModal={toggleModal}>
        <ModalContents>
          <Image
            source={
              selectedMember?.profileUrl ? { uri: selectedMember.profileUrl } : require('@/assets/images/profile.png')
            }
            style={{ width: 80, height: 80, borderRadius: 40, marginHorizontal: 'auto' }}
          />
          <Typography variant="subtitle1">{selectedMember?.nickname}</Typography>
          {selectedMember?.isActive ? (
            <Typography variant="body4" style={{ color: colors.black, textAlign: 'center' }}>
              진행 중인 스터디 회원을 차단하면{'\n'}해당 스터디에서 즉시 탈퇴 처리 됩니다.{'\n'}
              {'\n'}스터디장의 승인 없이 스터디에서 탈퇴한다면{'\n'}
              <Typography variant="body4" style={{ fontFamily: 'Pretendard-Bold' }}>
                현재까지의 출결 및 인증의 50%만 인정되어 내 출결률 및 인증률에 반영됩니다.{'\n'}
              </Typography>
              {'\n'}
              차단을 진행하시겠습니까?{'\n'}
            </Typography>
          ) : (
            <Typography variant="body4" style={{ color: colors.black, textAlign: 'center' }}>
              스터디 회원을 차단하면{'\n'}
              <Typography variant="body4" style={{ fontFamily: 'Pretendard-Bold' }}>
                해당 스터디원이 포함된 스터디는{'\n'}앞으로 노출 및 가입되지 않습니다.{'\n'}
              </Typography>
              {'\n'}
              차단을 진행하시겠습니까?{'\n'}
            </Typography>
          )}
          <Button
            variant="contained"
            onPress={handleBlockConfirm}
            style={{ marginHorizontal: 'auto' }}
            disabled={isBlocking}
          >
            {isBlocking ? <ActivityIndicator color={colors.white} size="small" /> : '차단하기'}
          </Button>
        </ModalContents>
      </ModalWrapper>
    </ScrollView>
  );
};

export default Index;

const TitleView = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom-color: ${colors.gray[2]};
  border-bottom-width: 2px;
  align-items: center;
`;
const SearchWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

const SearchBox = styled.View`
  position: relative;
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.white};
  border-radius: 20px;
  border: 1.5px solid ${colors.gray[4]};
  height: 44px;
  padding: 10px 20px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  margin-left: 40px;
  color: ${colors.gray[9]};
  font-size: 14px;
`;

const SearchImg = styled(Icon)`
  position: absolute;
  left: 16px;
`;
const Profiles = styled.View`
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
`;

const ButtonView = styled.Pressable`
  padding: 6px 12px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  background-color: ${colors.sub2};
  border-radius: 6px;
`;

const ModalContents = styled.View`
  gap: 12px;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
