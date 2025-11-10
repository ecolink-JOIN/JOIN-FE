# JOIN 프로젝트 API 연동 현황

> 백엔드 API 분석 완료: 2025년 1월 10일

## 📊 전체 현황

- **총 백엔드 API**: 약 80개
- **프론트엔드 연동 완료**: 약 50개  
- **미연동 API**: 약 30개
- **전체 연동률**: 약 62%

---

## 🔴 긴급 - 미연동 중요 API

### 1. 차단 해제 API
- **백엔드**: `DELETE /api/v1/blocks/{blockId}`
- **프론트엔드**: `apis/service/blocks.ts` - 구현되어 있으나 500 에러
- **사용 위치**: `app/(tabs)/(my)/myinfo/block-manage.tsx`
- **문제**: 백엔드 엔드포인트 파라미터 확인 필요 (blockId vs avatarToken)

### 2. 공지 조회 API
- **백엔드**: ❌ 존재하지 않음 (POST만 있음)
- **필요 API**: `GET /api/v1/study/{studyToken}/notice`
- **사용 위치**: 
  - `components/organisms/MyPage/Manage.tsx` - StudyAnnouncement
  - `app/(tabs)/(my)/manage/[token]/notice.tsx`
- **현재 상태**: Mock 데이터 사용 중

### 3. 스터디원 상세 정보 조회
- **백엔드**: `GET /api/v1/avatars/{avatarToken}`
- **프론트엔드**: ❌ 미연동
- **사용 위치**: `app/(tabs)/(my)/manage/[token]/member/[id]/index.tsx`
- **현재 상태**: 하드코딩된 닉네임, 출석률, 인증률
- **Response**:
```typescript
{
  avatarToken: string;
  nickname: string;
  profileUrl: string;
  attendanceRate: number;  // %
  proofRate: number;       // %
}
```

### 4. 스터디 멤버 목록 조회
- **백엔드**: `GET /api/v1/study/{studyToken}/enrollments/members`
- **프론트엔드**: ❌ 미연동
- **사용 위치**: 
  - `components/organisms/MyPage/Manage.tsx` - StudyEvaluation
  - 평가 대상자 선택 화면
- **현재 상태**: Mock 데이터 5명 하드코딩
- **Response**:
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

### 5. 스터디원 참여 상세 정보
- **백엔드**: `GET /api/v1/study/{studyToken}/enrollments/{targetToken}`
- **프론트엔드**: ❌ 미연동
- **사용 위치**: 멤버 상세 페이지
- **Response**: 출석률, 인증률, 참여 상태 등

### 6. 리더 권한 위임
- **백엔드**: `PATCH /api/v1/study/{studyToken}/enrollments/delegate`
- **프론트엔드**: ❌ 미연동
- **사용 위치**: 미구현
- **Request**:
```typescript
{
  targetToken: string;  // 새 리더의 avatarToken
}
```

### 7. 강제 퇴출
- **백엔드**: `PATCH /api/v1/study/{studyToken}/enrollments/forced-out`
- **프론트엔드**: ❌ 미연동
- **사용 위치**: 미구현
- **Request**:
```typescript
{
  targetToken: string;  // 퇴출 대상 avatarToken
}
```

### 8. 미인증자 처리
- **백엔드**: `POST /api/v1/study/{studyToken}/proofs/uncertified`
- **프론트엔드**: ❌ 미연동
- **사용 위치**: 미구현
- **설명**: 인증하지 않은 멤버들을 일괄 처리

---

## 🟡 보통 - 미연동 API

### 9. 일반 공지 조회
- **백엔드**: `GET /api/v1/notices`
- **프론트엔드**: ❌ 미연동
- **사용 위치**: 미구현 (전체 공지사항 페이지)

### 10. 스터디 탈퇴 신청 목록
- **백엔드**: `GET /api/v1/study/{studyToken}/withdraw/request`
- **프론트엔드**: `apis/service/withdraw.ts` - ✅ 구현됨
- **사용 위치**: ❌ 미구현 (관리자 페이지에서 사용 예정)

