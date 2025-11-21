# JOIN 출석/인증 기능 기술 명세서

> 작성일: 2025년 1월 9일  
> 버전: 1.0.0

## 📋 목차
1. [개요](#개요)
2. [아키텍처](#아키텍처)
3. [API 명세](#api-명세)
4. [컴포넌트 구조](#컴포넌트-구조)
5. [데이터 플로우](#데이터-플로우)
6. [상태 관리](#상태-관리)

---

## 1. 개요

### 1.1 기능 설명
JOIN 앱의 출석/인증 기능은 스터디 회차별로 출석을 체크하고 활동을 인증하는 핵심 기능입니다.

### 1.2 주요 기능
- ✅ 출석하기 (출석 체크)
- ✅ 사진 인증 (활동 인증)
- ✅ 출석 상태 조회
- ✅ 인증 상태 조회
- 🔄 관리자 승인/반려 (UI 완료, 연동 대기)

### 1.3 기술 스택
- **Frontend**: React Native (Expo)
- **State Management**: React Query (TanStack Query)
- **UI**: styled-components, React Native Modal
- **Image**: expo-image-picker
- **Backend API**: REST API

---

## 2. 아키텍처

### 2.1 폴더 구조
```
JOIN-FE/
├── app/(tabs)/(certified)/
│   └── index.tsx                    # 메인 출석/인증 화면
├── components/molecules/
│   ├── AttendanceModal/             # 출석 확인 모달
│   │   └── index.tsx
│   └── ProofModal/                  # 사진 인증 모달
│       └── index.tsx
├── hooks/
│   ├── useAttendance.ts             # 출석 관련 Hook
│   ├── useProof.ts                  # 인증 관련 Hook
│   ├── useMeetings.ts               # 회차 관련 Hook
│   └── useMyPage.ts                 # 내 스터디 Hook
├── apis/
│   ├── service/
│   │   ├── attendance.ts            # 출석 API
│   │   ├── proof.ts                 # 인증 API
│   │   └── meetings.ts              # 회차 API
│   └── @types/
│       ├── attendance.ts            # 출석 타입 정의
│       ├── proof.ts                 # 인증 타입 정의
│       └── meetings.ts              # 회차 타입 정의
└── utils/
    ├── imageUpload.ts               # 이미지 처리 유틸
    └── dateFormatter.ts             # 날짜 포맷팅 유틸
```

### 2.2 레이어 구조
```
┌─────────────────────────────────┐
│   Presentation Layer            │  ← 화면 (index.tsx, Modals)
│   (React Components)            │
└─────────────────────────────────┘
           ↕
┌─────────────────────────────────┐
│   Business Logic Layer          │  ← Hooks (useAttendance, useProof)
│   (Custom Hooks)                │
└─────────────────────────────────┘
           ↕
┌─────────────────────────────────┐
│   Data Access Layer             │  ← API Services
│   (API Services)                │
└─────────────────────────────────┘
           ↕
┌─────────────────────────────────┐
│   Backend API                   │  ← REST API
└─────────────────────────────────┘
```

---

## 3. API 명세

### 3.1 출석 API

#### 3.1.1 출석 상태 조회
```http
GET /study/{studyToken}/meetings/{meetingNo}/attendances
```

**응답 예시:**
```json
{
  "code": "SUCCESS",
  "message": "출석 상태 조회 성공",
  "data": {
    "hasAttendance": true,
    "attendanceTime": "2025-01-09T19:05:00"
  }
}
```

**프론트엔드 Hook:**
```typescript
const { data: attendanceData } = useAttendance(studyToken, meetingNo);
```

#### 3.1.2 출석 체크
```http
POST /study/{studyToken}/meetings/{meetingNo}/attendances
```

**요청 Body:**
```json
{
  "now": "2025-01-09T19:05:00"
}
```

**응답 예시:**
```json
{
  "code": "SUCCESS",
  "message": "출석이 완료되었습니다",
  "data": null
}
```

**프론트엔드 Hook:**
```typescript
const postAttendance = usePostAttendance();

postAttendance.mutate({
  studyToken: 'std_xxx',
  meetingNo: 1,
  now: '2025-01-09T19:05:00'
});
```

#### 3.1.3 출석 수정 (관리자)
```http
PATCH /study/{studyToken}/meetings/{meetingNo}/attendances/{attendanceId}
```

**요청 Body:**
```json
{
  "targetAvatarToken": "avt_xxx",
  "status": "PRESENT"  // PRESENT | LATENESS | ABSENT
}
```

---

### 3.2 인증 API

#### 3.2.1 인증 상태 조회
```http
GET /study/{studyToken}/meetings/{meetingNo}/proofs
```

**응답 예시:**
```json
{
  "code": "SUCCESS",
  "message": "인증 상태 조회 성공",
  "data": {
    "proofId": 123,
    "proofType": "PHOTO",
    "proofStatus": "APPROVED",
    "proofPhotoUrl": "https://s3.amazonaws.com/.../image.jpg",
    "provenTime": "2025-01-09T20:00:00",
    "rejectedReason": null
  }
}
```

**프론트엔드 Hook:**
```typescript
const { data: proofData } = useProof(studyToken, meetingNo);
```

#### 3.2.2 인증 제출
```http
POST /study/{studyToken}/meetings/{meetingNo}/proofs
```

**요청 Body:**
```json
{
  "proofType": "PHOTO",
  "proofPhotoUrl": "https://s3.amazonaws.com/.../image.jpg",
  "provenDate": "2025-01-09T20:00:00"
}
```

**응답 예시:**
```json
{
  "code": "SUCCESS",
  "message": "인증이 제출되었습니다",
  "data": {
    "proofId": 123
  }
}
```

**프론트엔드 Hook:**
```typescript
const postProof = usePostProof();

postProof.mutate({
  studyToken: 'std_xxx',
  meetingNo: 1,
  proofType: 'PHOTO',
  proofPhotoUrl: 's3-url',
  provenDate: '2025-01-09T20:00:00'
});
```

#### 3.2.3 인증 승인/반려 (관리자)
```http
PATCH /study/{studyToken}/meetings/{meetingNo}/proofs/{proofId}/approve
PATCH /study/{studyToken}/meetings/{meetingNo}/proofs/{proofId}/reject
```

---

### 3.3 회차 API

#### 3.3.1 회차 목록 조회
```http
GET /study/{studyToken}/meetings
```

**응답 예시:**
```json
{
  "code": "SUCCESS",
  "message": "회차 목록 조회 성공",
  "data": [
    {
      "id": 1,
      "meetingNo": 1,
      "studyDate": "2025-01-15",
      "stTime": "19:00",
      "endTime": "21:00",
      "status": "ACTIVE"
    }
  ]
}
```

**프론트엔드 Hook:**
```typescript
const { data: meetings } = useMeetings(studyToken);
const { currentMeeting } = useCurrentMeeting(studyToken);
const { nextMeeting } = useNextMeeting(studyToken);
```

---

## 4. 컴포넌트 구조

### 4.1 메인 화면 (index.tsx)

#### Props
없음 (Route 파라미터 없음)

#### State
```typescript
const [isAttendanceModalVisible, setIsAttendanceModalVisible] = useState(false);
const [isProofModalVisible, setIsProofModalVisible] = useState(false);
```

#### Hooks 사용
```typescript
// 스터디 정보
const { data: studiesData } = useMyJoinedStudies();

// 회차 정보
const { currentMeeting } = useCurrentMeeting(studyToken);
const { nextMeeting } = useNextMeeting(studyToken);

// 출석/인증 상태
const { data: attendanceData } = useAttendance(studyToken, meetingNo);
const { data: proofData } = useProof(studyToken, meetingNo);

// Mutations
const postAttendance = usePostAttendance();
const postProof = usePostProof();
```

#### 주요 함수
```typescript
// 출석 모달 열기
const handleAttendancePress = () => {
  setIsAttendanceModalVisible(true);
};

// 출석 처리
const handleAttendanceConfirm = () => {
  postAttendance.mutate({ studyToken, meetingNo, now: getCurrentISOString() });
};

// 인증 모달 열기
const handleProofPress = () => {
  setIsProofModalVisible(true);
};

// 인증 처리
const handleProofConfirm = (imageUri: string) => {
  postProof.mutate({
    studyToken,
    meetingNo,
    proofType: 'PHOTO',
    proofPhotoUrl: imageUri,
    provenDate: getCurrentISOString(),
  });
};
```

---

### 4.2 출석 모달 (AttendanceModal)

#### Props
```typescript
interface AttendanceModalProps {
  isVisible: boolean;        // 모달 표시 여부
  dateTime: string;          // 출석 시간 (예: "01/09(목) 20:01")
  onConfirm: () => void;     // 출석하기 버튼 핸들러
  onClose: () => void;       // 모달 닫기 핸들러
  isLoading?: boolean;       // 로딩 상태
}
```

#### 사용 예시
```typescript
<AttendanceModal
  isVisible={isAttendanceModalVisible}
  dateTime={formatCurrentDateTime()}
  onConfirm={handleAttendanceConfirm}
  onClose={() => setIsAttendanceModalVisible(false)}
  isLoading={postAttendance.isPending}
/>
```

#### 디자인
- 중앙 정렬 모달
- 320px 너비
- 흰색 배경, 16px border-radius
- 반투명 검은 배경 (rgba(0, 0, 0, 0.8))

---

### 4.3 인증 모달 (ProofModal)

#### Props
```typescript
interface ProofModalProps {
  isVisible: boolean;                    // 모달 표시 여부
  dateTime: string;                      // 인증 시간
  onConfirm: (imageUri: string) => void; // 인증하기 버튼 핸들러
  onClose: () => void;                   // 모달 닫기 핸들러
  isLoading?: boolean;                   // 로딩 상태
}
```

#### 내부 State
```typescript
const [selectedImage, setSelectedImage] = useState<string | null>(null);
```

#### 주요 기능
1. **이미지 선택/촬영**
   - `pickImage()` - 갤러리에서 선택
   - `takePhoto()` - 카메라로 촬영

2. **이미지 미리보기**
   - 200x200 정사각형 컨테이너
   - 선택 전: 회색 배경 + 흰색 + 아이콘
   - 선택 후: 이미지 표시 + X 버튼

3. **이미지 삭제**
   - X 버튼 클릭 시 선택 취소

---

## 5. 데이터 플로우

### 5.1 출석하기 플로우

```
[사용자] 
  ↓ 클릭: 출석하기 버튼
[handleAttendancePress]
  ↓ setIsAttendanceModalVisible(true)
[AttendanceModal 표시]
  ↓ 클릭: 출석하기 버튼
[handleAttendanceConfirm]
  ↓ postAttendance.mutate()
[usePostAttendance Hook]
  ↓ AttendanceService().postAttendance()
[API 호출]
  ↓ POST /study/.../attendances
[백엔드]
  ↓ 응답
[onSuccess]
  ↓ 모달 닫기 + 알림 표시
  ↓ queryClient.invalidateQueries(['attendance'])
[출석 상태 자동 갱신]
```

### 5.2 사진 인증 플로우

```
[사용자]
  ↓ 클릭: 인증하기 버튼
[handleProofPress]
  ↓ setIsProofModalVisible(true)
[ProofModal 표시]
  ↓ 클릭: 갤러리 or 카메라
[pickImage / takePhoto]
  ↓ 권한 요청
  ↓ 이미지 선택/촬영
[setSelectedImage]
  ↓ 이미지 미리보기 표시
  ↓ 클릭: 인증하기 버튼
[handleProofConfirm]
  ↓ postProof.mutate()
[usePostProof Hook]
  ↓ ProofService().postProof()
[API 호출]
  ↓ POST /study/.../proofs
[백엔드]
  ↓ 응답
[onSuccess]
  ↓ 모달 닫기 + 알림 표시
  ↓ queryClient.invalidateQueries(['proof'])
[인증 상태 자동 갱신]
```

### 5.3 이미지 업로드 플로우 (향후 구현)

```
[ProofModal]
  ↓ 이미지 선택 완료
[compressImage] (구현 예정)
  ↓ 이미지 압축
[uploadToS3] (구현 예정)
  ↓ FormData 생성
  ↓ POST /upload
[백엔드 업로드 API] (구현 필요)
  ↓ S3 업로드
  ↓ S3 URL 반환
[handleProofConfirm]
  ↓ S3 URL로 인증 제출
```

---

## 6. 상태 관리

### 6.1 React Query 사용

#### Query Keys 규칙
```typescript
// 스터디 목록
['myJoinedStudies']

// 회차 목록
['meetings', studyToken]

// 출석 상태
['attendance', studyToken, meetingNo]

// 인증 상태
['proof', studyToken, meetingNo]
```

#### Invalidation 전략
```typescript
// 출석 제출 후
queryClient.invalidateQueries(['attendance', studyToken, meetingNo]);

// 인증 제출 후
queryClient.invalidateQueries(['proof', studyToken, meetingNo]);
queryClient.invalidateQueries(['proofList', studyToken, meetingNo]);
```

### 6.2 로컬 State

#### Modal 상태
```typescript
const [isAttendanceModalVisible, setIsAttendanceModalVisible] = useState(false);
const [isProofModalVisible, setIsProofModalVisible] = useState(false);
```

#### 이미지 상태 (ProofModal 내부)
```typescript
const [selectedImage, setSelectedImage] = useState<string | null>(null);
```

---

## 7. 에러 처리

### 7.1 API 에러

#### 네트워크 에러
```typescript
onError: (error: any) => {
  Alert.alert(
    '출석 실패',
    error.response?.data?.message || '출석 등록에 실패했습니다.'
  );
}
```

#### 권한 에러
```typescript
// 이미지 선택 권한 없음
if (status !== 'granted') {
  Alert.alert('권한 필요', '사진 업로드를 위해 앨범 접근 권한이 필요합니다.');
  return false;
}
```

### 7.2 유효성 검사

#### studyToken / meetingNo 확인
```typescript
if (!studyToken || !meetingNo) {
  Alert.alert('오류', '스터디 정보가 없습니다.');
  return;
}
```

#### 이미지 선택 확인
```typescript
if (!selectedImage) {
  Alert.alert('오류', '인증 사진을 선택해주세요.');
  return;
}
```

---

## 8. 성능 최적화

### 8.1 React Query 캐싱
- staleTime: 5분 (기본값)
- cacheTime: 10분 (기본값)
- 자동 background refetch

### 8.2 이미지 최적화 (향후 구현)
```typescript
// expo-image-picker 설정
{
  allowsEditing: true,
  aspect: [4, 3],
  quality: 0.8,  // 80% 품질
}

// 추가 압축 (구현 예정)
compressImage(uri, 0.7);  // 70% 품질
```

### 8.3 불필요한 리렌더링 방지
```typescript
// useCallback 사용
const handleAttendancePress = useCallback(() => {
  setIsAttendanceModalVisible(true);
}, []);

// useMemo 사용
const displayMeeting = useMemo(
  () => currentMeeting || nextMeeting,
  [currentMeeting, nextMeeting]
);
```

---

## 9. 테스트 가이드

### 9.1 수동 테스트 시나리오

#### 출석하기 테스트
1. ✅ 출석하기 버튼 클릭
2. ✅ 모달 표시 확인
3. ✅ 현재 날짜/시간 표시 확인
4. ✅ "출석하기" 버튼 클릭
5. ✅ 로딩 상태 확인 ("처리 중..." 표시)
6. ✅ 성공 알림 확인
7. ✅ 모달 자동 닫힘 확인
8. ✅ 출석 상태가 "출석 완료"로 변경 확인

#### 사진 인증 테스트
1. ✅ 인증하기 버튼 클릭
2. ✅ 모달 표시 확인
3. ✅ 회색 정사각형 + 흰색 + 아이콘 확인
4. ✅ "갤러리" 버튼 클릭 → 권한 요청 → 이미지 선택
5. ✅ 선택한 이미지 미리보기 표시 확인
6. ✅ X 버튼 클릭 → 이미지 삭제 확인
7. ✅ "카메라" 버튼 클릭 → 권한 요청 → 사진 촬영
8. ✅ "인증하기" 버튼 클릭 (이미지 선택 전에는 비활성화)
9. ✅ 로딩 상태 확인
10. ✅ 성공 알림 확인
11. ✅ 인증 상태가 "승인 대기"로 변경 확인

### 9.2 엣지 케이스

#### studyToken이 없는 경우
- 버튼 비활성화 확인

#### 네트워크 오류
- 에러 메시지 표시 확인

#### 권한 거부
- 권한 요청 알림 표시 확인

---

## 10. 배포 체크리스트

### 백엔드 필수 항목
- [ ] Meetings API 데이터 반환 확인
- [ ] 이미지 업로드 API 구현
- [ ] S3 버킷 설정 완료
- [ ] API 권한 설정 확인

### 프론트엔드 필수 항목
- [x] 출석 모달 구현
- [x] 인증 모달 구현
- [x] 상태 조회 기능
- [ ] 이미지 압축 구현
- [ ] S3 업로드 연동
- [ ] 에러 처리 개선

### 테스트 항목
- [ ] 실제 스터디 데이터로 테스트
- [ ] 다양한 네트워크 상황 테스트
- [ ] iOS/Android 양쪽 테스트
- [ ] 권한 거부 시나리오 테스트

---

## 11. 참고 자료

### 외부 문서
- [Expo ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [React Query](https://tanstack.com/query/latest)
- [React Native Modal](https://reactnative.dev/docs/modal)

### 내부 문서
- [TODO.md](./TODO.md) - 할 일 목록
- [API 문서](http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/)
