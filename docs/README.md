# JOIN 출석/인증 기능 가이드

> 프론트엔드 개발자를 위한 빠른 시작 가이드

## 🚀 빠른 시작

### 1. 개발 환경 설정
```bash
cd JOIN-FE
npm install
npx expo start
```

### 2. 주요 파일 위치
```
📁 app/(tabs)/(certified)/
  └── index.tsx              # 메인 화면 ⭐

📁 components/molecules/
  ├── AttendanceModal/       # 출석 모달 ⭐
  └── ProofModal/            # 인증 모달 ⭐

📁 hooks/
  ├── useAttendance.ts       # 출석 Hook
  ├── useProof.ts            # 인증 Hook
  └── useMeetings.ts         # 회차 Hook

📁 utils/
  └── imageUpload.ts         # 이미지 처리
```

---

## 📖 기능 설명

### ✅ 출석하기
1. 사용자가 "출석하기" 버튼 클릭
2. 모달이 열리며 현재 시간 표시
3. "출석하기" 확인 버튼 클릭
4. API 호출 → 성공 알림 → 모달 닫힘
5. 출석 상태가 "출석 완료"로 업데이트

### 📸 사진 인증
1. 사용자가 "인증하기" 버튼 클릭
2. 모달이 열림 (회색 정사각형 + 흰색 + 아이콘)
3. "갤러리" 또는 "카메라" 버튼으로 이미지 선택
4. 선택한 이미지 미리보기 표시
5. "인증하기" 버튼 클릭
6. API 호출 → 성공 알림 → 모달 닫힘
7. 인증 상태가 "승인 대기"로 업데이트

---

## 🛠️ 개발 가이드

### Hook 사용법

#### 1. 출석 상태 조회
```typescript
import { useAttendance } from '@/hooks/useAttendance';

const { data: attendanceData } = useAttendance(studyToken, meetingNo);

// attendanceData.hasAttendance: 출석 여부
// attendanceData.attendanceTime: 출석 시간
```

#### 2. 출석 체크
```typescript
import { usePostAttendance } from '@/hooks/useAttendance';

const postAttendance = usePostAttendance();

const handleAttendance = () => {
  postAttendance.mutate({
    studyToken: 'std_xxx',
    meetingNo: 1,
    now: getCurrentISOString(),
  });
};
```

#### 3. 인증 상태 조회
```typescript
import { useProof } from '@/hooks/useProof';

const { data: proofData } = useProof(studyToken, meetingNo);

// proofData.proofStatus: PENDING | APPROVED | REJECTED | NOT_SUBMITTED
// proofData.proofPhotoUrl: 인증 사진 URL
```

#### 4. 사진 인증 제출
```typescript
import { usePostProof } from '@/hooks/useProof';

const postProof = usePostProof();

const handleProof = (imageUri: string) => {
  postProof.mutate({
    studyToken: 'std_xxx',
    meetingNo: 1,
    proofType: 'PHOTO',
    proofPhotoUrl: imageUri,
    provenDate: getCurrentISOString(),
  });
};
```

---

### 컴포넌트 사용법

#### AttendanceModal
```typescript
import AttendanceModal from '@/components/molecules/AttendanceModal';

<AttendanceModal
  isVisible={isModalVisible}
  dateTime="01/09(목) 20:01"
  onConfirm={handleConfirm}
  onClose={() => setIsModalVisible(false)}
  isLoading={isSubmitting}
/>
```

#### ProofModal
```typescript
import ProofModal from '@/components/molecules/ProofModal';

<ProofModal
  isVisible={isModalVisible}
  dateTime="01/09(목) 20:01"
  onConfirm={(imageUri) => handleSubmit(imageUri)}
  onClose={() => setIsModalVisible(false)}
  isLoading={isSubmitting}
/>
```

---

### 이미지 처리