### 11. 스터디 탈퇴 승인
- **백엔드**: `POST /api/v1/study/{studyToken}/withdraw/{withdrawId}/approve`
- **프론트엔드**: `apis/service/withdraw.ts` - ✅ 구현됨
- **사용 위치**: ❌ 미구현 (관리자 페이지에서 사용 예정)

### 12. 배치 작업 API (4개)
- **백엔드**: 
  - `POST /api/v1/batch-job` - 배치 작업 생성
  - `PUT /api/v1/batch-job/{batchJobId}` - 배치 작업 수정
  - `GET /api/v1/study/{studyToken}/batch-jobs` - 배치 작업 목록
  - `DELETE /api/v1/batch-job/{batchJobId}` - 배치 작업 삭제
- **프론트엔드**: `apis/service/batch-job.ts` - ✅ 구현됨
- **사용 위치**: ❌ 미구현 (자동화 기능)

### 13. 스터디 규칙 API (2개)
- **백엔드**:
  - `GET /api/v1/study/{studyToken}/rules` - 규칙 조회
  - `PUT /api/v1/study/{studyToken}/rules` - 규칙 수정
- **프론트엔드**: ❌ 미연동
- **사용 위치**: 미구현 (스터디 설정 페이지)

### 14. 프로필 사진 업로드
- **백엔드**: `POST /api/v1/avatars/photos` (multipart/form-data)
- **프론트엔드**: ❌ 미연동
- **사용 위치**: 미구현 (프로필 수정 페이지)

### 15. 선호 카테고리 수정
- **백엔드**: `PUT /api/v1/avatars/preference`
- **프론트엔드**: ❌ 미연동
- **사용 위치**: 미구현 (관심사 설정)

### 16. 회원 탈퇴 체크
- **백엔드**: `GET /api/v1/user-withdrawal/check`
- **프론트엔드**: ❌ 미연동
- **사용 위치**: 미구현 (탈퇴 전 확인)

### 17. 회원 탈퇴 실행
- **백엔드**: `POST /api/v1/user-withdrawal`
- **프론트엔드**: ❌ 미연동
- **사용 위치**: 미구현 (회원 탈퇴)

### 18. Push 알림 설정
- **백엔드**: `PUT /api/v1/push`
- **프론트엔드**: ❌ 미연동
- **사용 위치**: 미구현 (알림 설정)

---

## 🟢 낮음 - 향후 구현 예정 API

### 19. 검색 기록 조회
- **백엔드**: `GET /api/v1/search-history`
- **사용 위치**: 미구현 (검색 화면)

### 20. 인증 주제 조회
- **백엔드**: `GET /api/v1/study/{studyToken}/proofs/subjects`
- **사용 위치**: 미구현 (인증 주제 관리)

### 21. 특정 사용자 인증 내역
- **백엔드**: `GET /api/v1/study/{studyToken}/avatars/{targetAvatarToken}/proofs`
- **사용 위치**: 미구현 (멤버 인증 내역 조회)

### 22. 특정 인증 상세
- **백엔드**: `GET /api/v1/study/{studyToken}/meetings/{meetingNo}/proofs/{proofId}`
- **사용 위치**: 미구현 (인증 상세 보기)

### 23. 스터디 검색
- **백엔드**: `GET /api/v1/search`
- **사용 위치**: 검색 화면 (구현 필요)

---

## ✅ 연동 완료 API

### Applications (지원) - 100%
- ✅ `POST /api/v1/applications` - 스터디 지원
- ✅ `PATCH /api/v1/applications/{applicationId}/accept` - 지원 승인
- ✅ `PATCH /api/v1/applications/{applicationId}/reject` - 지원 반려
- ✅ `GET /api/v1/applications/{studyToken}` - 지원 현황 조회
- **위치**: `apis/service/applications.ts`

