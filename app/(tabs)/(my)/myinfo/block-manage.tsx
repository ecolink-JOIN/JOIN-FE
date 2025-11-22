import { ManageView, shadowStyles, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { styled } from 'styled-components/native';
import { colors } from '@/theme';
import { ActivityIndicator, Image, Alert, View } from 'react-native';
import { Href, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { BlocksService } from '@/apis';

const Index = () => {
  const [blockList, setBlockList] = useState<BlocksResponse.GetBlocks['data']>();
  const [isLoading, setIsLoading] = useState(true);
  const [isUnblocking, setIsUnblocking] = useState<number | null>(null);

  const fetchBlockList = async () => {
    try {
      setIsLoading(true);
      const res = await BlocksService().getBlocks();
      setBlockList(res);
    } catch (error) {
      console.error('차단 목록 조회 실패:', error);
      Alert.alert('오류', '차단 목록을 불러오는데 실패했습니다.');
      setBlockList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnblock = async (blockId: number, nickname: string) => {
    Alert.alert('차단 해제', `'${nickname}'님을 차단 해제하시겠습니까?`, [
      { text: '취소', style: 'cancel' },
      {
        text: '차단 해제',
        style: 'destructive',
        onPress: async () => {
          try {
            setIsUnblocking(blockId);
            // TODO: 백엔드 차단 해제 API 확인 필요
            // DELETE /api/v1/blocks/{id} 또는 DELETE /api/v1/blocks/{avatarToken}
            // 현재 엔드포인트: /api/v1/blocks/{blockId}
            await BlocksService().deleteBlock(blockId);
            Alert.alert('완료', '차단이 해제되었습니다.');
            // 목록 새로고침
            await fetchBlockList();
          } catch (error) {
            console.error('차단 해제 실패:', error);
            // TODO: 백엔드 API 확인 필요 - DELETE /api/v1/blocks/{blockId} 파라미터 타입
            Alert.alert(
              '기능 오류',
              '차단 해제 기능에 일시적인 문제가 발생했습니다.\n\n백엔드 API 파라미터 확인이 필요합니다.\n(blockId vs avatarToken)',
              [{ text: '확인' }],
            );
          } finally {
            setIsUnblocking(null);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchBlockList();
  }, []);

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
        {isLoading ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <ActivityIndicator color={colors.primary[5]} />
          </View>
        ) : blockList && blockList.length > 0 ? (
          blockList.map((item, index) => (
            <Profiles key={index}>
              <Image source={{ uri: item.profileUrl }} style={{ width: 24, height: 24, borderRadius: 100 }} />
              <Typography variant="body3" style={{ marginLeft: 10 }}>
                {item.nickname}
              </Typography>
              <ButtonView onPress={() => handleUnblock(item.id, item.nickname)} disabled={isUnblocking === item.id}>
                {isUnblocking === item.id ? (
                  <ActivityIndicator size="small" color={colors.primary[5]} />
                ) : (
                  <Typography variant="body3" style={{ color: colors.primary }}>
                    차단 해제
                  </Typography>
                )}
              </ButtonView>
            </Profiles>
          ))
        ) : (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <Typography variant="body3" style={{ color: colors.gray[8] }}>
              차단된 계정이 없습니다.
            </Typography>
          </View>
        )}
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
