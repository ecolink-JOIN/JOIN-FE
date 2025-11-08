# 🎯 남은 작업 리스트

> 최종 업데이트: 2025년 11월 9일

## ✅ 완료된 핵심 작업
- ✅ 출석/인증 모달 구현
- ✅ 출석 상태 조회 API 연동 (엔드포인트 오타 수정)
- ✅ 인증 상태 조회 API 연동
- ✅ 실시간 상태 표시 기능
- ✅ 백엔드 API 명세 분석 완료

---

## 🔴 긴급 작업 (1-2일 내)

### 1. 이미지 업로드 API 연동
**우선순위:** 🔴 HIGH  
**예상 시간:** 2-3시간  
**담당:** Frontend Developer

#### 작업 내용
```typescript
// utils/imageUpload.ts
export const uploadProofImage = async (image: ImagePickerResult): Promise<string> => {
  const formData = new FormData();
  formData.append('file', {
    uri: image.uri,
    type: 'image/jpeg',
    name: image.name,
  } as any);

  const response = await API.post('/proof/files', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  
  return response.data.url;
};
```

#### 연동 위치
- `app/(tabs)/(certified)/index.tsx`의 `handleProofConfirm` 함수
- `components/molecules/ProofModal/index.tsx`

#### 테스트 항목
- [ ] 갤러리에서 이미지 선택 → 업로드 → URL 반환
- [ ] 카메라로 사진 촬영 → 업로드 → URL 반환
- [ ] 업로드 실패 시 에러 처리
- [ ] 로딩 상태 표시

---

## 🟡 중요 작업 (1주일 내)

### 2. 이미지 압축 기능 구현
**우선순위:** 🟡 MEDIUM  
**예상 시간:** 1-2시간  
**담당:** Frontend Developer

#### 패키지 설치
```bash
npx expo install expo-image-manipulator
```

#### 구현 코드
```typescript
import * as ImageManipulator from 'expo-image-manipulator';

export const compressImage = async (uri: string, quality: number = 0.7): Promise<string> => {
  const manipulatedImage = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 1024 } }],
    { compress: quality, format: ImageManipulator.SaveFormat.JPEG }
  );
  return manipulatedImage.uri;
};
```

#### 효과
- 업로드 속도 향상
- 서버 트래픽 감소 (약 60-80%)
- 모바일 데이터 절약

---

### 3. 스터디 선택 기능 구현
**우선순위:** 🟡 MEDIUM  
**예상 시간:** 3-4시간  
**담당:** Frontend Developer

#### 현재 문제
```typescript
// 하드코딩: 첫 번째 스터디만 자동 선택
const currentStudy = studiesData?.joinStudyInfos?.[0];
```

#### 구현 방안
1. **드롭다운 UI 추가**
   - 참여 중인 스터디 목록 표시
   - React Native Picker 또는 커스텀 드롭다운

2. **선택 상태 저장**
   ```typescript
   import AsyncStorage from '@react-native-async-storage/async-storage';
   
   const saveSelectedStudy = async (studyToken: string) => {
     await AsyncStorage.setItem('selectedStudyToken', studyToken);
   };
   ```

3. **앱 재실행 시 복원**
   ```typescript
   useEffect(() => {
     AsyncStorage.getItem('selectedStudyToken').then(setSelectedStudyToken);
   }, []);
   ```

#### 테스트 항목
- [ ] 드롭다운에서 스터디 선택
- [ ] 선택한 스터디의 회차 정보 표시
- [ ] 앱 재시작 후 마지막 선택 복원
- [ ] 스터디 없을 때 빈 상태 처리

---

### 4. 평가하기 페이지 제작
**우선순위:** 🟡 MEDIUM  
**예상 시간:** 4-5시간  
**담당:** Frontend Developer

#### 페이지 생성
```
경로: app/(tabs)/(my)/manage/[token]/evaluation.tsx
파라미터: token (studyToken), avartarToken
```

#### UI 구성
1. 평가 대상자 정보 (이름, 프로필)
2. 별점 입력 (1-5점)
3. 코멘트 입력 (선택, 최대 500자)
4. 제출 버튼

#### API 연동
```typescript
POST /api/v1/evaluation
{
  "targetAvatarToken": "avt_xxx",
  "rating": 5,
  "comment": "열심히 참여해주셨습니다."
}
```

#### 테스트 항목
- [ ] 평가 대상자 정보 표시
- [ ] 별점 입력 동작
- [ ] 평가 제출 성공
- [ ] 중복 평가 방지
- [ ] 제출 후 이전 페이지로 이동

---

### 5. 관리자 기능 UI 연동
**우선순위:** 🟡 MEDIUM  
**예상 시간:** 2-3시간  
**담당:** Frontend Developer

#### 위치
`app/(tabs)/(my)/manage/[token]/member-detail.tsx`

#### 연동 항목

**1. 출석 상태 변경**
```typescript
import { useUpdateAttendance } from '@/hooks/useAttendance';

const updateAttendance = useUpdateAttendance();

const handleAttendanceUpdate = () => {
  updateAttendance.mutate({
    studyToken,
    meetingNo,
    attendanceId,
    data: {
      targetAvatarToken: avartarToken,
      status: 'PRESENT' | 'LATENESS' | 'ABSENT',
    },
  });
};
```

**2. 인증 승인**
```typescript
import { useApproveProof } from '@/hooks/useProof';

const approveProof = useApproveProof();

const handleApprove = () => {
  approveProof.mutate({
    studyToken,
    meetingNo,
    proofId,
  });
};
```