### Attendance (출석) - 100%
- ✅ `POST /api/v1/study/{studyToken}/meetings/{meetingNo}/attendance` - 출석 체크
- ✅ `GET /api/v1/study/{studyToken}/meetings/{meetingNo}/attendance` - 출석 상태 조회
- ✅ `PATCH /api/v1/study/{studyToken}/attendance/{attendanceId}` - 출석 수정 (관리자)
- **위치**: `apis/service/attendance.ts`, `app/(tabs)/(certified)/index.tsx`

### Proof (인증) - 70%
- ✅ `POST /api/v1/study/{studyToken}/proofs` - 인증 제출
- ✅ `GET /api/v1/study/{studyToken}/meetings/{meetingNo}/proofs` - 인증 상태 조회
- ✅ `PATCH /api/v1/study/{studyToken}/proofs/{proofId}/approve` - 인증 승인
- ✅ `PATCH /api/v1/study/{studyToken}/proofs/{proofId}/reject` - 인증 반려
- ✅ `POST /api/v1/proof/files` - 인증 이미지 업로드
- ❌ `POST /api/v1/study/{studyToken}/proofs/uncertified` - 미인증자 처리
- ❌ `GET /api/v1/study/{studyToken}/proofs/subjects` - 인증 주제 조회
- ❌ `GET /api/v1/study/{studyToken}/avatars/{targetAvatarToken}/proofs` - 특정 사용자 인증 내역
- ❌ `GET /api/v1/study/{studyToken}/meetings/{meetingNo}/proofs/{proofId}` - 특정 인증 상세
- **위치**: `apis/service/proof.ts`, `app/(tabs)/(certified)/index.tsx`

### Meeting (회차) - 100%
- ✅ `POST /api/v1/study/{studyToken}/meetings` - 회차 생성
- ✅ `GET /api/v1/study/{studyToken}/meetings` - 회차 목록 조회
- ✅ `DELETE /api/v1/study/{studyToken}/meetings/{meetingId}` - 회차 삭제
- **위치**: `apis/service/meetings.ts`, `hooks/useMeetings.ts`

### Study (스터디) - 90%
- ✅ `POST /api/v1/study/recruit` - 스터디 모집 등록
- ✅ `GET /api/v1/study/{studyToken}` - 스터디 상세 조회
- ✅ `GET /api/v1/study/popular` - 인기 스터디 목록
- ✅ `GET /api/v1/study/recommendation` - 추천 스터디 목록
- ✅ `GET /api/v1/study/{studyToken}/status` - 스터디 상태 조회
- ✅ `GET /api/v1/study/{studyToken}/recruit` - 모집 상세 정보
- ✅ `POST /api/v1/study/{studyToken}/member` - 스터디 참여
- ✅ `POST /api/v1/study/{studyToken}/close` - 스터디 종료
- ✅ `PATCH /api/v1/study/{studyToken}/recruitment` - 모집 상태 변경
- ✅ `PATCH /api/v1/study/re-recruit` - 재모집
- ❌ `GET /api/v1/study/{studyToken}/rules` - 규칙 조회
- ❌ `PUT /api/v1/study/{studyToken}/rules` - 규칙 수정
- **위치**: `apis/service/study.ts`

### Bookmark (북마크) - 100%
- ✅ `POST /api/v1/bookmarks` - 북마크 추가
- ✅ `DELETE /api/v1/bookmarks` - 북마크 삭제
- ✅ `GET /api/v1/bookmarks` - 북마크 목록 조회
- **위치**: `apis/service/bookmarks.ts`

### Block (차단) - 80%
- ✅ `GET /api/v1/blocks` - 차단 목록 조회
- ✅ `POST /api/v1/blocks` - 일반 사용자 차단
- ✅ `POST /api/v1/blocks/study-member` - 스터디 멤버 차단
- ✅ `GET /api/v1/study/block` - 차단 가능한 사용자 목록
- ⚠️ `DELETE /api/v1/blocks/{blockId}` - 차단 해제 (500 에러)
- **위치**: `apis/service/blocks.ts`, `app/(tabs)/(my)/myinfo/block-manage.tsx`

### Report (신고) - 100%
- ✅ `POST /api/v1/reports` - 신고하기
- **위치**: `apis/service/report.ts`

