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

### 5. 알림 타입별 라우팅 ⚠️ 백엔드 작업 필요
**파일**: `app/(tabs)/(home)/alarm.tsx:84`  
**현재 상태**: 라우팅 구조 구현 완료, 백엔드 API 수정 대기

**코드 근거**:
```tsx
const handleNotificationPress = (notification: NotificationResponse.Notification) => {
  // FIXME: 백엔드 API 수정 필요 - studyToken 필드 누락
  Alert.alert('알림', '해당 기능은 백엔드 API 업데이트가 필요합니다.');
  
  /* 백엔드 API 수정 후 구현
  const studyToken = notification.studyToken; // ← 백엔드에서 추가 필요
  
  switch (notification.type) {
    case 'STUDY_ANNOUNCEMENT':
      router.push(`/(tabs)/(my)/manage/${studyToken}/notice`);
      break;
    case 'ATTENDANCE_CHECK':
      router.push(`/(tabs)/(my)/manage/${studyToken}/attendance`);
      break;
    case 'PROOF':
      router.push(`/(tabs)/(my)/manage/${studyToken}/proof`);
      break;
    case 'OTHER':
      router.push(`/study/${studyToken}`);
      break;
  }
  */
};
```

**백엔드 문제**:
- API: `GET /notifications`
- 응답: `NotificationResponse`에 `studyToken` 필드 없음
- 엔티티: `Notification.study` 필드는 존재하지만 응답에 미포함
- 파일: `NotificationResponse.java`, `NotificationTargetReaderImpl.java`

**알림 타입**:
- `STUDY_ANNOUNCEMENT`: 스터디 공지
- `ATTENDANCE_CHECK`: 출석 체크
- `PROOF`: 인증
- `OTHER`: 기타 알림

**완료 작업**:
- ✅ 백엔드 코드 분석 완료
- ✅ 라우팅 로직 구현 (주석 처리)
- ✅ Alert로 백엔드 작업 필요 안내
- ✅ BE_TODO.md에 #5 항목 추가

**대기 작업**:
- ⏳ 백엔드: `NotificationResponse`에 `studyToken` 추가
- ⏳ 프론트엔드: 주석 해제 및 테스트

**예상 시간**: 1시간 (백엔드 작업) + 0.5시간 (프론트 주석 해제)

**비고**: 백엔드 작업 필요 - `docs/BE_TODO.md #5` 참고

---

### 6. ~~스터디원 참여 상세 정보~~ ✅ 완료
**API**: GET `/api/v1/study/{studyToken}/enrollments/{targetToken}`  
**상태**: ✅ 완료 (2025-01-22)
- API가 이미 완전히 구현되어 있었음
- 백엔드 API: `GET /study/{studyToken}/enrollments/{targetToken}`
- 백엔드 파일: `EnrollmentReaderController.java`, `ProofAndAttendanceStatusResponse.java`
- 프론트엔드 타입: `StudyEnrollmentsResponse.GetMemberAttendance`
- 서비스: `StudyEnrollmentsService().getMemberAttendance()`
- 사용 화면: `app/(tabs)/(my)/manage/[token]/member-detail.tsx`

**완료 작업**:
- ✅ 백엔드 API 존재 확인
- ✅ 프론트엔드 타입 정의 완료 (`apis/@types/study-enrollments.ts`)
- ✅ 서비스 함수 구현 완료 (`apis/service/study-enrollments.ts`)
- ✅ 스터디원 상세 화면에서 실제 사용 중
- ✅ 출석/인증 상태 표시 확인

**응답 데이터**:
- `studyToken`: 스터디 토큰
- `avatarToken`: 아바타 토큰
- `meetingAttendanceStatus[]`: 회차별 출석/인증 상태
  - `meetingNo`: 회차 번호
  - `studyDate`: 스터디 날짜
  - `attendanceStatus`: 출석 상태 (PRESENT/LATENESS/ABSENT)
  - `hasApproveProof`: 인증 승인 여부

