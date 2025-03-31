import { View } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ManageBox, ManageView } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import Button from '@/components/atoms/Button';
import { ScrollView } from 'react-native-gesture-handler';
import CustomModal from '@/components/atoms/CustomModal';
import { ApplicationsService } from '@/apis';
import Toast from 'react-native-toast-message';

const RecruitingMemb = () => {
  const { member } = useLocalSearchParams();
  const getmember = JSON.parse(member as string) as ApplicationsResponse.GetApplicationsResult;
  const [confirmModal, setConfirmModal] = React.useState(false);
  const [rejectModal, setRejectModal] = React.useState(false);

  return (
    <ScrollView>
      <ManageView>
        <Typography variant="heading3">스터디 신청자 확인</Typography>
        <ManageBox>
          <View style={{ padding: 20, alignItems: 'center' }}>
            {/* <Image
            source={{ uri: getmember.profileImageUrl }}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          /> */}
            <View style={{ height: 10 }} />
            <Typography variant="heading4" style={{ color: colors.black }}>
              {getmember.nickname}
            </Typography>
            <View style={{ height: 28 }} />
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography variant="button" style={{ color: colors.gray[11] }}>
                현재 참여 중인 스터디
              </Typography>
              <Typography variant="body3" style={{ color: colors.gray[11], marginLeft: 'auto' }}>
                개수
              </Typography>
              <Typography variant="body3" style={{ color: colors.primary, marginLeft: 4 }}>
                1
              </Typography>
            </View>
            <View style={{ height: 16 }} />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: colors.sub2,
                paddingVertical: 16,
                borderRadius: 16,
                paddingHorizontal: 20,
              }}
            >
              <View style={{ alignItems: 'center', gap: 6 }}>
                <Typography variant="body3" style={{ color: colors.primary }}>
                  평균 출석률
                </Typography>
                <Typography variant="heading4" style={{ color: colors.blue[7] }}>
                  {getmember.activeStudyStats.attendanceRate} %
                </Typography>
              </View>
              <View style={{ alignItems: 'center', gap: 6 }}>
                <Typography variant="body3" style={{ color: colors.primary }}>
                  평균 인증률
                </Typography>
                <Typography variant="heading4" style={{ color: colors.blue[7] }}>
                  {getmember.activeStudyStats.proofRate} %
                </Typography>
              </View>
            </View>
            <View style={{ height: 32 }} />

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography variant="button" style={{ color: colors.gray[11] }}>
                과거 참여했던 스터디
              </Typography>
              <Typography variant="body3" style={{ color: colors.gray[11], marginLeft: 'auto' }}>
                개수
              </Typography>
              <Typography variant="body3" style={{ color: colors.primary, marginLeft: 4 }}>
                1
              </Typography>
            </View>
            <View style={{ height: 16 }} />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: colors.gray[2],
                paddingVertical: 16,
                borderRadius: 16,
                paddingHorizontal: 20,
              }}
            >
              <View style={{ alignItems: 'center', gap: 6 }}>
                <Typography variant="body3" style={{ color: colors.black }}>
                  평균 출석률
                </Typography>
                <Typography variant="heading4" style={{ color: colors.black }}>
                  {getmember.completedStudyStats.attendanceRate} %
                </Typography>
              </View>
              <View style={{ alignItems: 'center', gap: 6 }}>
                <Typography variant="body3" style={{ color: colors.black }}>
                  평균 인증률
                </Typography>
                <Typography variant="heading4" style={{ color: colors.black }}>
                  {getmember.completedStudyStats.proofRate} %
                </Typography>
              </View>
              <View style={{ alignItems: 'center', gap: 6 }}>
                <Typography variant="body3" style={{ color: colors.black }}>
                  평점
                </Typography>
                <Typography variant="heading4" style={{ color: colors.black }}>
                  {getmember.completedStudyStats.rating}
                </Typography>
              </View>
            </View>
          </View>
        </ManageBox>
        <ManageBox title="스터디 지원 이유">
          <View
            style={{
              paddingVertical: 16,
              paddingHorizontal: 12,
              backgroundColor: colors.gray[2],
              borderRadius: 16,
              margin: 16,
              borderColor: colors.gray[3],
              borderWidth: 1,
            }}
          >
            <Typography variant="body3" style={{ color: colors.black }}>
              {getmember.introduction}
            </Typography>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, margin: 8 }}>
            <Button
              variant="contained"
              size="large"
              onPress={() => {
                setConfirmModal(true);
              }}
            >
              승인하기
            </Button>
            <View style={{ width: 8 }} />
            <Button variant="outlined" size="large" onPress={() => {}}>
              거절하기
            </Button>
          </View>
        </ManageBox>
      </ManageView>
      <CustomModal
        modalVisible={confirmModal}
        setModalVisible={setConfirmModal}
        children={
          <View style={{ padding: 30, alignItems: 'center' }}>
            <Typography variant="subtitle1" style={{ color: colors.black, textAlign: 'center' }}>
              {getmember.nickname}님의{'\n'}스터디 가입을 승인합니다.
            </Typography>
            <View style={{ height: 16 }} />
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onPress={() => {
                  setConfirmModal(false);
                }}
              >
                취소
              </Button>
              <View style={{ width: 10 }} />
              <Button
                variant="contained"
                onPress={() => {
                  ApplicationsService()
                    .accept(getmember.applicationId)
                    .then(() => {
                      Toast.show({
                        type: 'success',
                        text1: '스터디 가입 승인 완료',
                      });
                      setConfirmModal(false);
                      router.back();
                    });
                }}
              >
                확인
              </Button>
            </View>
          </View>
        }
      />
    </ScrollView>
  );
};

export default RecruitingMemb;