#### 갤러리에서 선택
```typescript
import { pickImage } from '@/utils/imageUpload';

const handlePickImage = async () => {
  const result = await pickImage();
  if (result) {
    console.log('선택된 이미지:', result.uri);
    // result.uri: 이미지 URI
    // result.base64: Base64 인코딩 (선택적)
    // result.name: 파일명
  }
};
```

#### 카메라로 촬영
```typescript
import { takePhoto } from '@/utils/imageUpload';

const handleTakePhoto = async () => {
  const result = await takePhoto();
  if (result) {
    console.log('촬영된 사진:', result.uri);
  }
};
```

---

## 🐛 문제 해결

### Q1. "출석하기" 버튼이 비활성화되어 있어요
**원인:** studyToken 또는 meetingNo가 없음

**해결:**
```typescript
// 디버그 로그 확인
console.log({ studyToken, meetingNo });

// studyToken이 없는 경우 → 스터디 가입 확인
// meetingNo가 없는 경우 → 회차가 생성되었는지 확인
```

### Q2. 이미지 선택 시 권한 오류가 발생해요
**원인:** 카메라/앨범 접근 권한 미허용

**해결:**
1. iOS: 설정 > JOIN > 사진 접근 허용
2. Android: 설정 > 앱 > JOIN > 권한 > 저장공간 허용

### Q3. API 호출이 실패해요
**원인:** 네트워크 오류 또는 백엔드 이슈

**해결:**
```typescript
// axios.ts에서 자동으로 로그 출력됨
// 1. 요청 로그 확인
log.debug({ method, url, data });

// 2. 응답 로그 확인
log.info({ status, data });

// 3. 에러 로그 확인
log.error({ response_data, status });
```

### Q4. 모달이 표시되지 않아요
**원인:** BottomSheetModalProvider 누락

**해결:**
`app/_layout.tsx`에 Provider 추가 확인:
```typescript
<BottomSheetModalProvider>
  <Stack>...</Stack>
</BottomSheetModalProvider>
```

---

## 📝 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 코드
chore: 빌드 설정
```

**예시:**
```bash
git commit -m "feat: 출석 모달 구현"
git commit -m "fix: 인증 API 호출 오류 수정"
git commit -m "docs: README 업데이트"
```

---

## 🔗 관련 문서

- [TODO.md](./TODO.md) - 할 일 목록 및 우선순위
- [TECH_SPEC.md](./TECH_SPEC.md) - 상세 기술 명세서
- [API 문서](http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/) - 백엔드 API

---

## 🎯 다음 단계

### 프론트엔드 개발자가 할 수 있는 작업
1. ✅ **이미지 압축 구현** (expo-image-manipulator)
2. ✅ **스터디 선택 기능** (드롭다운 UI)
3. ✅ **관리자 기능 UI 연동** (승인/반려)
4. ✅ **평가하기 페이지** (신규 페이지)
5. ✅ **에러 처리 개선** (재시도, 오프라인 감지)
6. ✅ **코드 리팩토링** (컴포넌트 분리)

### 백엔드 협업이 필요한 작업
1. ⏳ **이미지 업로드 API** (POST /upload)
2. ⏳ **Meetings API 이슈** (데이터 반환 안 됨)
3. ⏳ **평가 API** (평가 제출/조회)

---

## 💡 팁

### 개발 시 유용한 도구
```bash
# React Query Devtools (개발 모드)
npm run start

# TypeScript 타입 체크
npx tsc --noEmit

# ESLint 검사
npm run lint
```

### 디버깅
```typescript
// React Query 상태 확인
console.log('Query State:', {
  isLoading,
  isError,
  data,
  error,
});

// API 호출 추적
// apis/axios.ts에서 자동으로 로그 출력됨
```

---

## 📞 도움이 필요하면

- **프론트엔드 이슈**: TODO.md 참고
- **백엔드 이슈**: API 문서 확인 또는 백엔드 팀 문의
- **긴급 버그**: Slack #dev-frontend 채널

---

**마지막 업데이트:** 2025년 1월 9일  
**작성자:** Frontend Team
