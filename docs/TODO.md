# JOIN 프로젝트 TODO

> 업데이트: 2025년 1월 10일
>
> 상세 API 연동 현황은 `API_STATUS.md` 참고

## 📋 목차
- [백엔드 작업 필요](#백엔드-작업-필요)
- [프론트엔드 작업](#프론트엔드-작업)
- [참고 자료](#참고-자료)

---

## 🔧 백엔드 작업 필요

### 1. 알림 API 경로 수정 🟡
**파일**: `NotificationReadController.java`
**문제**: `api.prefix` 미적용 (`/notifications` vs `/api/v1/notifications`)
**영향**: 프론트엔드에서 예외 처리 중 (`apis/service/notifications.ts`)

### 2. 차단 해제 API 확인 🔴
**파일**: `BlockController.java`
**문제**: `DELETE /api/v1/blocks/{???}` - 파라미터 타입 확인 필요
- blockId인지 avatarToken인지?
**영향**: 500 에러 발생 중 (`apis/service/blocks.ts`, `app/(tabs)/(my)/myinfo/block-manage.tsx`)

### 3. 공지 조회 API 구현 🔴
**현재**: POST만 존재 (등록만 가능)
**필요**: `GET /api/v1/study/{studyToken}/notice` - 공지 조회
**사용처**:
- `components/organisms/MyPage/Manage.tsx` - StudyAnnouncement
- `app/(tabs)/(my)/manage/[token]/notice.tsx`

---

## 💻 프론트엔드 작업

### 🔴 긴급 (1순위)

#### 1. 스터디원 상세 정보 연동
**API**: `GET /api/v1/avatars/{avatarToken}`
**위치**: `app/(tabs)/(my)/manage/[token]/member/[id]/index.tsx`
**현재**: 하드코딩 (닉네임, 출석률, 인증률)
**작업**:
```typescript
// 1. apis/@types/user.ts에 타입 추가
interface AvatarDetailResponse {
  avatarToken: string;
  nickname: string;
  profileUrl: string;
  attendanceRate: number;
  proofRate: number;
}

// 2. apis/service/user.ts에 함수 추가
const getAvatarDetail = async (avatarToken: string) => {...}

// 3. hooks/useAvatar.ts 생성
export const useAvatarDetail = (avatarToken: string) => {...}

// 4. 컴포넌트 연동
```

#### 2. 스터디 멤버 목록 연동
**API**: `GET /api/v1/study/{studyToken}/enrollments/members`
**위치**: 
- `components/organisms/MyPage/Manage.tsx` - StudyEvaluation
- 평가 대상자 선택 화면
**현재**: Mock 데이터 5명 하드코딩
**작업**:
```typescript
// 1. apis/@types/study-enrollments.ts에 타입 추가
interface StudyMember {
  avatarToken: string;
  nickname: string;
  profileUrl: string;
  isLeader: boolean;
}

// 2. apis/service/study-enrollments.ts에 함수 추가
const getStudyMembers = async (studyToken: string) => {...}

// 3. hooks/useStudyEnrollments.ts 생성
export const useStudyMembers = (studyToken: string) => {...}

// 4. StudyEvaluation 컴포넌트 연동
```

#### 3. 차단 해제 기능 수정
**API**: `DELETE /api/v1/blocks/{blockId}` (백엔드 확인 후)
**위치**: `app/(tabs)/(my)/myinfo/block-manage.tsx`
**문제**: 500 에러 발생 중
**작업**:
1. 백엔드 팀에 파라미터 타입 확인 (blockId vs avatarToken)
2. `apis/service/blocks.ts`의 `deleteBlock` 함수 수정
3. 에러 처리 개선

### 🟡 중요 (2순위)

#### 4. 스터디원 참여 상세 정보
**API**: `GET /api/v1/study/{studyToken}/enrollments/{targetToken}`
**위치**: 멤버 상세 페이지
**작업**:
- apis/@types/study-enrollments.ts에 타입 추가
- apis/service/study-enrollments.ts에 함수 추가
- hooks 생성 및 컴포넌트 연동

#### 5. 리더 권한 위임
**API**: `PATCH /api/v1/study/{studyToken}/enrollments/delegate`
**위치**: 미구현 (스터디 관리 페이지)
**작업**:
- UI 디자인 및 구현
- API 연동
- 권한 확인 로직

#### 6. 강제 퇴출
**API**: `PATCH /api/v1/study/{studyToken}/enrollments/forced-out`
**위치**: 미구현 (멤버 관리 페이지)
**작업**:
- UI 디자인 및 구현
- 확인 모달 추가
- API 연동

#### 7. 미인증자 일괄 처리
**API**: `POST /api/v1/study/{studyToken}/proofs/uncertified`
**위치**: 미구현 (인증 관리 페이지)
**작업**:
- 미인증자 목록 UI
- 일괄 처리 버튼
- API 연동

#### 8. 탈퇴 관리 UI
**API**: 이미 구현됨 (`apis/service/withdraw.ts`)
**위치**: 미구현 (스터디 관리 페이지)
**작업**:
- 탈퇴 신청 목록 UI
- 승인/반려 기능
- 기존 API 활용

### 🟢 보통 (3순위)

#### 9. 스터디 규칙 관리
**API**:
- `GET /api/v1/study/{studyToken}/rules`
- `PUT /api/v1/study/{studyToken}/rules`
**위치**: 미구현 (스터디 설정)
**작업**:
- 규칙 조회/수정 페이지 생성
- 규칙 폼 컴포넌트
- API 연동

#### 10. 프로필 사진 업로드
**API**: `POST /api/v1/avatars/photos`
**위치**: 미구현 (프로필 수정)
**작업**:
- 이미지 피커 추가
- 이미지 압축 (expo-image-manipulator)
- multipart/form-data 업로드

#### 11. 선호 카테고리 수정
**API**: `PUT /api/v1/avatars/preference`
**위치**: 미구현 (관심사 설정)
**작업**:
- 카테고리 선택 UI
- API 연동

#### 12. 배치 작업 UI
**API**: 이미 구현됨 (`apis/service/batch-job.ts`)
**위치**: 미구현 (자동화 설정)
**작업**:
- 배치 작업 목록 UI
- 생성/수정/삭제 기능
- 스케줄 설정 UI

### 🔵 낮음 (4순위)

#### 13. Push 알림 설정
**API**: `PUT /api/v1/push`
**위치**: 미구현 (알림 설정)

#### 14. 회원 탈퇴
**API**:
- `GET /api/v1/user-withdrawal/check`
- `POST /api/v1/user-withdrawal`
**위치**: 미구현

#### 15. 검색 기능
**API**: `GET /api/v1/search`
**위치**: 미구현

#### 16. 검색 기록
**API**: `GET /api/v1/search-history`
**위치**: 미구현

#### 17. 인증 주제 관리
**API**: `GET /api/v1/study/{studyToken}/proofs/subjects`
**위치**: 미구현

#### 18. 일반 공지사항
**API**: `GET /api/v1/notices`
**위치**: 미구현

---

## 📝 참고 자료

### API 문서
- **Swagger**: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/
- **상세 연동 현황**: `docs/API_STATUS.md`

### 주요 파일 위치

#### 인증/출석
- `app/(tabs)/(certified)/index.tsx` (340 라인)
- `components/molecules/AttendanceModal/index.tsx`
- `components/molecules/ProofModal/index.tsx`

#### API 서비스
- `apis/service/` - 각 도메인별 서비스 함수
- `apis/@types/` - 타입 정의

#### Hooks
- `hooks/useAttendance.ts`
- `hooks/useProof.ts`
- `hooks/useMeetings.ts`
- `hooks/useMyPage.ts`

#### Context
- `context/NotificationContext.tsx` - 알림 전역 상태
- `context/GlobalContext.tsx` - 전역 상태

#### Utils
- `utils/imageUpload.ts` - 이미지 업로드
- `utils/dateFormatter.ts` - 날짜 포맷

### 컴포넌트 구조

#### 인증 페이지
```typescript
CertifiedScreen
  └─ ScrollView
      └─ StudyCard[] (map)
          ├─ useCurrentMeeting
          ├─ useNextMeeting
          ├─ useAttendance
          ├─ useProof
          ├─ AttendanceModal (독립)
          └─ ProofModal (독립)
```

#### 알림 시스템
```typescript
App (_layout.tsx)
  └─ NotificationProvider
      ├─ unreadCount (전역 상태)
      └─ refreshUnreadCount (갱신 함수)
          ├─ GNB (3개 탭 배지)
          └─ 4개 레이아웃 (종 아이콘)
```

---

## 📊 진행 상황

### 전체 통계
- **총 백엔드 API**: 약 80개
- **연동 완료**: 약 50개 (62%)
- **미연동**: 약 30개 (38%)

### 우선순위별
- 🔴 긴급 (1순위): 3개
- 🟡 중요 (2순위): 5개
- 🟢 보통 (3순위): 6개
- 🔵 낮음 (4순위): 6개

### 최근 완료 (2025-01-10)
✅ 알림 시스템 구축 (Context, 배지, 종 아이콘)
✅ 알림 API 연동 (GET /notifications)
✅ 인증 페이지 개선 (모든 스터디 표시)
✅ StudyCard 컴포넌트 분리
✅ ManageView 하단 여백 해결

---

## 🎯 다음 스프린트 권장

### Week 1 (긴급)
1. 🔴 차단 해제 API 수정 (백엔드 확인 필요)
2. 🔴 스터디원 상세 정보 연동
3. 🔴 스터디 멤버 목록 연동

### Week 2 (중요)
4. 🟡 스터디원 참여 상세 정보
5. 🟡 리더 권한 위임 UI
6. 🟡 강제 퇴출 UI
7. 🟡 탈퇴 관리 UI

### Week 3-4 (개선)
8. 🟢 스터디 규칙 관리
9. 🟢 프로필 사진 업로드
10. 🟢 배치 작업 UI
