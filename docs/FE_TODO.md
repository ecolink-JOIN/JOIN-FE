# 프론트엔드 미구현 작업 목록

> 업데이트: 2025년 1월 22일  
> 코드 근거 추가: 각 항목에 실제 코드 위치와 TODO 주석 내용 포함

---

## ✅ 완료된 작업

### 1. ~~스터디원 평가 - 멤버 목록~~ ✅ 완료
**파일**: `components/organisms/MyPage/Manage.tsx:529-580`  
**상태**: ✅ 완료 (2025-01-22)
- API와 Hook이 이미 구현되어 있었음
- TODO 주석 제거 완료
- 실제 API 연동 확인: `GET /study/{studyToken}/enrollments/members`
- 타입 정의: `StudyEnrollmentsResponse.GetMembers`
- Hook: `useStudyMembers(studyToken)`
- Service: `StudyEnrollmentsService().getStudyEnrollments()`

**완료 작업**:
- ✅ 불필요한 TODO 주석 제거
- ✅ JSDoc 형식 주석으로 변경
- ✅ 코드 동작 확인

---

### 2. ~~스터디원 평가 기능 구현~~ ✅ 완료
**파일**: `app/(tabs)/(my)/manage/[token]/evaluation.tsx`  
**상태**: ✅ 완료 (2025-01-22)
- 평가 기능이 이미 완전히 구현되어 있었음
- API: `POST /api/v1/evaluation`
- Hook: `useSubmitEvaluation()` (`hooks/useEvaluation.ts`)
- Service: `EvaluationService().submitEvaluation()`
- 평가 항목: 성실도, 프로그램 숙지도, 학습 분위기 영향 (각 1-5점)
- 스터디원 상세 정보 조회: `getMemberDetail(avatarToken)`

**완료 작업**:
- ✅ 구식 `MemberEvaluation` 컴포넌트 삭제
- ✅ 평가 페이지 정상 작동 확인
- ✅ 평가 제출 및 성공/실패 처리 완료
- ✅ 중복 평가 방지 로직 구현

---

### 3. ~~스터디원 상세 정보 조회~~ ✅ 완료
**파일**: `app/(tabs)/(my)/manage/[token]/member-detail.tsx`  
**상태**: ✅ 완료 (2025-01-22)
- API가 이미 완전히 연동되어 있었음
- API: `GET /api/v1/avatars/{avatarToken}`
- Hook: `useAvatarDetail(avatarToken)` (`hooks/useAvatar.ts`)
- Service: `UserService().getAvatarDetail()`
- 타입: `UserResponse.AvatarDetail`
- 표시 정보: 닉네임, 프로필 사진, 평균 출석률, 평균 인증률

**완료 작업**:
- ✅ 실시간 데이터 연동 확인
- ✅ 하드코딩 없음 확인
- ✅ API 정상 작동 확인

---

### 4. ~~스터디장/스터디원 평점 표시~~ ✅ 완료
**파일**: `components/organisms/StudyDetails/StudyOverviewSection/index.tsx`  
**상태**: ✅ 완료 (2025-01-22)
- 백엔드에 평점 API가 이미 구현되어 있었음
- API: `GET /api/v1/study/{studyToken}` → `evaluationScore` 포함
- 백엔드 DTO: `StudyDetailResponse.evaluationScore` (leaderScore, memberScore)
- 백엔드 파일: `StudyReadController.java`, `StudyDetailResponse.java`, `EvaluationScore.java`

**완료 작업**:
- ✅ 프론트엔드 타입 업데이트 (`apis/@types/study.ts`)
- ✅ `StudyResponse.Detail`에 `evaluationScore` 필드 추가
- ✅ 하드코딩된 `rating={0}` 제거
- ✅ 실제 데이터로 교체: `evaluationScore.leaderScore`, `evaluationScore.memberScore`
- ✅ TODO 주석 제거

---

## 🟡 단기 작업 (1-2주)

### 5. 알림 타입별 라우팅
**파일**: `app/(tabs)/(home)/alarm.tsx:84`  
**현재 상태**: TODO 주석만 있음  

**코드 근거**:
```tsx
const handleNotificationPress = (notification: NotificationResponse.Notification) => {
  // TODO: 알림 타입별 라우팅 처리
  console.log('알림 클릭:', notification);
};
```

**알림 타입**:
- `STUDY_ANNOUNCEMENT`: 스터디 공지
- `ATTENDANCE_CHECK`: 출석 체크
- `PROOF`: 인증
- `OTHER`: 기타 알림

