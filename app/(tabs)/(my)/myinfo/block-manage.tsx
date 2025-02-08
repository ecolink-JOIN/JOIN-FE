import { ManageView, shadowStyles, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { styled } from 'styled-components/native';
import { colors } from '@/theme';
import { Image } from 'react-native';
import { Href, router } from 'expo-router';

const list = [
  {
    name: '닉네임1',
    img: require('@/assets/images/profile.png'),
  },
  {
    name: '닉네임2',
    img: require('@/assets/images/profile.png'),
  },
  {
    name: '닉네임3',
    img: require('@/assets/images/profile.png'),
  },
  {
    name: '닉네임4',
    img: require('@/assets/images/profile.png'),
  },
];
const Index = () => {
  return (
    <ManageView>
      <TitleView>
        <Typography variant="heading3">차단 관리</Typography>
        <Typography variant="heading3" onPress={() => router.push('/myinfo/block-account' as Href)}>
          +
        </Typography>
      </TitleView>
      <ManageBoxView style={shadowStyles.shadow}>
        <LinkView>
          <Typography variant="button">차단된 계정</Typography>
        </LinkView>
        {list.map((item, index) => (
          <Profiles key={index}>
            <Image source={item.img} style={{ width: 24, height: 24, borderRadius: 100 }} />
            <Typography variant="body3" style={{ marginLeft: 10 }}>
              {item.name}
            </Typography>
            <ButtonView>
              <Typography variant="body3" style={{ color: colors.primary }}>
                차단 해제
              </Typography>
            </ButtonView>
          </Profiles>
        ))}
      </ManageBoxView>
    </ManageView>
  );
};

export default Index;

const TitleView = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding: 0 10px 0 0;
`;

const LinkView = styled.Pressable`
  flex-direction: row;
  padding: 10px 20px;
  border-bottom-color: ${colors.gray[2]};
  border-bottom-width: 2px;
  align-items: center;
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
