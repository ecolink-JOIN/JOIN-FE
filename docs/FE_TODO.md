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

### 5. ~~탈퇴 관리 UI~~ ✅ 완료
**API**:
- `GET /study/{studyToken}/withdraw/request` - 탈퇴 요청 목록 조회
- `POST /study/{studyToken}/withdraw/{withdrawId}/approve` - 탈퇴 승인
- `POST /study/{studyToken}/withdraw` - 탈퇴 요청 생성

**파일**: `app/(tabs)/(my)/manage/[token]/withdrawal.tsx`  
**상태**: ✅ 완료 (2025-01-22)

**백엔드 API**:
- API: `GET /study/{studyToken}/withdraw/request`
  - 응답: `WithdrawResponse.RequestList`
    - `withdrawId`: 탈퇴 요청 ID (Long)
    - `nickname`: 닉네임 (String)
    - `profileImage`: 프로필 이미지 (Image)
- API: `POST /study/{studyToken}/withdraw/{withdrawId}/approve`
  - 탈퇴 승인 처리
- 백엔드 파일: `WithdrawController.java`, `WithdrawResponse.java`, `WithdrawRequest.java`

**프론트엔드 완료 작업**:
- ✅ 타입 정의 완료 (`apis/@types/withdraw.ts`)
  - `WithdrawResponse.RequestList`, `Request` 인터페이스
  - `WithdrawRequest.PostWithdraw` 인터페이스
- ✅ 서비스 함수 구현 완료 (`apis/service/withdraw.ts`)
  - `getRequest(studyToken)` - 탈퇴 요청 목록 조회
  - `approveWithdraw(studyToken, withdrawId)` - 탈퇴 승인
  - `postWithdraw(studyToken, body)` - 탈퇴 요청 생성
- ✅ 탈퇴 요청 승인 UI 구현 (`withdrawal.tsx`)
  - React Query로 데이터 페칭
  - 로딩 상태 (ActivityIndicator)
  - 빈 상태 메시지
  - 프로필 이미지 fallback 처리
  - 모달로 승인 확인 (닉네임 표시, 취소/승인 버튼)
  - Alert로 성공/실패 처리
  - 에러 처리 및 재시도
- ✅ 불필요한 "인증 승인 필요" 모달 제거
- ✅ 상태 관리 개선 (isProcessing)

**비고**: 반려 기능은 백엔드 API가 없어 미구현

**예상 시간**: 4시간

---

## 🟢 중기 작업 (1개월)

### 6. 안드로이드 로그인
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

### 7. ~~배치 작업 UI~~ ✅ 완료
**API**:
- `GET /batch-job/{studyToken}/batch-jobs` - 자동 알림 조회
- `POST /batch-job` - 자동 알림 등록
- `PUT /batch-job/{batchJobId}` - 자동 알림 변경
- `DELETE /batch-job/{batchJobId}` - 자동 알림 삭제

**파일**: 
- `app/(tabs)/(my)/manage/[token]/alarm.tsx` - 목록 화면
- `app/(tabs)/(my)/manage/[token]/alarm-add.tsx` - 추가 화면
- `app/(tabs)/(my)/manage/[token]/alarm-edit.tsx` - 수정 화면

**상태**: ✅ 완료 (2025-01-22)

**백엔드 API**:
- API: `GET /batch-job/{studyToken}/batch-jobs`
  - 응답: `List<BatchJobResponse>`
    - `batchJobId`: 자동 알림 ID (Long)
    - `content`: 알림 내용 (String, 10-100자)
    - `day`: 요일 (DayType: MON/TUE/WED/THU/FRI/SAT/SUN)
    - `time`: 발송 시간 (LocalTime, 예: "18:30")
- API: `POST /batch-job`
  - 요청: `BatchJobRequest`
    - `content`: 알림 내용 (String, 필수, 10-100자)
    - `day`: 요일 (DayType, 필수)
    - `time`: 발송 시간 (LocalTime, 필수)
    - `studyToken`: 스터디 토큰 (String, 필수)
- API: `PUT /batch-job/{batchJobId}`
  - 요청: `BatchJobUpdateRequest`
    - `content`: 알림 내용 (String, 선택, 10-100자)
    - `day`: 요일 (DayType, 선택)
    - `time`: 발송 시간 (LocalTime, 선택)
    - `studyToken`: 스터디 토큰 (String, 필수)
- API: `DELETE /batch-job/{batchJobId}`
  - 자동 알림 삭제
- 백엔드 파일: `BatchJobController.java`, `BatchJobRequest.java`, `BatchJobUpdateRequest.java`, `BatchJobResponse.java`

**프론트엔드 완료 작업**:
- ✅ 타입 정의 완료 (`apis/@types/batch-job.ts`)
  - `BatchJobRequest.PostBatchJobBody`, `PutBatchJobBody` 인터페이스
  - `BatchJobResponse.Job` 인터페이스
