# 프론트엔드 미구현 작업 목록

> 업데이트: 2025년 1월 22일

---

## 즉시 작업 필요

### 1. 스터디원 상세 정보 조회
**파일**: `app/(tabs)/(my)/manage/[token]/member/[id]/index.tsx`  
**현재 상태**: 닉네임, 출석률, 인증률 하드코딩  
**필요 작업**:
- GET `/api/v1/avatars/{avatarToken}` API 연동
- 실시간 출석률/인증률 표시
- 프로필 정보 동적 로드

**Response 타입**:
```typescript
{
  avatarToken: string;
  nickname: string;
  profileUrl: string;
  attendanceRate: number;
  proofRate: number;
}
```

---

### 2. 스터디 멤버 목록 조회
**파일**: `components/organisms/MyPage/Manage.tsx` - StudyEvaluation  
**현재 상태**: Mock 데이터 5명 하드코딩  
**필요 작업**:
- GET `/api/v1/study/{studyToken}/enrollments/members` API 연동
- 동적 멤버 목록 표시
- 리더 여부 표시

**Response 타입**:
```typescript
{
  members: [{
    avatarToken: string;
    nickname: string;
    profileUrl: string;
    isLeader: boolean;
  }]
}
```

---

### 3. 스터디원 평가 기능
**파일**: `components/organisms/MyPage/Manage.tsx` - MemberEvaluation  
**현재 상태**: Alert만 표시, API 미연동  
**필요 작업**:
- 평가 대상자 선택 UI 구현
- POST `/api/v1/evaluation` API 연동
- 평가 제출 후 처리

**구현 위치**: Lines 391-450

---

## 단기 작업 (1-2주)

### 4. 스터디원 참여 상세 정보
**필요 API**: GET `/api/v1/study/{studyToken}/enrollments/{targetToken}`  
**사용 위치**: 멤버 상세 페이지  
**필요 작업**:
- apis/@types/study-enrollments.ts 타입 추가
- apis/service/study-enrollments.ts 서비스 함수 추가
- hooks/useStudyEnrollments.ts 훅 생성
- UI 컴포넌트 연동

---

### 5. 리더 권한 위임 기능
**필요 API**: PATCH `/api/v1/study/{studyToken}/enrollments/delegate`  
**필요 작업**:
- 권한 위임 UI 디자인 및 구현
- 확인 모달 추가
- API 연동
- 권한 검증 로직

---

### 6. 강제 퇴출 기능
**필요 API**: PATCH `/api/v1/study/{studyToken}/enrollments/forced-out`  
**필요 작업**:
- 퇴출 UI 디자인 및 구현
- 확인 모달 추가
- API 연동
- 퇴출 사유 입력

---

### 7. 미인증자 일괄 처리
**필요 API**: POST `/api/v1/study/{studyToken}/proofs/uncertified`  
**필요 작업**:
- 미인증자 목록 UI
- 일괄 처리 버튼
- API 연동

---

## 중기 작업 (1개월)

### 8. 스터디 규칙 관리
**필요 API**:
- GET `/api/v1/study/{studyToken}/rules`
- PUT `/api/v1/study/{studyToken}/rules`

**필요 작업**:
- 규칙 조회/수정 페이지 생성
- 규칙 폼 컴포넌트
- API 연동

---

### 9. 프로필 사진 업로드
**필요 API**: POST `/api/v1/avatars/photos` (multipart/form-data)  
**필요 작업**:
- 이미지 피커 추가
- 이미지 압축 (expo-image-manipulator)
- multipart/form-data 업로드

---

### 10. 선호 카테고리 수정
**필요 API**: PUT `/api/v1/avatars/preference`  
**필요 작업**:
- 카테고리 선택 UI
- API 연동

---

### 11. 탈퇴 관리 UI
**현재 상태**: API는 구현됨 (`apis/service/withdraw.ts`)  
**필요 작업**:
- 탈퇴 신청 목록 UI
- 승인/반려 기능
- 기존 API 활용

---

## 장기 작업 (2개월+)

### 12. 배치 작업 UI
**현재 상태**: API는 구현됨 (`apis/service/batch-job.ts`)  
**필요 작업**:
- 배치 작업 목록 UI
- 생성/수정/삭제 기능
- 스케줄 설정 UI

---

### 13. Push 알림 설정
**필요 API**: PUT `/api/v1/push`  
**필요 작업**:
- 알림 설정 UI
- FCM 토큰 관리
- API 연동

**참고**: `app/(tabs)/(my)/myinfo/app-setting.tsx` Line 36

---

### 14. 회원 탈퇴
**필요 API**:
- GET `/api/v1/user-withdrawal/check`
- POST `/api/v1/user-withdrawal`

**필요 작업**:
- 탈퇴 전 확인 페이지
- 탈퇴 사유 선택
- API 연동

---

### 15. 검색 기능
**필요 API**: GET `/api/v1/search`  
**필요 작업**:
- 검색 UI 구현
- 검색 결과 페이지
- 필터 기능

---

### 16. 검색 기록
**필요 API**: GET `/api/v1/search-history`  
**필요 작업**:
- 검색 기록 UI
- 삭제 기능
- API 연동

---

### 17. 인증 주제 관리
**필요 API**: GET `/api/v1/study/{studyToken}/proofs/subjects`  
**필요 작업**:
- 인증 주제 목록 UI
- 주제 추가/수정/삭제
- API 연동

---

### 18. 일반 공지사항
**필요 API**: GET `/api/v1/notices`  
**필요 작업**:
- 공지사항 목록 페이지
- 공지사항 상세 페이지
- API 연동

---

## 개선 작업

### 19. 알림 타입별 라우팅
**파일**: `app/(tabs)/(home)/alarm.tsx` Line 84  
**필요 작업**:
- 알림 타입에 따른 화면 이동
- 딥링크 처리

---

### 20. 스터디장/스터디원 평점 표시
**파일**: `components/organisms/StudyDetails/StudyOverviewSection/index.tsx`  
**필요 작업**:
- Lines 42, 44 - 평점 API 연동
- 평점 UI 표시

---

### 21. 안드로이드 토큰 저장
**파일**: `app/index.tsx` Line 10  
**필요 작업**:
- 안드로이드용 토큰 저장 로직

---

### 22. 안드로이드 로그인 처리
**파일**: `components/organisms/CTA/SignInCTA.tsx` Line 12  
**필요 작업**:
- 안드로이드 OAuth 처리

---

## 작업 우선순위

| 우선순위 | 작업 | 예상 시간 |
|---------|------|----------|
| P1 | 스터디원 상세 정보 조회 | 3시간 |
| P1 | 스터디 멤버 목록 조회 | 2시간 |
| P1 | 스터디원 평가 기능 | 4시간 |
| P2 | 스터디원 참여 상세 정보 | 3시간 |
| P2 | 리더 권한 위임 | 3시간 |
| P2 | 강제 퇴출 | 3시간 |
| P2 | 미인증자 일괄 처리 | 2시간 |
| P3 | 스터디 규칙 관리 | 4시간 |
| P3 | 프로필 사진 업로드 | 2시간 |
| P3 | 탈퇴 관리 UI | 4시간 |

**총 예상 시간**: 약 30시간
