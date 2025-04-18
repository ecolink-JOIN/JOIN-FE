import { ScrollView } from 'react-native';
import React from 'react';
import { Href, router, useLocalSearchParams } from 'expo-router';
import { ManageView, shadowStyles, ManageBoxView, ListComponent } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import { styled } from 'styled-components/native';
import Icon from '@/components/atoms/Icon';
import { useQuery } from '@tanstack/react-query';
import { StudyEnrollmentsService } from '@/apis/service/study-enrollments';

const Member = () => {
  const { token } = useLocalSearchParams<{ token: string }>();
  const { data } = useQuery({
    queryKey: ['study', token],
    queryFn: () => StudyEnrollmentsService().getStudyEnrollments(token),
  });

  return (
    <ScrollView>
      <ManageView>
        <Typography variant="heading3">스터디원 관리</Typography>
        <ManageBoxView style={[shadowStyles.shadow]}>
          <Typography
            variant="body3"
            style={{
              color: colors.gray[9],
              paddingHorizontal: 20,
              paddingVertical: 15,
            }}
          >
            스터디 출석 및 인증 현황
          </Typography>
          {data &&
            data.map((member, index) => {
              return (
                <ContentsWrapper
                  key={index}
                  onPress={() =>
                    router.push(`/manage/${token}/member-detail?avartarToken=${member.memberToken}` as Href)
                  }
                >
                  <ContentViewTop>
                    {/* <ProfileImage source={member} style={{ width: 28, height: 28, borderRadius: 100 }} /> */}
                    <Typography variant="body3">{member.nickname}</Typography>
                    <Icon name="arrow-right" stroke={colors.gray[7]} style={{ marginLeft: 'auto' }} />
                  </ContentViewTop>
                  <ContentViewBottom>
                    <Typography variant="body3" style={{ color: colors.gray[9] }}>
                      출석 {member.attendanceRate}%
                    </Typography>
                    <Typography variant="body3" style={{ color: colors.gray[9] }}>
                      인증 {member.proofRate}%
                    </Typography>
                    <Typography variant="body3" style={{ color: colors.gray[9] }}>
                      벌금 {member.totalFine.toLocaleString()}원
                    </Typography>
                  </ContentViewBottom>
                </ContentsWrapper>
              );
            })}
        </ManageBoxView>
        <ManageBox style={shadowStyles.shadow}>
          <ListComponent title="탈퇴 요청 승인" href={`/manage/${token}/withdrawal`} />
        </ManageBox>
      </ManageView>
    </ScrollView>
  );
};

export default Member;

const ContentsWrapper = styled.Pressable`
  border-top-width: 2px;
  border-top-color: ${colors.gray[2]};
  padding: 10px 20px;
  gap: 10px;
`;

const ContentViewTop = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  margin-right: 20px;
`;

const ContentViewBottom = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ManageBox = styled(ManageBoxView)`
  padding: 12px 20px;
`;
