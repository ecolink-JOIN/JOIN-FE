# JOIN 프로젝트 기술 명세서

> 업데이트: 2025년 1월 22일

---

## 프로젝트 개요

### 기본 정보
- **프로젝트명**: JOIN
- **설명**: 스터디 모집 및 관리 플랫폼
- **프론트엔드**: React Native (Expo)
- **백엔드**: Spring Boot
- **주요 기능**: 스터디 모집, 출석/인증 관리, 평가 시스템

---

## 기술 스택

### 프론트엔드
```
React Native (Expo SDK 51)
TypeScript
React Query (TanStack Query)
Styled Components
Expo Router
React Native UI Datepicker
React Native Calendars
React Native Toast Message
Zustand (상태 관리)
```

### 백엔드
```
Spring Boot 3.x
Java 17
JPA/Hibernate
MySQL
Swagger (API 문서)
JWT 인증
```

---

## 프로젝트 구조

### 디렉토리 구조
```
JOIN-FE/
├── app/                      # 화면 (Expo Router)
│   ├── (auth)/              # 인증 관련
│   ├── (tabs)/              # 탭 네비게이션
│   │   ├── (certified)/     # 출석/인증
│   │   ├── (home)/          # 홈/스터디 탐색
│   │   └── (my)/            # 마이페이지
│   ├── (form)/              # 폼 (스터디 생성 등)
│   └── (onboarding)/        # 온보딩
├── apis/                     # API 관련
│   ├── @types/              # 타입 정의
│   └── service/             # API 서비스 함수
├── components/               # 컴포넌트
│   ├── atoms/               # 기본 컴포넌트
│   ├── molecules/           # 조합 컴포넌트
│   ├── organisms/           # 복잡한 컴포넌트
│   └── templates/           # 레이아웃
├── hooks/                    # Custom Hooks
├── context/                  # React Context
├── recoil/                   # Recoil 상태 관리
├── theme/                    # 테마 설정
└── utils/                    # 유틸리티 함수
```

---

## 핵심 기능 명세

### 1. 인증 시스템

#### OAuth 로그인
- **지원 플랫폼**: 카카오, 애플
- **Flow**: OAuth → 토큰 저장 → 닉네임 설정 → 약관 동의 → 온보딩
- **파일**: `app/(auth)/oauth.tsx`

#### 토큰 관리
```typescript
// apis/axios.ts
export const TokenStorage = {
  async setToken(token: string): Promise<void>
  async getToken(): Promise<string | null>
  async clear(): Promise<void>
}
```

---

### 2. 스터디 탐색 및 검색

#### 스터디 목록 조회
- **인기 스터디**: GET `/api/v1/study/popular`
- **추천 스터디**: GET `/api/v1/study/recommendation`
- **검색**: GET `/api/v1/search` (미구현)

#### 스터디 상세 정보
- **엔드포인트**: GET `/api/v1/study/{studyToken}`
- **Response**:
```typescript
{
  studyToken: string;
  title: string;
  introduction: string;
  content: string;
  capacity: number;
  form: "ONLINE" | "OFFLINE";
  stDate: string;
  endDate: string;
  category: string;
  rules: Rule[];
  schedules: Schedule[];
}
```

---

### 3. 스터디 지원 및 모집

#### 지원하기
- **엔드포인트**: POST `/api/v1/applications`
- **Request**:
```typescript
{
  introduction: string;  // 지원 동기 (최소 10자)
  appDate: Date;
  studyToken: string;
}
```

#### 지원 관리 (리더)
- **승인**: PATCH `/api/v1/applications/{applicationId}/accept`
- **반려**: PATCH `/api/v1/applications/{applicationId}/reject`

---

### 4. 출석 및 인증 시스템

#### 출석 체크
**엔드포인트**: POST `/api/v1/study/{studyToken}/meetings/{meetingNo}/attendance`

**Request**:
```typescript
{
  attendedDate: Date;
}
```

**조건**:
- 회차 시작 10분 전부터 가능
- 시작 시간 이전: 출석
- 시작 시간 이후: 지각

**구현 파일**: `components/molecules/AttendanceModal/index.tsx`

---

#### 사진 인증
**엔드포인트**: POST `/api/v1/study/{studyToken}/meetings/{meetingNo}/proofs`

