import { ScrollView, View } from 'react-native';
import { ManageBox, ManageBoxView, ManageView, shadowStyles } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import Button from '@/components/atoms/Button';

function TypographyScreen() {
  return (
    <ManageView>
      <ScrollView>
        <ManageBoxView style={shadowStyles.shadow}>
          <View style={{ gap: 8, paddingTop: 30, alignItems: 'center', width: '100%' }}>
            <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
              토익 990점 스터디 🔥
            </Typography>
            <Typography variant="body3" style={{ color: colors.primary, textAlign: 'center' }}>
              2024.06.04 - 2024.10.31
            </Typography>
            <Typography variant="body4" style={{ textAlign: 'center' }}>
              화요일 20:00 - 22:00{'\n'}토요일 10:00 - 12:00
            </Typography>
            <View style={{ flexDirection: 'row', gap: 10, marginVertical: 18 }}>
              <Button variant="contained" style={{ width: 100 }}>
                출석하기
              </Button>
              <Button variant="outlined" style={{ width: 100 }}>
                인증하기
              </Button>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                paddingVertical: 14,
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography variant="button">출석</Typography>
              <Typography variant="button" style={{ color: colors.gray[8] }}>
                07/11(목) 20:01
              </Typography>
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 14,
                justifyContent: 'space-between',
                width: '100%',
                borderTopColor: colors.gray[2],
                borderTopWidth: 1.5,
                gap: 16,
              }}
            >
              <Typography variant="button">인증</Typography>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Typography variant="button" style={{ color: colors.gray[8] }}>
                  사진 인증
                </Typography>
                <Typography
                  variant="button"
                  style={{
                    color: colors.red[6],
                  }}
                >
                  인증 전
                </Typography>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                paddingVertical: 14,
                justifyContent: 'space-between',
                borderTopColor: colors.gray[2],
                borderTopWidth: 1.5,
                width: '100%',
              }}
            >
              <Typography variant="button" style={{ color: colors.gray[8] }}>
                타이머 인증
              </Typography>
              <Typography variant="button" style={{ color: colors.gray[6] }}>
                ( 출시 예정 )
              </Typography>
            </View>
          </View>
        </ManageBoxView>
      </ScrollView>
    </ManageView>
  );
}

export default TypographyScreen;