---

### 7. ~~리더 권한 위임~~ ✅ 완료
**API**: PATCH `/api/v1/study/{studyToken}/enrollments/delegate`  
**상태**: ✅ 완료 (2025-01-22)
- API와 UI가 이미 완전히 구현되어 있었음
- 백엔드 API: `PATCH /study/{studyToken}/enrollments/delegate`
- 백엔드 파일: `EnrollmentController.java`, `DelegateLeaderRequest.java`
- 프론트엔드 서비스: `StudyEnrollmentsService().delegateStudy()`
- 사용 화면: `app/(tabs)/(my)/manage/[token]/member-detail.tsx`

**완료 작업**:
- ✅ 백엔드 API 존재 확인
- ✅ 프론트엔드 서비스 함수 구현 완료
- ✅ 권한 위임 UI 구현 (Chip 버튼)
- ✅ 확인 모달 구현 (위임 주의사항 표시)
- ✅ API 연동 완료
- ✅ 성공/실패 처리 완료

**기능 상세**:
- **UI**: "스터디장 위임하기" Chip 버튼
- **모달 내용**:
  - 위임 대상 스터디원 닉네임 표시
  - 주의사항: "1회만 가능, 재위임 불가"
  - 충분한 논의 후 진행 권장
  - 위임 후 모든 권리 이전 안내
- **API 요청**: `{ targetToken: string }`
- **성공 시**: Alert + 이전 화면으로 이동
- **실패 시**: 에러 Alert 표시

---

### 8. ~~강제 퇴출~~ ✅ 완료
**API**: PATCH `/api/v1/study/{studyToken}/enrollments/forced-out`  
**상태**: ✅ 완료 (2025-01-22)
- API와 UI가 이미 완전히 구현되어 있었음
- 백엔드 API: `PATCH /study/{studyToken}/enrollments/forced-out`
- 백엔드 파일: `EnrollmentController.java`, `ForcedOutRequest.java`
- 프론트엔드 서비스: `StudyEnrollmentsService().forcedOut()`
- 사용 화면: `app/(tabs)/(my)/manage/[token]/member-detail.tsx`

**완료 작업**:
- ✅ 백엔드 API 존재 확인
- ✅ 프론트엔드 서비스 함수 구현 완료
- ✅ 퇴출 UI 구현 (강퇴하기 버튼)
- ✅ 확인 모달 구현 (퇴출 확인 및 주의사항)
- ✅ API 연동 완료
- ✅ 모달 닫기 처리 완료

**기능 상세**:
- **UI**: "강퇴하기" outlined 버튼
- **모달 내용**:
  - 제목: "강퇴하기"
  - 확인 메시지: "{닉네임} 님을 강퇴하시겠습니까?"
  - 주의사항: "강퇴 후 스터디원은 스터디에 참여할 수 없습니다."
- **API 요청**: `{ targetToken: string }`
- **처리**: finally로 모달 닫기 (성공/실패 무관)

**비고**: 
- 퇴출 사유 입력 기능은 현재 UI에 없음 (백엔드 API도 사유 필드 없음)
- 간단한 확인 모달로 즉시 퇴출 처리

---

### 9. ~~미인증 상태 수정~~ ✅ 완료
**API**: POST `/api/v1/study/{studyToken}/meetings/{meetingNo}/proofs/uncertified`  
**상태**: ✅ 완료 (2025-01-22)
- API가 이미 완전히 구현되어 있었음
- 백엔드 API: `POST /study/{studyToken}/meetings/{meetingNo}/proofs/uncertified`
- 백엔드 파일: `ProofController.java`, `UpdateProofRequest.java`, `ProofService.java`
- 프론트엔드 타입: `ProofRequest.UpdateUncertifiedProof`
- 서비스: `ProofService().updateUncertifiedProof()`
- 사용 화면: `app/(tabs)/(my)/manage/[token]/member-detail.tsx`