- ✅ 서비스 함수 구현 완료 (`apis/service/batch-job.ts`)
  - `getBatchJobs(studyToken)` - 자동 알림 목록 조회
  - `postBatchJob(body)` - 자동 알림 등록
  - `putBatchJob(body, params)` - 자동 알림 수정
  - `deleteBatchJob(batchJobId)` - 자동 알림 삭제
- ✅ 자동 알림 목록 UI (`alarm.tsx`)
  - React Query로 데이터 페칭
  - 로딩 상태 (ActivityIndicator)
  - 빈 상태 메시지
  - 요일 한글 변환 (MON → 월요일)
- ✅ 자동 알림 추가 UI (`alarm-add.tsx`)
  - 요일/시간 선택 모달 (Daypicker, TimePicker)
  - 메시지 입력 (10-100자 제한)
  - 유효성 검증 (최소 10자)
  - Alert로 성공/실패 처리
  - 로딩 상태 및 disabled 처리
- ✅ 자동 알림 수정 UI (`alarm-edit.tsx`)
  - 요일/시간 수정 기능 활성화
  - 메시지 수정 (10-100자 제한)
  - 유효성 검증
  - 삭제 확인 모달
  - Alert로 성공/실패 처리
  - 로딩 상태 및 disabled 처리

**구현된 기능**:
1. 자동 알림 목록 조회 (요일별 정렬)
2. 자동 알림 추가 (요일, 시간, 메시지)
3. 자동 알림 수정 (요일, 시간, 메시지 모두 수정 가능)
4. 자동 알림 삭제 (확인 모달)
5. 유효성 검증 (메시지 10-100자)
6. 에러 처리 및 성공 메시지

**예상 시간**: 4시간

---

## ⚪ 장기 작업 (2개월+)

### 8. 타이머 인증
**파일**: `app/(tabs)/(certified)/index.tsx:313`  
**현재 상태**: "출시 예정" 표시  
**필요 작업**:
- 타이머 UI 구현
- 타이머 로직
- API 설계 및 연동

**예상 시간**: 8시간

---

### 8. 타이머 인증
**파일**: `app/(tabs)/(certified)/index.tsx:313`  
**현재 상태**: "출시 예정" 표시  
**필요 작업**:
- 타이머 UI 구현
- 타이머 로직
- API 설계 및 연동

**예상 시간**: 8시간

---

### 9. Push 알림 설정
**필요 API**: PUT `/api/v1/push`  
**필요 작업**:
- 알림 설정 UI

**예상 시간**: 2시간

---

### 10. 인증 주제 관리
**필요 API**: GET `/api/v1/study/{studyToken}/proofs/subjects`  
**필요 작업**:
- 인증 주제 목록 UI
- 주제 추가/수정/삭제

**예상 시간**: 4시간

---

### 11. 일반 공지사항
**필요 API**: GET `/api/v1/notices`  
**필요 작업**:
- 공지사항 목록 페이지
- 공지사항 상세 페이지

**예상 시간**: 4시간

---

## 🔧 코드 정리

### 12. OAuth 로그인 성공 처리 완료
**파일**: `app/(auth)/oauth.tsx:55`  
**필요 작업**: TODO 주석 제거 또는 추가 처리 확인

---

### 13. S3 업로드 TODO 제거
**파일**: `app/(tabs)/(certified)/proof.tsx:45`  
**현재 상태**: 이미 구현됨 (`utils/imageUpload.ts`)  
**필요 작업**: TODO 주석 제거

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

### 🟢 중기 (1개월) - 8시간
3. 안드로이드 로그인 (4시간)
4. FCM Push (4시간)

### ⚪ 장기 (2개월+) - 18시간
5-9. 타이머 인증, Push, 인증 주제, 공지사항 등

### 🔧 코드 정리 - 미정
10-15. OAuth, S3, Slider, 테스트 페이지 등

**총 예상 시간**: 30.5시간

---

## ✅ 완료 항목 (2025-01-22)

### 선호 카테고리 수정 (2시간)
- 온보딩 컴포넌트 5개 컨텍스트 연동
- OnboardingContext 타입 정리
- complete.tsx API 자동 호출
- index.tsx 단계별 검증
- account-info.tsx 링크 추가

### 탈퇴 관리 UI (4시간)
- 탈퇴 요청 목록 조회 UI
- 탈퇴 승인 기능
- 로딩 상태, 에러 처리
- 프로필 이미지 fallback
- 모달 개선 (닉네임 표시, 취소/승인)

### 배치 작업 UI (4시간)
- 자동 알림 목록 조회 (React Query)
- 자동 알림 추가 (요일, 시간, 메시지)
- 자동 알림 수정 (요일, 시간, 메시지 모두 수정 가능)
- 자동 알림 삭제 (확인 모달)
- 유효성 검증 (메시지 10-100자)
- 에러 처리 및 성공 메시지

