import Typography from '@/components/atoms/Typography';
import ContentView from '@/components/atoms/View/ContentView';

function NickNameGuide() {
  return (
    <ContentView>
      <Typography variant="body4">닉네임 (2-7자리 한글 및 영문)</Typography>
      <Typography variant="body1">닉네임은 추후에 변경할 수 없어요.{'\n'}신중하게 닉네임을 설정해주세요.</Typography>
    </ContentView>
  );
}

export default NickNameGuide;