**완료 작업**:
- ✅ 백엔드 API 존재 확인
- ✅ 프론트엔드 타입 정의 완료 (`apis/@types/proof.ts`)
- ✅ 서비스 함수 구현 완료 (`apis/service/proof.ts`)
- ✅ 스터디원 상세 화면에서 미인증 클릭 시 수정 모달 표시
- ✅ "수정하기" 버튼에 API 연동 완료
- ✅ 성공 시 데이터 리프레시

**기능 상세**:
- **UI**: 각 회차별 미인증 항목 클릭 → "인증 수정" 모달 표시
- **모달 내용**:
  - 선택한 날짜 표시
  - "미인증 내역을 '인증'으로 수정합니다" 안내
- **API 요청**: `{ targetToken: string, provenTime: string }`
- **권한**: 스터디 리더만 가능
- **성공 시**: Alert 표시 + 출석/인증 데이터 리프레시

**비고**: 
- "일괄 처리"가 아닌 **개별 미인증 항목 수정** 기능
- 각 회차별로 하나씩 수정하는 방식

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

### 13. ~~프로필 사진 업로드~~ ✅ 완료
**API**: POST `/api/v1/avatars/photos`  
**상태**: ✅ 완료 (이미 구현됨)
- 백엔드 API: `POST /avatars/photos` (multipart/form-data)
- 백엔드 파일: `AvatarController.java`, `AvatarService.java`, `ProfilePhotoFactory.java`
- 프론트엔드 서비스: `AvatarsService().photos()`
- 사용 화면: `app/(tabs)/(my)/myinfo/account-info.tsx`
- 이미지 유틸: `utils/imageUpload.ts` (압축 기능 포함)

**완료 작업**:
- ✅ 백엔드 API 구현 완료
- ✅ 프론트엔드 서비스 함수 구현 완료
- ✅ 이미지 피커 구현 (`expo-image-picker`)
- ✅ FormData로 multipart/form-data 업로드
- ✅ 이미지 압축 유틸 함수 (`compressImage`)

**기능 상세**:
- **UI**: 계정 정보 화면에서 프로필 사진 클릭
- **이미지 피커**:
  - `expo-image-picker` 사용
  - 1:1 비율로 크롭
  - 품질 설정 가능
- **업로드 방식**:
  ```typescript
  const body = new FormData();
  body.append('file', imageFile);
  body.append('request', {
    string: JSON.stringify({ defaultPhoto: false }),
    type: 'application/json',
  });
  ```
- **백엔드 요청**:
  - `file`: MultipartFile (optional, nullable)
  - `request`: `{ defaultPhoto: boolean }` (application/json)
- **성공 시**: Alert 표시
- **실패 시**: 에러 Alert 표시

**비고**: 
- 기본 프로필 사진으로 변경: `defaultPhoto: true`, file 없이 요청
- 이미지 압축 기능은 TODO로 남아있지만 기본 기능은 완동

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

### 19. ~~회원 탈퇴~~ ✅ 완료
**API**: 
- GET `/api/v1/avatars/withdraw/check`
- POST `/api/v1/avatars/withdraw`

**상태**: ✅ 완료 (이미 구현됨)
- 백엔드 API: 
  - `GET /avatars/withdraw/check` - 탈퇴 가능 여부 확인
  - `POST /avatars/withdraw` - 회원 탈퇴 실행
- 백엔드 파일: `UserWithdrawalController.java`, `UserWithdrawalServiceImpl.java`
- 프론트엔드 서비스: `AvatarsService().checkWithdraw()`, `AvatarsService().withdraw()`
- 사용 화면: `app/(tabs)/(my)/myinfo/account-info.tsx`

**완료 작업**:
- ✅ 백엔드 API 구현 완료
- ✅ 프론트엔드 서비스 함수 구현 완료 (`apis/service/signup.ts`)
- ✅ 탈퇴 가능 여부 확인 기능
  - 진행 중인 스터디가 있는지 확인
  - 스터디장인 경우 탈퇴 불가
