# 출석/인증 화면 설계 문서

## 📋 목차
1. [현재 상태 분석](#현재-상태-분석)
2. [아키텍처 설계](#아키텍처-설계)
3. [타입 정의](#타입-정의)
4. [API 서비스](#api-서비스)
5. [React Query Hooks](#react-query-hooks)
6. [유틸리티 함수](#유틸리티-함수)
7. [화면 구조](#화면-구조)
8. [다음 단계](#다음-단계)

---

## 🔍 현재 상태 분석

### ✅ 잘 구성된 부분
- **UI 스켈레톤**: `app/(tabs)/(certified)/index.tsx`에 기본 레이아웃 완성
- **디자인 시스템**: Button, Typography, ManageView 컴포넌트 준비
- **이미지 피커**: `expo-image-picker@~16.0.6` 설치됨
- **상태 관리**: React Query 사용 중

### ⚠️ 개선된 부분
1. **API 경로 수정**: `/attendances` (복수형) 로 통일
2. **타입 정의 보완**: 상태, 응답 타입 추가
3. **Hooks 생성**: useAttendance, useProof, useMeetings
4. **유틸리티 추가**: 이미지 업로드, 날짜 포맷

---

## 🏗️ 아키텍처 설계

```
📁 출석/인증 기능 구조
├── 📂 app/(tabs)/(certified)/
│   ├── index.tsx                    # 스터디 목록 + 현재 회차 표시
│   └── [studyToken]/
│       ├── _layout.tsx             # 공통 레이아웃
│       ├── index.tsx               # 회차 선택 화면
│       └── [meetingNo]/
│           ├── attendance.tsx      # 출석 화면
│           └── proof.tsx           # 인증 화면
│
├── 📂 apis/
│   ├── @types/
│   │   ├── attendance.ts           # ✅ 수정됨
│   │   ├── proof.ts                # ✅ 수정됨
│   │   └── meetings.ts             # ✅ 수정됨
│   └── service/
│       ├── attendance.ts           # ✅ 수정됨 (URL 경로)
│       ├── proof.ts                # ✅ 수정됨 (메서드 추가)
│       └── meetings.ts             # 기존 유지
│
├── 📂 hooks/
│   ├── useAttendance.ts            # ✅ 생성됨
│   ├── useProof.ts                 # ✅ 생성됨
│   └── useMeetings.ts              # ✅ 생성됨
│
└── 📂 utils/
    ├── imageUpload.ts              # ✅ 생성됨
    └── dateFormatter.ts            # ✅ 생성됨
```

---

## 📦 타입 정의

### Attendance Types (`apis/@types/attendance.ts`)

```typescript
// 출석 조회 응답
interface GetAttendance {
  hasAttendance: boolean;
  attendanceTime: string | null;
}

// 출석 등록 요청
interface PostAttendance {
  now: string; // ISO 8601: "2024-01-01T12:00:00"
}

// 출석 수정 요청 (관리자)
interface UpdateAttendance {
  targetAvatarToken: string;
  status: 'PRESENT' | 'LATENESS' | 'ABSENT';
}
```

### Proof Types (`apis/@types/proof.ts`)

```typescript
// 인증 타입
type ProofType = 'PHOTO' | 'TIMER';

// 인증 상태
type ProofStatus = 
  | 'PENDING'      // 승인 대기
  | 'APPROVED'     // 승인 완료
  | 'REJECTED'     // 반려
  | 'NOT_SUBMITTED'; // 미제출

// 인증 등록 요청
interface PostProof {
  proofType: ProofType;
  proofPhotoUrl: string; // Base64 or S3 URL
  provenDate: string; // ISO 8601
}
```

### Meeting Types (`apis/@types/meetings.ts`)

```typescript
// 회차 상태
type MeetingStatus =
  | 'WAITING'      // 대기
  | 'ACTIVE'       // 진행중
  | 'COMPLETED'    // 완료
  | 'NOT_STARTED'; // 시작 안 함

interface Meeting {
  id: number;
  meetingNo: number;
  studyDate: string; // "2024-01-01"
  stTime: string;    // "20:00"
  endTime: string;   // "22:00"
  status: MeetingStatus;
}
```

---

## 🔌 API 서비스

### Attendance Service

```typescript
// 출석 조회
AttendanceService().getAttendance(studyToken, meetingNo)

// 출석 등록
AttendanceService().postAttendance(studyToken, meetingNo, { now })

// 출석 수정 (관리자)
AttendanceService().updateAttendance(studyToken, meetingNo, attendanceId, data)
```

### Proof Service

```typescript
// 인증 조회
ProofService().getProof(studyToken, meetingNo)

// 인증 목록 조회 (관리자)
ProofService().getProofList(studyToken, meetingNo)

// 인증 등록
ProofService().postProof(studyToken, meetingNo, body)

// 인증 승인 (관리자)
ProofService().approveProof(studyToken, meetingNo, proofId)

// 인증 반려 (관리자)
ProofService().rejectProof(studyToken, meetingNo, proofId)
```

---

## 🪝 React Query Hooks

### useAttendance

```typescript
// 출석 조회
const { data, isLoading } = useAttendance(studyToken, meetingNo);

// 출석 등록
const { mutate: checkAttendance } = usePostAttendance();
checkAttendance({ studyToken, meetingNo, now: getCurrentISOString() });
```

### useProof

```typescript
// 인증 조회
const { data } = useProof(studyToken, meetingNo);

// 인증 등록
const { mutate: submitProof } = usePostProof();
submitProof({
  studyToken,
  meetingNo,
  proofType: 'PHOTO',
  proofPhotoUrl: base64Url,
  provenDate: getCurrentISOString()
});
```

### useMeetings

```typescript
// 회차 목록 조회
const { data: meetings } = useMeetings(studyToken);

// 현재 진행중인 회차
const { currentMeeting } = useCurrentMeeting(studyToken);

// 다음 예정 회차
const { nextMeeting } = useNextMeeting(studyToken);
```

---

## 🛠️ 유틸리티 함수

### 이미지 업로드 (`utils/imageUpload.ts`)

```typescript
// 앨범에서 선택
const image = await pickImage();

// 카메라 촬영
const photo = await takePhoto();

// 선택 다이얼로그
const option = await showImagePickerOptions();
if (option === 'camera') {
  const photo = await takePhoto();
} else if (option === 'gallery') {
  const image = await pickImage();
}

// S3 업로드 (TODO)
const url = await uploadToS3(image);
```

### 날짜 포맷 (`utils/dateFormatter.ts`)

```typescript
// 현재 시간 ISO 형식
const now = getCurrentISOString(); // "2024-01-01T12:00:00"

// 날짜 포맷
formatDateOnly(date);       // "2024-01-01"
formatTimeOnly(date);       // "12:00"
formatDateTime(date);       // "2024.01.01 12:00"
formatDateTimeShort(date);  // "01/01(월) 12:00"

// 상대 시간
getRelativeTime(date);      // "5분 전", "1시간 전"

// 시간 범위 체크
isWithinTimeRange(now, startTime, endTime);
```

---

## 📱 화면 구조

### 1단계: 현재 화면 개선 (`index.tsx`)

**목표**: 하드코딩된 데이터를 실제 API 데이터로 교체

```tsx
// Before (현재)
function TypographyScreen() {
  return (
    <ManageView>
      <ScrollView>
        <ManageBoxView>
          <Typography>토익 990점 스터디 🔥</Typography>
          {/* 하드코딩된 데이터 */}
        </ManageBoxView>
      </ScrollView>
    </ManageView>
  );
}

// After (개선)
function CertifiedScreen() {
  const { data: joinedStudies } = useMyJoinedStudies();
  const activeStudy = joinedStudies?.find(s => s.status === 'ACTIVE');
  const { currentMeeting } = useCurrentMeeting(activeStudy?.studyToken);
  const { data: attendance } = useAttendance(
    activeStudy?.studyToken, 
    currentMeeting?.meetingNo
  );
  const { data: proof } = useProof(
    activeStudy?.studyToken, 
    currentMeeting?.meetingNo
  );

  return (
    <ManageView>
      <ScrollView>
        {activeStudy && (
          <StudyCard
            study={activeStudy}
            meeting={currentMeeting}
            attendance={attendance}
            proof={proof}
          />
        )}
      </ScrollView>
    </ManageView>
  );
}
```

### 2단계: 출석 화면 생성

**경로**: `app/(tabs)/(certified)/[studyToken]/[meetingNo]/attendance.tsx`

**주요 기능**:
- 출석 가능 시간 체크
- GPS 위치 확인 (오프라인 스터디)
- 출석 버튼 클릭 → API 호출
- 출석 완료 상태 표시

### 3단계: 인증 화면 생성

**경로**: `app/(tabs)/(certified)/[studyToken]/[meetingNo]/proof.tsx`

**주요 기능**:
- 인증 타입 선택 (사진/타이머)
- 이미지 업로드
- 인증 제출
- 승인 대기 상태 표시

---

## 🎯 다음 단계

### Phase 1: 기본 기능 구현 (1-2일)
1. ✅ 타입 정의 완료
2. ✅ API 서비스 수정 완료
3. ✅ Hooks 생성 완료
4. ✅ 유틸리티 생성 완료
5. 🔄 현재 화면 데이터 연동 (다음)
6. 🔄 출석 화면 구현 (다음)
7. 🔄 인증 화면 구현 (다음)

### Phase 2: 관리자 기능 (1일)
8. 출석 수정 화면
9. 인증 승인/반려 화면

### Phase 3: 고도화 (1일)
10. 오프라인 모드 (로컬 저장)
11. 푸시 알림 연동
12. 에러 처리 강화

---

## 📝 코드 샘플

### 출석 버튼 구현 예시

```tsx
import { usePostAttendance } from '@/hooks/useAttendance';
import { getCurrentISOString } from '@/utils/dateFormatter';

const AttendanceButton = ({ studyToken, meetingNo }) => {
  const { mutate, isPending } = usePostAttendance();

  const handleAttendance = () => {
    mutate({
      studyToken,
      meetingNo,
      now: getCurrentISOString()
    });
  };

  return (
    <Button 
      variant="contained" 
      onPress={handleAttendance}
      disabled={isPending}
    >
      {isPending ? '출석중...' : '출석하기'}
    </Button>
  );
};
```

### 인증 사진 업로드 예시

```tsx
import { usePostProof } from '@/hooks/useProof';
import { showImagePickerOptions, takePhoto, pickImage, uploadToS3 } from '@/utils/imageUpload';
import { getCurrentISOString } from '@/utils/dateFormatter';

const ProofPhotoButton = ({ studyToken, meetingNo }) => {
  const { mutate, isPending } = usePostProof();

  const handleProof = async () => {
    const option = await showImagePickerOptions();
    if (!option) return;

    const image = option === 'camera' 
      ? await takePhoto() 
      : await pickImage();
    
    if (!image) return;

    const photoUrl = await uploadToS3(image);

    mutate({
      studyToken,
      meetingNo,
      proofType: 'PHOTO',
      proofPhotoUrl: photoUrl,
      provenDate: getCurrentISOString()
    });
  };

  return (
    <Button 
      variant="outlined" 
      onPress={handleProof}
      disabled={isPending}
    >
      {isPending ? '인증중...' : '인증하기'}
    </Button>
  );
};
```

---

## ✅ 완료된 작업 체크리스트

- [x] Attendance 타입 정의 수정
- [x] Proof 타입 정의 수정  
- [x] Meeting 타입 정의 수정
- [x] Attendance Service URL 수정
- [x] Proof Service 메서드 추가
- [x] useAttendance Hook 생성
- [x] useProof Hook 생성
- [x] useMeetings Hook 생성
- [x] 이미지 업로드 유틸 생성
- [x] 날짜 포맷 유틸 생성

## 🚀 다음 작업 예정

- [ ] 현재 화면 데이터 연동
- [ ] 출석 화면 UI 구현
- [ ] 인증 화면 UI 구현
- [ ] 관리자 화면 구현
- [ ] 통합 테스트

---

**작성일**: 2025년 1월 8일  
**버전**: 1.0.0  
**작성자**: AI Assistant
