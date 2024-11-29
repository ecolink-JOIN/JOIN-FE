import { ManageView, shadowStyles, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import React from 'react';
import Typography from '@/components/atoms/Typography';
import { styled } from 'styled-components/native';
import { colors } from '@/theme';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import Chip from '@/components/atoms/Badge';
import { Image, ScrollView } from 'react-native';
import { ModalWrapper } from '@/components/molecules/ModalViews';

const list = [
  {
    title: '토익 990점 스터디 🔥',
    ongoing: true,
    members: [
      {
        id: 1,
        name: '김철수',
        img: require('@/assets/images/profile.png'),
      },
      {
        id: 2,
        name: '홍길동',
        img: require('@/assets/images/profile.png'),
      },
      {
        id: 3,
        name: '이영희',
        img: require('@/assets/images/profile.png'),
      },
      {
        id: 4,
        name: '박지성',
        img: require('@/assets/images/profile.png'),
      },
      {
        id: 5,
        name: '김연아',
        img: require('@/assets/images/profile.png'),
      },
    ],
  },
  {
    title: '중급 토익 스터디 🍀',
    ongoing: false,
    members: [
      {
        id: 1,
        name: '김철수',
        img: require('@/assets/images/profile.png'),
      },
      {
        id: 2,
        name: '홍길동',
        img: require('@/assets/images/profile.png'),
      },
      {
        id: 3,
        name: '이영희',
        img: require('@/assets/images/profile.png'),
      },
      {
        id: 4,
        name: '박지성',
        img: require('@/assets/images/profile.png'),
      },
      {
        id: 5,
        name: '김연아',
        img: require('@/assets/images/profile.png'),
      },
    ],
  },
];
const Index = () => {
  const [search, setSearch] = React.useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <ScrollView>
      <ManageView>
        <Typography variant="heading3">계정 차단</Typography>
        <SearchWrapper>
          <SearchBox>
            <SearchImg name="search" />
            <SearchInput placeholder="검색어를 입력하세요" value={search} onChangeText={setSearch} />
          </SearchBox>
          <Button variant="contained">검색</Button>
        </SearchWrapper>
        {list.map((item, index) => (
          <ManageBoxView style={shadowStyles.shadow} key={index}>
            <TitleView>
              <Typography variant="body3" style={{ color: colors.gray[9] }}>
                {item.title}
              </Typography>
              <Chip
                variant={item.ongoing ? 'outlined' : 'default'}
                value={item.ongoing ? '진행중' : '완료'}
                size="large"
              />
            </TitleView>
            {item.members.map((member, index) => (
              <Profiles key={index}>
                <Image source={member.img} style={{ width: 24, height: 24, borderRadius: 100 }} />
                <Typography variant="body3" style={{ marginLeft: 10 }}>
                  {member.name}
                </Typography>
                <ButtonView onPress={toggleModal}>
                  <Typography variant="body3" style={{ color: colors.primary }}>
                    차단
                  </Typography>
                </ButtonView>
              </Profiles>
            ))}
          </ManageBoxView>
        ))}
      </ManageView>
      <ModalWrapper isModalVisible={isModalVisible} toggleModal={toggleModal}>
        <ModalContents>
          <Image
            source={require('@/assets/images/profile.png')}
            style={{ width: 80, height: 80, marginHorizontal: 'auto' }}
          />
          <Typography variant="subtitle1">닉네임</Typography>
          {false ? (
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
            onPress={() => {
              toggleModal();
            }}
            style={{ marginHorizontal: 'auto' }}
          >
            차단하기
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
  background-color: ${colors.white};
  border-radius: 20px;
  border: 1.5px solid ${colors.gray[4]};
  height: 44px;
  padding: 10px 20px;
  overflow: hidden;
`;

const SearchInput = styled.TextInput`
  position: absolute;
  left: 50px;
  flex: 1;
  width: 80%;
  color: ${colors.gray[9]};
`;

const SearchImg = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 10px;
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