**필요 작업**:
- 각 알림 타입별 적절한 화면으로 라우팅
- notification 객체에서 필요한 파라미터 추출
- router.push()로 화면 이동

**예상 시간**: 3시간

---

### 6. 스터디원 참여 상세 정보
**필요 API**: GET `/api/v1/study/{studyToken}/enrollments/{targetToken}`  
**필요 작업**:
- apis/@types/study-enrollments.ts 타입 추가
- apis/service/study-enrollments.ts 서비스 함수 추가
- hooks/useStudyEnrollments.ts 훅 생성

**예상 시간**: 3시간

---

### 7. 리더 권한 위임
**필요 API**: PATCH `/api/v1/study/{studyToken}/enrollments/delegate`  
**필요 작업**:
- 권한 위임 UI 구현
- 확인 모달 추가
- API 연동

**예상 시간**: 3시간

---

### 8. 강제 퇴출
**필요 API**: PATCH `/api/v1/study/{studyToken}/enrollments/forced-out`  
**필요 작업**:
- 퇴출 UI 구현
- 확인 모달 추가
- 퇴출 사유 입력

**예상 시간**: 3시간

---

### 9. 미인증자 일괄 처리
**필요 API**: POST `/api/v1/study/{studyToken}/proofs/uncertified`  
**필요 작업**:
- 미인증자 목록 UI
- 일괄 처리 버튼

**예상 시간**: 2시간

---

## 🟢 중기 작업 (1개월)

### 10. 안드로이드 로그인
**파일**: 
- `components/organisms/CTA/SignInCTA.tsx:12`
- `app/index.tsx:10`

**코드 근거**:
```tsx
// SignInCTA.tsx
const signIn = async (provider: (typeof providers)[number]) => {
  // TODO: 안드로이드 로그인 처리
  router.replace('/(tabs)');
  // const path: Href = `/(auth)/oauth?provider=${provider}`;
  // router.push(path);
};

// app/index.tsx
useEffect(() => {
  // TODO: 안드로이드용 토큰 저장
  TokenStorage.setToken('6f0a5645-c440-4cb5-8d5a-343e8fe7df06');
  // ...
}, [router]);
```

**현재 상태**: iOS만 작동, 안드로이드는 하드코딩 토큰 사용

**필요 작업**:
- 안드로이드 OAuth 플로우 구현
- 토큰 저장 로직 완성
- 하드코딩 토큰 제거

**예상 시간**: 4시간

---

### 11. FCM Push 알림
**파일**: `app/(tabs)/(my)/myinfo/app-setting.tsx:36`  

**코드 근거**:
```tsx
const handlePushToggle = async (value: boolean) => {
  // FCM 토큰은 실제 구현에서 가져와야 하지만, 일단 빈 문자열로 처리
  // TODO: FCM 토큰 가져오기 로직 추가
  await updatePushConsent({
    consent: value,
    fcmToken: '', // FCM 토큰 필요
  });
};
```

**현재 상태**: FCM 토큰이 빈 문자열로 전달됨

**필요 작업**:
- Firebase 프로젝트 설정
- FCM 토큰 발급 및 저장
- 푸시 알림 권한 요청 구현
- 토큰 갱신 로직

**예상 시간**: 4시간

---

### 12. 스터디 규칙 관리
**필요 API**:
- GET `/api/v1/study/{studyToken}/rules`
- PUT `/api/v1/study/{studyToken}/rules`

**필요 작업**:
- 규칙 조회/수정 페이지
- 규칙 폼 컴포넌트

**예상 시간**: 4시간

---

### 13. 프로필 사진 업로드
**필요 API**: POST `/api/v1/avatars/photos`  
**필요 작업**:
- 이미지 피커
- 이미지 압축
- multipart/form-data 업로드

**예상 시간**: 2시간

---

### 14. 선호 카테고리 수정
**필요 API**: PUT `/api/v1/avatars/preference`  
**필요 작업**:
- 카테고리 선택 UI

**예상 시간**: 2시간

---

### 15. 탈퇴 관리 UI
**현재 상태**: API 구현됨 (`apis/service/withdraw.ts`)  
**필요 작업**:
- 탈퇴 신청 목록 UI
- 승인/반려 기능

**예상 시간**: 4시간

---

## ⚪ 장기 작업 (2개월+)