**Request**:
```typescript
{
  proofType: "PHOTO";
  proofPhotoUrl: string;  // S3 URL
  provenDate: Date;
}
```

**조건**:
- 회차 시작 시간 이후부터 자정 전까지 가능
- 이미지 업로드 → S3 URL 획득 → 인증 제출

**구현 파일**: `components/molecules/ProofModal/index.tsx`

---

#### 상태 조회
**출석 상태**: GET `/api/v1/study/{studyToken}/meetings/{meetingNo}/attendance`

**Response**:
```typescript
{
  hasAttendance: boolean;
  status: "PRESENT" | "LATENESS" | "ABSENT";
  attendedDate?: Date;
}
```

**인증 상태**: GET `/api/v1/study/{studyToken}/meetings/{meetingNo}/proofs`

**Response**:
```typescript
{
  proofStatus: "APPROVED" | "PENDING" | "REJECTED" | null;
  provenTime?: Date;
}
```

---

### 5. 회차 관리

#### 회차 조회
**엔드포인트**: GET `/api/v1/study/{studyToken}/meetings`

**Response**:
```typescript
{
  data: [{
    id: number;
    meetingNo: number;
    studyDate: string;  // YYYY-MM-DD
    stTime: string;     // HH:mm:ss
    endTime: string;
    status: "WAITING" | "ACTIVE" | "COMPLETED";
  }]
}
```

---

#### 회차 추가
**엔드포인트**: POST `/api/v1/study/{studyToken}/meetings`

**Request**:
```typescript
{
  studyDate: string;  // YYYY-MM-DD
  stTime: string;     // HH:mm
  endTime: string;
}
```

---

#### 회차 삭제
**엔드포인트**: DELETE `/api/v1/study/{studyToken}/meetings/{meetingId}`

---

### 6. 북마크 및 조회 기록

#### 북마크
- **추가**: POST `/api/v1/bookmarks`
- **삭제**: DELETE `/api/v1/bookmarks`
- **목록**: GET `/api/v1/bookmarks`

#### 최근 조회
- **목록**: GET `/api/v1/view-history`

---

### 7. 알림 시스템

#### 알림 조회
**엔드포인트**: GET `/notifications` (api.prefix 없음)

**Response**:
```typescript
{
  data: [{
    id: number;
    type: "APPLICATION" | "APPROVAL" | "MEETING" | "PROOF";
    title: string;
    content: string;
    isRead: boolean;
    createdAt: string;
    relatedId?: number;
  }]
}
```

#### 알림 읽음 처리
**엔드포인트**: POST `/api/v1/notifications`

**구현 파일**: `context/NotificationContext.tsx`

---

### 8. 마이페이지

#### 내 정보 조회
**엔드포인트**: GET `/api/v1/my-page`

**Response**:
```typescript
{
  nickname: string;
  profileUrl: string;
  averageAttendanceRate: number;
  averageProofRate: number;
  averageRating: number;
}
```

#### 스터디 목록
- **관리 중**: GET `/api/v1/my-page/manage-study`
- **참여 중**: GET `/api/v1/my-page/join-study`
- **관심**: GET `/api/v1/my-page/interest-study`

---

## 상태 관리 전략

### React Query 캐싱
```typescript
// 기본 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,  // 5분
      gcTime: 1000 * 60 * 10,     // 10분
    },
  },
});
```

### 주요 Query Keys
```typescript
['meetings', studyToken]           // 회차 목록
['attendance', studyToken, meetingNo]  // 출석 상태
['proof', studyToken, meetingNo]       // 인증 상태
['mypage']                          // 마이페이지 정보
['studies', 'manage']               // 관리 중인 스터디
['studies', 'join']                 // 참여 중인 스터디
['notifications']                   // 알림 목록
```

---

### Context 사용
```typescript
// GlobalContext - 전역 사용자 정보
interface GlobalContextType {
  userinfo: { nickname: string; profileImage: string };
  setUserinfo: (info: UserInfo) => void;
}

// NotificationContext - 알림 상태
interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  fetchNotifications: () => void;
  markAsRead: (id: number) => void;
}
```

---

## API 호출 규칙

### 인증 헤더
```typescript
// apis/axios.ts
API.interceptors.request.use(async (config) => {
  const token = await TokenStorage.getToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});
```

