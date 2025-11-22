# 프론트엔드 미구현 작업 목록

> 업데이트: 2025년 1월 22일  
> 코드 근거 추가: 각 항목에 실제 코드 위치와 TODO 주석 내용 포함

---

## 🟡 단기 작업 (1-2주)

### 1. 알림 타입별 라우팅 ⚠️ 백엔드 작업 필요
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

### 2. 스터디 규칙 관리
**필요 API**:
- GET `/api/v1/study/{studyToken}/rules`
- PUT `/api/v1/study/{studyToken}/rules`

**필요 작업**:
- 규칙 조회/수정 페이지
- 규칙 폼 컴포넌트

**예상 시간**: 3시간

---

## 🟢 중기 작업 (1개월)

### 3. 안드로이드 로그인
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

### 4. FCM Push 알림
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

### 5. ~~선호 카테고리 수정~~ ✅ 완료
**API**: PUT `/api/v1/avatars/preference`  
**상태**: ✅ 완료 (2025-01-22)

**백엔드 API**:
- API: `PUT /avatars/preference`
- 요청 바디: `ChangePreferenceRequest`
  - `category`: 카테고리 (예: "입시", "고시", "취업", "자격증", "사이드프로젝트", "기타")
  - `form`: StudyForm (ONLINE/OFFLINE)
  - `possibleDays`: List<DayType> (가능한 요일 배열)
  - `timeZone`: TimeZone (MORNING/AFTERNOON/EVENING/NIGHT)
  - `minParticipationCount`: 최소 참여 인원 (Integer)
  - `maxParticipationCount`: 최대 참여 인원 (Integer)
  - `province`: 시/도 (String)
  - `city`: 구/군 (String)
- 백엔드 파일: `AvatarController.java`, `ChangePreferenceRequest.java`, `PreferenceStoreImpl.java`

**프론트엔드 완료 작업**:
- ✅ 타입 정의 완료 (`apis/@types/signup.ts`)
  - `Avatars.PreferenceRequest` 인터페이스
- ✅ 서비스 함수 구현 완료 (`apis/service/signup.ts`)
  - `AvatarsService().updatePreference(body)` 함수
- ✅ 온보딩 화면 구현 및 컨텍스트 연동 (`app/(onboarding)/select/`)
  - 스터디 형태 선택 (MeetingTypeSelectPane) - 'ONLINE'/'OFFLINE' 타입 매핑
  - 지역 선택 (LocationSelectPane) - province/city 저장
  - 관심 분야 선택 (InterestAreaSelectPane) - 카테고리 직접 저장
  - 요일/시간 선택 (DateTimeSelectPane) - MONDAY/TUESDAY 등, MORNING/AFTERNOON/EVENING
  - 주간 참여 횟수 (WeeklyParticipationCountSelectPane)
- ✅ 온보딩 컨텍스트 타입 수정 (`context/OnboardingContext.tsx`)
  - 한글 → 영문 타입 매핑 완료
  - TODO 주석 제거
- ✅ 온보딩 완료 시 API 호출 (`complete.tsx`)
  - useEffect에서 자동으로 API 호출
  - 타입 변환 후 updatePreference 실행
- ✅ 각 단계별 완료 조건 체크 (`index.tsx`)
  - 다음 버튼 활성화/비활성화 로직
- ✅ 선호 설정 수정 화면 존재 확인 (`preference.tsx`)
  - 이미 완전한 UI와 기능 구현됨
  - 카테고리, 형태, 요일, 시간대, 인원, 지역 모두 설정 가능
- ✅ 계정 정보 화면에 "선호 설정" 링크 추가 (`account-info.tsx`)

**구현된 기능**:
1. 온보딩 시 선호 설정 자동 저장
2. 계정 정보 > 선호 설정에서 수정 가능
3. 한글/영문 타입 자동 변환
4. 각 단계별 입력 검증
5. 저장 성공/실패 Alert 표시

---

### 5. 탈퇴 관리 UI
**현재 상태**: API 구현됨 (`apis/service/withdraw.ts`)  
**필요 작업**:
- 탈퇴 신청 목록 UI
- 승인/반려 기능

**예상 시간**: 4시간

---

## ⚪ 장기 작업 (2개월+)

### 6. 타이머 인증
**파일**: `app/(tabs)/(certified)/index.tsx:313`  
**현재 상태**: "출시 예정" 표시  
**필요 작업**:
- 타이머 UI 구현
- 타이머 로직
- API 설계 및 연동

**예상 시간**: 8시간

---

### 7. 배치 작업 UI
**현재 상태**: API 구현됨 (`apis/service/batch-job.ts`)  
**필요 작업**:
- 배치 작업 목록 UI
- 생성/수정/삭제 기능

**예상 시간**: 4시간

---

### 8. Push 알림 설정
**필요 API**: PUT `/api/v1/push`  
**필요 작업**:
- 알림 설정 UI

**예상 시간**: 2시간

---

### 9. 인증 주제 관리
**필요 API**: GET `/api/v1/study/{studyToken}/proofs/subjects`  
**필요 작업**:
- 인증 주제 목록 UI
- 주제 추가/수정/삭제

**예상 시간**: 4시간

---

### 10. 일반 공지사항
**필요 API**: GET `/api/v1/notices`  
**필요 작업**:
- 공지사항 목록 페이지
- 공지사항 상세 페이지

**예상 시간**: 4시간

---

## 🔧 코드 정리

### 11. OAuth 로그인 성공 처리 완료
**파일**: `app/(auth)/oauth.tsx:55`  
**필요 작업**: TODO 주석 제거 또는 추가 처리 확인

---

### 12. S3 업로드 TODO 제거
**파일**: `app/(tabs)/(certified)/proof.tsx:45`  
**현재 상태**: 이미 구현됨 (`utils/imageUpload.ts`)  
**필요 작업**: TODO 주석 제거

---

### 13. 온보딩 컨텍스트 정리 ✅ 완료
**파일**: `context/OnboardingContext.tsx:4`  
**상태**: ✅ 완료 - TODO 주석 제거 및 타입 정리 완료정리 완료

---

### 14. Slider 디자인 확정
**파일**: `components/molecules/Onboarding/WeeklyParticipationCountSelectPane.tsx:10`  
**필요 작업**: 디자인 확정 후 구현

---

### 15. 테스트 페이지 처리
**파일**: `components/organisms/GNB.tsx:34`  
**필요 작업**: 제거 또는 개발 모드 전용 처리

---

### 16. Badge Alert 테스트 코드
**파일**: `components/organisms/BadgeComponentList.tsx:13`  
**필요 작업**: 테스트 코드 제거 또는 실제 기능 구현

---

### 17. 시간 입력 주석 정리
**파일**: `app/(tabs)/(my)/manage/[token]/study-schedule.tsx:332`  
**필요 작업**: 주석 정리 또는 명확한 설명 추가

---

## 📊 우선순위 요약

### 🟡 단기 (1-2주) - 4.5시간
1. 알림 타입별 라우팅 (1.5시간) - 백엔드 작업 대기
2. 스터디 규칙 관리 (3시간)

### 🟢 중기 (1개월) - 12시간
3. 안드로이드 로그인 (4시간)
4. FCM Push (4시간)
5. 탈퇴 관리 UI (4시간)

### ⚪ 장기 (2개월+) - 22시간
6-10. 타이머 인증, 배치, Push, 인증 주제, 공지사항 등

### 🔧 코드 정리 - 미정
11-17. OAuth, S3, 온보딩, Slider, 테스트 페이지 등

**총 예상 시간**: 38.5시간

