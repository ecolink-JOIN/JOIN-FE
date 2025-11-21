import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ManageBoxView, ManageView } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import { colors } from '@/theme';
import { usePostAttendance } from '@/hooks/useAttendance';
import { getCurrentISOString } from '@/utils/dateFormatter';

function AttendanceScreen() {
  const { studyToken, meetingNo } = useLocalSearchParams<{ studyToken: string; meetingNo: string }>();

  const postAttendance = usePostAttendance();

  const handleAttendance = () => {
    if (!studyToken || !meetingNo) {
      Alert.alert('오류', '스터디 정보가 없습니다.');
      return;
    }

    const now = getCurrentISOString();

    postAttendance.mutate(
      {
        studyToken,
        meetingNo: parseInt(meetingNo),
        now,
      },
      {
        onSuccess: () => {
          Alert.alert('출석 완료', '출석이 정상적으로 등록되었습니다.', [
            { text: '확인', onPress: () => router.back() },
          ]);
        },
        onError: (error: any) => {
          Alert.alert('출석 실패', error.response?.data?.message || '출석 등록에 실패했습니다.');
        },
      },
    );
  };

  return (
    <ManageView>
      <ScrollView contentContainerStyle={styles.container}>
        <ManageBoxView style={styles.box}>
          <View style={styles.content}>
            <Typography variant="subtitle1" style={styles.title}>
              출석하기
            </Typography>

            <Typography variant="body2" style={styles.description}>
              출석 버튼을 눌러 출석 체크를 진행합니다.
            </Typography>

            <Typography variant="body4" style={styles.notice}>
              • 출석 버튼 클릭 시 즉시 출석 처리됩니다.{'\n'}• 시간 내에 출석하지 않으면 지각 또는 결석 처리될 수
              있습니다.
            </Typography>

            <Button
              variant="contained"
              onPress={handleAttendance}
              disabled={postAttendance.isPending}
              style={styles.button}
            >
              {postAttendance.isPending ? '처리 중...' : '출석하기'}
            </Button>

            <Button
              variant="outlined"
              onPress={() => router.back()}
              disabled={postAttendance.isPending}
              style={styles.button}
            >
              취소
            </Button>
          </View>
        </ManageBoxView>
      </ScrollView>
    </ManageView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  box: {
    padding: 20,
  },
  content: {
    gap: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    color: colors.gray[7],
  },
  notice: {
    color: colors.gray[6],
    lineHeight: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default AttendanceScreen;