- ✅ 회원 탈퇴 UI 구현
  - "회원 탈퇴" 버튼 (계정 정보 화면)
  - 탈퇴 확인 모달
  - 탈퇴 불가 시 안내 메시지
- ✅ 탈퇴 성공 시 자동 로그아웃 및 로그인 화면 이동

**기능 상세**:
- **탈퇴 가능 여부 확인**:
  - 진행 중인 스터디 체크 (`OngoingStudyChecker`)
  - 스터디장인 경우 "진행중인 스터디가 있습니다" 메시지
- **탈퇴 프로세스**:
  1. 모달 열 때 자동으로 탈퇴 가능 여부 확인
  2. 탈퇴 불가 시: 안내 메시지 표시, 탈퇴 버튼 비활성화
  3. 탈퇴 가능 시: "회원 탈퇴" 버튼 클릭
  4. 확인 Alert 표시
  5. 확인 시: API 호출 → 로그아웃 → 스토어 초기화 → 로그인 화면 이동
- **백엔드 로직**:
  - `WithdrawalAvailabilityChecker` 인터페이스로 확장 가능한 검증 구조
  - `WithdrawProcessor`로 탈퇴 처리 (사용자 상태 변경 등)

**비고**: 
- 탈퇴 사유 선택 기능은 현재 없음 (백엔드 API에도 사유 필드 없음)
- 간단한 탈퇴 확인만으로 즉시 처리
- "회원 탈퇴"와 "스터디 탈퇴"는 별도 기능 (스터디 탈퇴는 `WithdrawService` 사용)

---

### 20. ~~검색 기능~~ ✅ 완료
**API**: GET `/api/v1/study/search`  
**상태**: ✅ 완료 (이미 구현됨)
- 백엔드 API: `GET /study/search` - 키워드 기반 스터디 검색
- 백엔드 파일: `SearchController.java`, `StudyReadService.java`, `SearchParameter.java`
- 프론트엔드 서비스: `StudyService().search()`
- 사용 화면: `app/study/search.tsx`

**완료 작업**:
- ✅ 백엔드 API 구현 완료
- ✅ 프론트엔드 서비스 함수 구현 완료 (`apis/service/study.ts`)
- ✅ 검색 UI 구현
  - 검색바 (키워드 입력)
  - 검색 버튼 / Enter 키 제출
  - 검색어 초기화 (X 버튼)
- ✅ 검색 결과 페이지
  - 총 결과 개수 표시
  - 스터디 카드 리스트
  - 페이지네이션
- ✅ 필터 기능 (FilterBottomSheet)
  - 카테고리 선택
  - 스터디 형태 (온라인/오프라인)
  - 요일 선택
  - 시간대 선택
  - 참여 인원 범위
  - 지역 선택 (시/도, 구/군)
- ✅ 최근 검색 기능
  - 최근 검색어 목록
  - 검색어 클릭 시 재검색
  - 전체 삭제 기능

**기능 상세**:
- **백엔드 검색 파라미터**:
  - `keyword`: 검색할 스터디 제목 (필수)
  - `category`: 카테고리 (예: 입시)
  - `form`: 스터디 형태 (ONLINE/OFFLINE)
  - `possibleDays`: 가능한 요일 배열
  - `timeZone`: 시간대 (MORNING/AFTERNOON/EVENING 등)
  - `minParticipationCount`: 최소 참여 인원
  - `maxParticipationCount`: 최대 참여 인원
  - `province`: 시/도 (예: 서울특별시)
  - `city`: 구/군 (예: 도봉구)
- **검색 응답**:
  - `studyToken`: 스터디 토큰
  - `title`: 스터디 제목
  - `isBookmark`: 북마크 여부
  - `viewCount`: 조회수
  - `leader`: 스터디장 정보 (닉네임, 평점)
  - `memberAverage`: 스터디원 평균 평점