### 에러 처리
```typescript
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 처리
      TokenStorage.clear();
      router.replace('/(auth)');
    }
    return Promise.reject(error);
  }
);
```

---

## 컴포넌트 패턴

### Atomic Design
```
Atoms       → 기본 컴포넌트 (Button, Typography, Input)
Molecules   → 조합 컴포넌트 (AttendanceModal, ProofModal)
Organisms   → 복잡한 컴포넌트 (StudyCard, ManageView)
Templates   → 레이아웃 컴포넌트
```

### Custom Hooks
```typescript
// hooks/useAttendance.ts
export const useAttendance = (studyToken: string, meetingNo: number) => {
  return useQuery({
    queryKey: ['attendance', studyToken, meetingNo],
    queryFn: () => AttendanceService().getAttendance(studyToken, meetingNo),
  });
};

// hooks/useAttendanceMutation.ts
export const useAttendanceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ studyToken, meetingNo, data }) => 
      AttendanceService().postAttendance(studyToken, meetingNo, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
    },
  });
};
```

---

## 날짜/시간 처리

### Dayjs 사용
```typescript
import dayjs from 'dayjs';

// 날짜 포맷
const formattedDate = dayjs(date).format('YYYY-MM-DD');
const formattedTime = dayjs(date).format('HH:mm:ss');

// 날짜 비교
const isToday = dayjs(date).isSame(dayjs(), 'day');
const isBefore = dayjs(date).isBefore(dayjs());

// 시간대 주의: 로컬 시간 사용
// ❌ date.toISOString() - UTC 변환으로 하루 빠짐
// ✅ dayjs(date).format('YYYY-MM-DD') - 로컬 시간 유지
```

---

## 이미지 처리

### 이미지 선택
```typescript
import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  
  if (!result.canceled) {
    return result.assets[0].uri;
  }
};
```

### 이미지 압축 (권장)
```typescript
import * as ImageManipulator from 'expo-image-manipulator';

const compressImage = async (uri: string) => {
  const manipResult = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 1024 } }],
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
  );
  return manipResult.uri;
};
```

---

## 성능 최적화

### React Query 최적화
- **Stale Time**: 데이터가 신선한 시간 (5분)
- **GC Time**: 캐시 보관 시간 (10분)
- **Refetch On Focus**: 화면 포커스 시 자동 새로고침
- **Retry**: 실패 시 3회 재시도

### 이미지 최적화
- **압축**: 1024px 리사이즈, 70% 품질
- **포맷**: JPEG (용량 감소)
- **로딩**: React Native Fast Image 권장

---

## 테스트 가이드

### 수동 테스트 시나리오

#### 출석 체크
1. 회차 시작 10분 전에 출석 버튼 활성화 확인
2. 출석 체크 후 "출석 완료" 상태 확인
3. 시작 시간 이후 출석 시 "지각" 표시 확인

#### 사진 인증
1. 갤러리에서 이미지 선택
2. 이미지 압축 및 S3 업로드
3. 인증 제출 후 "승인 대기" 상태 확인

#### 회차 관리
1. 회차 추가 후 목록에 표시 확인
2. 회차 삭제 후 목록에서 제거 확인
3. 회차 번호 자동 재정렬 확인

---

## 배포

### 환경 변수
```
EXPO_PUBLIC_API_URL=http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/api/v1
EXPO_PUBLIC_KAKAO_APP_KEY=your_kakao_app_key
```

### 빌드 명령어
```bash
# 개발 빌드
npx expo start

# 프로덕션 빌드
eas build --platform android
eas build --platform ios
```

---

## 참고 자료

### API 문서
- Swagger: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/

### 주요 파일
- **인증**: `app/(auth)/oauth.tsx`
- **출석/인증**: `app/(tabs)/(certified)/index.tsx`
- **회차 관리**: `app/(tabs)/(my)/manage/[token]/round.tsx`
- **API 서비스**: `apis/service/`
- **타입 정의**: `apis/@types/`

### 외부 라이브러리
- [Expo Documentation](https://docs.expo.dev/)
- [React Query](https://tanstack.com/query/latest)
- [React Native Calendars](https://github.com/wix/react-native-calendars)
- [Styled Components](https://styled-components.com/)