### 16. 타이머 인증
**파일**: `app/(tabs)/(certified)/index.tsx:313`  
**현재 상태**: "출시 예정" 표시  
**필요 작업**:
- 타이머 UI 구현
- 타이머 로직
- API 설계 및 연동

**예상 시간**: 8시간

---

### 17. 배치 작업 UI
**현재 상태**: API 구현됨 (`apis/service/batch-job.ts`)  
**필요 작업**:
- 배치 작업 목록 UI
- 생성/수정/삭제 기능

**예상 시간**: 4시간

---

### 18. Push 알림 설정
**필요 API**: PUT `/api/v1/push`  
**필요 작업**:
- 알림 설정 UI

**예상 시간**: 2시간

---

### 19. 회원 탈퇴
**필요 API**:
- GET `/api/v1/user-withdrawal/check`
- POST `/api/v1/user-withdrawal`

**필요 작업**:
- 탈퇴 전 확인 페이지
- 탈퇴 사유 선택

**예상 시간**: 3시간

---

### 20. 검색 기능
**필요 API**: GET `/api/v1/search`  
**필요 작업**:
- 검색 UI
- 검색 결과 페이지
- 필터 기능

**예상 시간**: 6시간

---

### 21. 검색 기록
**필요 API**: GET `/api/v1/search-history`  
**필요 작업**:
- 검색 기록 UI
- 삭제 기능

**예상 시간**: 2시간

---

### 22. 인증 주제 관리
**필요 API**: GET `/api/v1/study/{studyToken}/proofs/subjects`  
**필요 작업**:
- 인증 주제 목록 UI
- 주제 추가/수정/삭제

**예상 시간**: 4시간

---

### 23. 일반 공지사항
**필요 API**: GET `/api/v1/notices`  
**필요 작업**:
- 공지사항 목록 페이지
- 공지사항 상세 페이지

**예상 시간**: 4시간

---

## 🔧 코드 정리

### 24. OAuth 로그인 성공 처리 완료
**파일**: `app/(auth)/oauth.tsx:55`  
**필요 작업**: TODO 주석 제거 또는 추가 처리 확인

---

### 25. S3 업로드 TODO 제거
**파일**: `app/(tabs)/(certified)/proof.tsx:45`  
**현재 상태**: 이미 구현됨 (`utils/imageUpload.ts`)  
**필요 작업**: TODO 주석 제거

---

### 26. 온보딩 컨텍스트 정리
**파일**: `context/OnboardingContext.tsx:4`  
**필요 작업**: API 응답 구조 확인 후 타입 정리

---

### 27. Slider 디자인 확정
**파일**: `components/molecules/Onboarding/WeeklyParticipationCountSelectPane.tsx:10`  
**필요 작업**: 디자인 확정 후 구현

---

### 28. 테스트 페이지 처리
**파일**: `components/organisms/GNB.tsx:34`  
**필요 작업**: 제거 또는 개발 모드 전용 처리

---

### 29. Badge Alert 테스트 코드
**파일**: `components/organisms/BadgeComponentList.tsx:13`  
**필요 작업**: 테스트 코드 제거 또는 실제 기능 구현

---

### 30. 시간 입력 주석 정리
**파일**: `app/(tabs)/(my)/manage/[token]/study-schedule.tsx:332`  
**필요 작업**: 주석 정리 또는 명확한 설명 추가

---

## 📊 우선순위 요약

### ✅ 완료 - 8시간
1. ~~스터디원 평가 멤버 목록~~ (1시간) - 2025-01-22 완료
2. ~~스터디원 평가 기능~~ (4시간) - 2025-01-22 완료
3. ~~스터디원 상세 정보~~ (3시간) - 2025-01-22 완료

### 🟡 단기 (1-2주) - 16시간
4. 알림 라우팅 (3시간)
5. 스터디장 평점 (2시간)
6. 참여 상세 정보 (3시간)
7. 권한 위임 (3시간)
8. 강제 퇴출 (3시간)
9. 미인증자 처리 (2시간)

### 🟢 중기 (1개월) - 16시간
10. 안드로이드 로그인 (4시간)
11. FCM Push (4시간)
12. 규칙 관리 (4시간)
13. 프로필 업로드 (2시간)
14. 선호 카테고리 (2시간)

### ⚪ 장기 (2개월+) - 33시간
16-23. 타이머 인증, 배치, Push, 탈퇴, 검색 등

**총 예상 시간**: 65시간 (완료 8시간 제외)