- **검색 기록 자동 저장**:
  - 검색 시 자동으로 `SearchHistory` 엔티티에 저장
  - `SearchHistorySaveService` 사용
- **UI 흐름**:
  1. 검색어 입력 없을 때: 필터 + 최근 검색 표시
  2. 검색 실행 후: 결과 개수 + 필터 + 카드 리스트
  3. 검색어 변경 시 결과 자동 초기화

**비고**: 
- 필터 데이터는 `RecommendationContext`에서 관리
- 검색과 필터가 동시에 적용되어 정확한 결과 제공
- 페이지네이션 지원 (pageNumber, pageSize)

---

### 21. ~~검색 기록~~ ✅ 완료
**API**: GET `/api/v1/search-histories`  
**상태**: ✅ 완료 (이미 구현됨)
- 백엔드 API: `GET /search-histories` - 사용자의 최근 검색 기록 조회
- 백엔드 파일: `SearchHistoryReadController.java`, `SearchHistoryReadService.java`
- 프론트엔드: `app/study/search.tsx`에 통합 구현

**완료 작업**:
- ✅ 백엔드 API 구현 완료
- ✅ 검색 기록 자동 저장 (`SearchHistory` 엔티티)
- ✅ 검색 기록 UI 구현 (search.tsx)
  - 최근 검색어 목록 표시
  - 시계 아이콘과 함께 표시
  - 클릭 시 재검색 기능
  - "전체 삭제" 버튼
- ✅ 삭제 기능
  - 전체 삭제 버튼 구현
  - 로컬 상태에서 즉시 제거

**기능 상세**:
- **백엔드 응답**:
  - `id`: 검색 기록 ID
  - `keyword`: 검색 키워드
  - `createdDate`: 검색 시간
- **UI 표시**:
  - 검색 화면 진입 시 자동 로드
  - 최근 검색어를 시간순으로 표시
  - 각 항목 클릭 시 해당 키워드로 재검색
- **저장 타이밍**:
  - 검색 실행 시 자동으로 백엔드에 저장
  - `SearchController`에서 `searchHistorySaveService.save()` 호출

**비고**: 
- 프론트엔드에서 임시로 로컬 상태 관리 중
- 백엔드 API 연동 완료 상태
- 검색 기록은 사용자별로 관리됨

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

### ✅ 완료 - 34시간
1. ~~스터디원 평가 멤버 목록~~ (1시간) - 2025-01-22 완료
2. ~~스터디원 평가 기능~~ (4시간) - 2025-01-22 완료
3. ~~스터디원 상세 정보~~ (3시간) - 2025-01-22 완료
4. ~~스터디장/스터디원 평점 표시~~ (2시간) - 2025-01-22 완료
5. ~~알림 타입별 라우팅~~ (1.5시간) - 2025-01-22 완료 (백엔드 대기)
6. ~~스터디원 참여 상세 정보~~ (3시간) - 2025-01-22 완료
7. ~~리더 권한 위임~~ (3시간) - 2025-01-22 완료
8. ~~강제 퇴출~~ (3시간) - 2025-01-22 완료
9. ~~미인증 상태 수정~~ (2시간) - 2025-01-22 완료
10. ~~프로필 사진 업로드~~ (2시간) - 이미 구현됨
11. ~~회원 탈퇴~~ (3시간) - 이미 구현됨
12. ~~검색 기능~~ (6시간) - 이미 구현됨
13. ~~검색 기록~~ (2시간) - 이미 구현됨

### 🟡 단기 (1-2주) - 3시간
14. 스터디 규칙 관리 (3시간)

### 🟢 중기 (1개월) - 12시간
15. 안드로이드 로그인 (4시간)
16. FCM Push (4시간)
17. 선호 카테고리 (2시간)
18. 탈퇴 관리 UI (4시간)

### ⚪ 장기 (2개월+) - 22시간
19-26. 타이머 인증, 배치, Push, 인증 주제, 공지사항 등

**총 예상 시간**: 37시간 (완료 34시간 제외)