**3. 인증 반려**
```typescript
import { useRejectProof } from '@/hooks/useProof';

const rejectProof = useRejectProof();

const handleReject = (reason: string) => {
  rejectProof.mutate({
    studyToken,
    meetingNo,
    proofId,
    data: { rejectedReason: reason },
  });
};
```

#### 테스트 항목
- [ ] 출석 상태 변경 (출석/지각/결석)
- [ ] 인증 승인 버튼 동작
- [ ] 인증 반려 (사유 입력 모달)
- [ ] 변경 후 목록 새로고침

---

## 🟢 선택 작업 (2주일 내)

### 6. 에러 처리 개선
**우선순위:** 🟢 LOW  
**예상 시간:** 3-4시간

#### 개선 항목

**1. 네트워크 오류 재시도**
```typescript
// React Query 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
```

**2. 오프라인 감지**
```bash
npx expo install @react-native-community/netinfo
```

```typescript
import NetInfo from '@react-native-community/netinfo';

const [isOffline, setIsOffline] = useState(false);

useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    setIsOffline(!state.isConnected);
  });
  return () => unsubscribe();
}, []);
```

**3. 에러 바운더리**
```typescript
// components/ErrorBoundary.tsx
class ErrorBoundary extends React.Component {
  // 에러 발생 시 fallback UI 표시
}
```

---

### 7. 코드 정리 및 리팩토링
**우선순위:** 🟢 LOW  
**예상 시간:** 5-6시간

#### 작업 항목

**1. 컴포넌트 분리**
```
app/(tabs)/(certified)/index.tsx (300+ 줄)
→ components/certified/AttendanceSection.tsx
→ components/certified/ProofSection.tsx
```

**2. 공통 유틸 함수 정리**
```typescript
// utils/dateFormatter.ts에 통합
export const formatCurrentDateTime = () => { ... }
export const formatMeetingDate = () => { ... }
export const formatISOString = () => { ... }
```

**3. TypeScript 타입 정리**
- `any` 타입 제거
- 엄격한 타입 체크 활성화
- Interface 일관성 확보

**4. 미사용 파일 삭제**
- `app/(tabs)/(certified)/proof.tsx` (모달로 대체됨)
- 미사용 이미지 파일
- 미사용 import 문

---

## 📊 작업 우선순위 요약

### 이번 주 (필수)
1. 🔴 이미지 업로드 API 연동 (2-3시간)

### 다음 주
2. 🟡 이미지 압축 기능 (1-2시간)
3. 🟡 스터디 선택 기능 (3-4시간)
4. 🟡 평가 페이지 제작 (4-5시간)
5. 🟡 관리자 기능 연동 (2-3시간)

### 2주 후
6. 🟢 에러 처리 개선 (3-4시간)
7. 🟢 코드 리팩토링 (5-6시간)

**총 예상 시간:** 약 20-27시간

---

## 🎯 스프린트 계획

### Sprint 1 (1주차)
**목표:** 이미지 업로드 기능 완성
- Day 1-2: 이미지 업로드 API 연동
- Day 3: 이미지 압축 기능 추가
- Day 4-5: 테스트 및 버그 수정

### Sprint 2 (2주차)
**목표:** 사용자 편의성 개선
- Day 1-2: 스터디 선택 기능
- Day 3-4: 평가 페이지 제작
- Day 5: 관리자 기능 UI 연동

### Sprint 3 (3주차)
**목표:** 안정화 및 최적화
- Day 1-2: 에러 처리 개선
- Day 3-4: 코드 리팩토링
- Day 5: QA 및 최종 테스트

---

## 📝 체크리스트

### 이미지 업로드 API 연동
- [ ] uploadProofImage 함수 구현
- [ ] handleProofConfirm에 연동
- [ ] 로딩 상태 추가
- [ ] 에러 처리 추가
- [ ] 성공/실패 알림 추가

### 이미지 압축
- [ ] expo-image-manipulator 설치
- [ ] compressImage 함수 구현
- [ ] 업로드 전 압축 적용
- [ ] 압축 품질 테스트

### 스터디 선택
- [ ] 드롭다운 UI 구현
- [ ] AsyncStorage 연동
- [ ] 선택 상태 저장/복원
- [ ] 빈 상태 처리

### 평가 페이지
- [ ] evaluation.tsx 페이지 생성
- [ ] UI 구현 (별점, 코멘트)
- [ ] API 연동
- [ ] 유효성 검사

### 관리자 기능
- [ ] 출석 상태 변경 연동
- [ ] 인증 승인 연동
- [ ] 인증 반려 연동 (사유 입력)
- [ ] 목록 새로고침

### 에러 처리
- [ ] React Query retry 설정
- [ ] NetInfo 설치 및 연동
- [ ] 오프라인 상태 UI
- [ ] 재시도 버튼 추가

### 코드 정리
- [ ] 컴포넌트 분리
- [ ] 유틸 함수 정리
- [ ] TypeScript 타입 정리
- [ ] 미사용 파일 삭제

---

## 🚀 빠른 시작

### 1. 이미지 업로드 API 연동부터 시작
```bash
# 1. utils/imageUpload.ts 수정
# 2. app/(tabs)/(certified)/index.tsx 수정
# 3. 테스트
```

### 2. 나머지 작업은 우선순위에 따라 진행
```
🔴 HIGH → 🟡 MEDIUM → 🟢 LOW
```

---

**문의:** Frontend Team  
**마지막 업데이트:** 2025년 11월 9일
