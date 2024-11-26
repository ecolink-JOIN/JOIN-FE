import { ManageView, shadowStyles, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import React from 'react';
import Typography from '@/components/atoms/Typography';
import { styled } from 'styled-components/native';
import { colors } from '@/theme';

const Index = () => {
  return (
    <ManageView>
      <Typography variant="heading3">이용약관</Typography>
      <ManageBoxView style={shadowStyles.shadow}>
        <TermsView>
          <Typography variant="body3">제 1 장 총칙</Typography>
          <Typography variant="caption1" style={{ color: colors.gray[8] }}>
            제 1 조 (목적){'\n'}본 약관은 (주)제이피 이노베이션(이하 “회사”라 합니다)이 운영하는 웹사이트 ‘어반런드렛’
            (www.urbanlaunderette.com) (이하 “웹사이트”라 합니다)에서 제공하는 온라인 서비스(이하 “서비스”라 한다)를
            이용함에 있어 사이버몰과 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </Typography>
          <Typography variant="body3">제 2 조 (용어의 정의)</Typography>
          <Typography variant="caption1" style={{ color: colors.gray[8] }}>
            본 약관에서 사용하는 용어는 다음과 같이 정의한다. “웹사이트”란 회사가 재화 또는 용역을 이용자에게 제공하기
            위하여 컴퓨터 등 정보통신설비를 이용하여 재화 또는 용역을 거래 할 수 있도록 설정한 가상의 영업장을 말하며,
            아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다. “이용자”란 “웹사이트”에 접속하여 서비스를 이용하는
            회원 및 비회원을 말합니다. “회원”이라 함은 “웹사이트”에 개인정보를 제공하여 회원등록을 한 자로서,
            “웹사이트”의 정보를 지속적으로 제공받으며, “웹사이트”이 제공하는 서비스를 계속적으로 이용할 수 있는 자를
            말합니다. “비회원”이라 함은 회원에 가입하지 않고, “웹사이트”이 제공하는 서비스를 이용하는 자를 말합니다.
            “ID”라 함은 이용자가 회원가입당시 등록한 사용자 “개인이용문자”를 말합니다. “멤버십”이라 함은 회원등록을 한
            자로서, 별도의 온/오프라인 상에서 추가 서비스를 제공 받을 수 있는 회원을 말합니다. 내 등을 숙지하고 준수해야
            하며 기타 회사의 업무에 방해되는 행위를 해서는 안된다. 이용자는 회사의 사전 승인 없이 본 사이트를 이용해
            어떠한 영리행위도 할 수 없다. 이용자는 본 사이트를 통해 얻는 정보를 회사의 사전 승낙 없이 복사, 복제, 변경,
            번역, 출판, 방송 및 기타의 방법으로 사용하거나 이를 타인에게 제공할 수 없다.
          </Typography>
        </TermsView>
      </ManageBoxView>
    </ManageView>
  );
};

export default Index;

const TermsView = styled.View`
  padding: 20px;
  gap: 20px;
`;