### Evaluation (평가) - 100%
- ✅ `POST /api/v1/evaluation` - 스터디원 평가
- **위치**: `apis/service/evaluation.ts`

### Withdraw (탈퇴) - 100% (API만)
- ✅ `POST /api/v1/study/{studyToken}/withdraw` - 탈퇴 신청
- ✅ `GET /api/v1/study/{studyToken}/withdraw/request` - 탈퇴 신청 목록
- ✅ `POST /api/v1/study/{studyToken}/withdraw/{withdrawId}/approve` - 탈퇴 승인
- **위치**: `apis/service/withdraw.ts` (UI 미구현)

### Notification (알림) - 100%
- ✅ `GET /notifications` - 알림 목록 조회 (api.prefix 없음)
- ✅ `POST /api/v1/notifications` - 알림 읽음 처리
- **위치**: `apis/service/notifications.ts`, `context/NotificationContext.tsx`

### MyPage (마이페이지) - 100%
- ✅ `GET /api/v1/mypage` - 내 정보 조회
- ✅ `GET /api/v1/mypage/manage-study` - 관리 중인 스터디
- ✅ `GET /api/v1/mypage/join-study` - 참여 중인 스터디
- ✅ `GET /api/v1/mypage/interest-study` - 관심 스터디
- **위치**: `apis/service/my-page.ts`, `hooks/useMyPage.ts`

### Avatar (아바타/유저) - 30%
- ✅ `GET /api/v1/avatars/nickname/valid` - 닉네임 중복 체크
- ✅ `PATCH /api/v1/avatars/nickname` - 닉네임 변경
- ✅ `GET /api/v1/avatars` - 내 아바타 정보
- ❌ `POST /api/v1/avatars/photos` - 프로필 사진 업로드
- ❌ `PUT /api/v1/avatars/preference` - 선호 카테고리 수정
- ❌ `GET /api/v1/avatars/{avatarToken}` - 아바타 상세 정보
- **위치**: `apis/service/user.ts`, `apis/service/signup.ts`

### View History (조회 기록) - 100%
- ✅ `GET /api/v1/view-history` - 최근 본 스터디
- **위치**: `apis/service/views.ts`

### Terms (약관) - 100%
- ✅ `GET /api/v1/terms` - 약관 목록
- ✅ `POST /api/v1/terms/all` - 전체 약관 동의
- ✅ `POST /api/v1/terms/agree` - 개별 약관 동의
- **위치**: `apis/service/signup.ts`

---

## 📝 API 연동 우선순위

### 1순위 (즉시 필요) 🔴
1. ⚠️ 차단 해제 API 수정 - `apis/service/blocks.ts`
2. ❌ 스터디원 상세 정보 - `GET /avatars/{avatarToken}` 
3. ❌ 스터디 멤버 목록 - `GET /enrollments/members`
4. ❌ 공지 조회 API 백엔드 구현 요청

### 2순위 (주요 기능) 🟡
5. ❌ 스터디원 참여 상세 - `GET /enrollments/{targetToken}`
6. ❌ 리더 권한 위임 - `PATCH /enrollments/delegate`
7. ❌ 강제 퇴출 - `PATCH /enrollments/forced-out`
8. ❌ 미인증자 처리 - `POST /proofs/uncertified`

### 3순위 (부가 기능) 🟢
9. ❌ 스터디 규칙 조회/수정
10. ❌ 프로필 사진 업로드
11. ❌ 선호 카테고리 수정
12. ❌ Push 알림 설정
13. ❌ 회원 탈퇴

### 4순위 (향후 계획) 🔵
14. ❌ 배치 작업 UI
15. ❌ 검색 기록
16. ❌ 인증 주제 관리
17. ❌ 검색 기능

---

## 🔍 도메인별 연동률

| 도메인 | 연동률 | 상태 | 비고 |
|--------|--------|------|------|
| Applications | 100% | ✅ | 완료 |
| Attendance | 100% | ✅ | 완료 |
| Proof | 70% | ⚠️ | 기본 CRUD 완료 |
| Block | 80% | ⚠️ | 차단 해제 에러 |
| Withdraw | 100% | ⚠️ | API만, UI 미구현 |
| Evaluation | 100% | ✅ | 완료 |
| Enrollment | 0% | ❌ | 미착수 |
| Notice | 0% | ❌ | 백엔드 미구현 |
| Avatar | 30% | ❌ | 기본 기능만 |
| Batch Job | 0% | ❌ | API만 구현 |
| MyPage | 100% | ✅ | 완료 |
| Meeting | 100% | ✅ | 완료 |
| Study | 90% | ✅ | 규칙 제외 완료 |
| Bookmark | 100% | ✅ | 완료 |
| Notification | 100% | ✅ | 완료 |
| Report | 100% | ✅ | 완료 |
| Search | 0% | ❌ | 미착수 |
| User Withdrawal | 0% | ❌ | 미착수 |
| Push | 0% | ❌ | 미착수 |

---

## 📍 컨트롤러별 상세 분석

### ✅ 완전 연동 (7개)
1. **ApplicationController** - 지원 관리
2. **AttendanceController** - 출석 관리
3. **MeetingController** - 회차 관리
4. **BookmarkController** - 북마크 관리
5. **ReportController** - 신고 관리
6. **EvaluationController** - 평가 관리
7. **MyPageController** - 마이페이지
8. **NotificationController** - 알림 관리
9. **ViewHistoryReadController** - 조회 기록
10. **TermController** - 약관 동의

### ⚠️ 부분 연동 (5개)
1. **ProofController** - 인증 관리 (70%)
   - 누락: 미인증자 처리, 주제 관리, 특정 사용자 조회
2. **BlockController** - 차단 관리 (80%)
   - 누락: 차단 해제 (에러)
3. **StudyController** - 스터디 관리 (90%)
   - 누락: 규칙 조회/수정
4. **AvatarController** - 아바타 관리 (30%)
   - 누락: 프로필 사진, 선호도, 상세 정보
5. **WithdrawController** - 탈퇴 관리 (100% API, 0% UI)
   - 누락: UI 구현

### ❌ 미연동 (7개)
1. **EnrollmentController** - 등록 관리 (0%)
   - 리더 위임, 강제 퇴출
2. **EnrollmentReaderController** - 등록 조회 (0%)
   - 멤버 목록, 참여 상세
3. **NoticeController** - 공지 관리 (0%)
   - 백엔드 조회 API 없음
4. **BatchJobController** - 배치 작업 (0%)
   - UI 미구현
5. **SearchController** - 검색 (0%)
   - 전체 미구현
6. **UserWithdrawalController** - 회원 탈퇴 (0%)
   - 전체 미구현
7. **PushController** - Push 알림 (0%)
   - 전체 미구현

---

## 🎯 다음 단계 액션 아이템

### 즉시 조치 필요
1. [ ] 차단 해제 API 500 에러 해결 - 백엔드 확인
2. [ ] 공지 조회 API 백엔드 구현 요청
3. [ ] 스터디원 상세 정보 API 연동 - `GET /avatars/{avatarToken}`
4. [ ] 스터디 멤버 목록 API 연동 - `GET /enrollments/members`

### 단기 목표 (1-2주)
5. [ ] Enrollment 관련 API 전체 연동
   - 멤버 목록 조회
   - 참여 상세 정보
   - 리더 위임
   - 강제 퇴출
6. [ ] 스터디 규칙 관리 기능 구현
7. [ ] 탈퇴 관리 UI 구현

### 중기 목표 (1개월)
8. [ ] 프로필 관리 기능 확장
   - 프로필 사진 업로드
   - 선호 카테고리 수정
9. [ ] 배치 작업 UI 구현
10. [ ] 검색 기능 구현

### 장기 목표 (2개월+)
11. [ ] Push 알림 시스템 구축
12. [ ] 회원 탈퇴 기능 구현
13. [ ] 인증 주제 관리 기능
14. [ ] 검색 기록 기능
