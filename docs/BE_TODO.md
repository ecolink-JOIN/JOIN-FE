# 백엔드 미구현 작업 목록

> 업데이트: 2025년 1월 22일

---

## 긴급 - 즉시 수정 필요

### 1. 공지 조회 API 미구현
**현재 상태**:
- POST `/api/v1/study/{studyToken}/notice` - 공지 등록 (구현됨)
- GET `/api/v1/study/{studyToken}/notice` - 공지 조회 (미구현)

**필요 작업**:
```java
@GetMapping("/{studyToken}/notice")
public ApiResponse<NoticeResponse> getNotice(@PathVariable String studyToken) {
    // 공지 조회 로직 구현
}
```

**Response**:
```typescript
{
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
```

**영향받는 화면**:
- `components/organisms/MyPage/Manage.tsx` - StudyAnnouncement
- `app/(tabs)/(my)/manage/[token]/notice.tsx`

**현재 대응**: 공지 등록은 가능, 조회 시 Alert 표시

---

### 2. 차단 해제 API 파라미터 확인
**현재 상태**: DELETE `/api/v1/blocks/{???}` - 500 Error  
**문제**: 파라미터 타입 불명확

**확인 필요**:
```java
@DeleteMapping("/{blockId}")  // blockId(Long)?
또는
@DeleteMapping("/{avatarToken}")  // avatarToken(String)?
```

**프론트엔드 현재 코드**:
```typescript
// apis/service/blocks.ts
deleteBlock: (blockId: number) => 
  API.delete(`/blocks/${blockId}`)
```

**영향받는 화면**:
- `app/(tabs)/(my)/myinfo/block-manage.tsx`

**현재 대응**: 차단 해제 시 에러 안내 Alert 표시

---

### 3. 스터디 회차 자동/수동 생성 모드 전환 API
**현재 상태**:
- Study 엔티티에 `isRegular` 필드만 존재 (정기/비정기)
- `MeetingAutoService.createRegularMeetings()` - 자동 생성 로직 존재
- 자동/수동 모드 전환 API 없음

**필요 작업**:
```java
// Study.java에 필드 추가
private boolean isAutoMeeting; // 회차 자동 생성 여부

// StudyController.java에 엔드포인트 추가
@PatchMapping("/{studyToken}/meeting-mode")
public ApiResponse<Void> updateMeetingMode(
    @PathVariable String studyToken,
    @RequestBody MeetingModeRequest request
) {
    // isAutoMeeting 필드 업데이트
}
```

**Request**:
```typescript
{
  isAutoMeeting: boolean;
}
```

**영향받는 화면**:
- `app/(tabs)/(my)/manage/[token]/round.tsx`

**현재 대응**: 라디오 버튼 클릭 시 Alert 표시, 회차 추가/삭제는 정상 작동

---

## 중요 - 단기 수정 필요

### 4. 알림 API 경로 불일치
**현재 상태**:
- 다른 API: `/api/v1/...` (api.prefix 사용)
- 알림 API: `/notifications` (api.prefix 미사용)

**확인 필요**:
```java
// NotificationReadController.java
@RequestMapping("/notifications")  // api.prefix 없음

// 통일 권장
@RequestMapping("${api.prefix}/notifications")
```

**현재 대응**: 프론트엔드에서 예외 처리로 정상 작동 중

---

### 5. 스터디 멤버 목록 조회 API
**필요 엔드포인트**: GET `/api/v1/study/{studyToken}/enrollments/members`

**Response**:
```typescript
{
  members: [{
    avatarToken: string;
    nickname: string;
    profileUrl: string;
    isLeader: boolean;
    attendanceRate: number;
    proofRate: number;
  }]
}
```

**영향받는 화면**:
- `components/organisms/MyPage/Manage.tsx` - StudyEvaluation
- 평가 대상자 선택 화면

**현재 대응**: Mock 데이터 5명 하드코딩

---

### 6. 스터디원 상세 정보 조회 API
**필요 엔드포인트**: GET `/api/v1/avatars/{avatarToken}`

**Response**:
```typescript
{
  avatarToken: string;
  nickname: string;
  profileUrl: string;
  attendanceRate: number;
  proofRate: number;
  joinedAt: string;
}
```

**영향받는 화면**:
- `app/(tabs)/(my)/manage/[token]/member/[id]/index.tsx`

**현재 대응**: 닉네임, 출석률, 인증률 하드코딩

**요구사항**: 출석률/인증률 계산 로직 포함 필요

---

### 7. 스터디원 참여 상세 정보 API
**필요 엔드포인트**: GET `/api/v1/study/{studyToken}/enrollments/{targetToken}`

**Response**:
```typescript
{
  avatarToken: string;
  nickname: string;
  profileUrl: string;
  attendanceRate: number;
  proofRate: number;
  role: "LEADER" | "MEMBER";
  status: "JOINED" | "WITHDRAWN";
  joinedAt: string;
}
```

**사용처**: 멤버 상세 페이지, 관리자 권한 확인

---

## 보통 - 중기 수정 필요

### 8. 리더 권한 위임 API
**필요 엔드포인트**: PATCH `/api/v1/study/{studyToken}/enrollments/delegate`

**Request**:
```typescript
{
  targetToken: string; // 새 리더의 avatarToken
}
```

**현재 상태**: 미구현 (UI 없음)

---

### 9. 강제 퇴출 API
**필요 엔드포인트**: PATCH `/api/v1/study/{studyToken}/enrollments/forced-out`

**Request**:
```typescript
{
  targetToken: string; // 퇴출 대상 avatarToken
}
```

**현재 상태**: 미구현 (UI 없음)

---

### 10. 미인증자 일괄 처리 API
**필요 엔드포인트**: POST `/api/v1/study/{studyToken}/proofs/uncertified`

**Request**:
```typescript
{
  meetingNo: number;
  action: "REJECT" | "PENALTY";
}
```

**현재 상태**: 미구현 (UI 없음)

---

### 11. 스터디 규칙 조회/수정 API
**필요 엔드포인트**:
- GET `/api/v1/study/{studyToken}/rules`
- PUT `/api/v1/study/{studyToken}/rules`

**Response (GET)**:
```typescript
{
  rules: [
    { type: "ATTENDANCE", enabled: true },
    { type: "PROOF", enabled: true },
    { type: "FINE", enabled: true, amount: 3000 }
  ],
  ruleExp: string;
}
```

**Request (PUT)**:
```typescript
{
  rules: RuleRequest[];
  ruleExp: string;
}
```

**현재 상태**: 미구현 (UI 없음)

---

### 12. 스터디명 변경 API
**필요 엔드포인트**: PATCH `/api/v1/study/{studyToken}/name`

**Request**:
```typescript
{
  studyName: string;
}
```

**영향받는 화면**:
- `components/organisms/MyPage/Main/StudyTabs/ManageStudy.tsx` Line 66

**현재 대응**: Alert 표시

---

## 확인 필요

### 13. 프로필 사진 업로드 API
**엔드포인트**: POST `/api/v1/avatars/photos` (multipart/form-data)  
**현재 상태**: 구현되어 있을 가능성 있음  
**확인 필요**: API 명세 및 동작 확인

---

### 14. 선호 카테고리 수정 API
**엔드포인트**: PUT `/api/v1/avatars/preference`  
**현재 상태**: 구현되어 있을 가능성 있음  
**확인 필요**: API 명세 및 동작 확인

---

### 15. 회원 탈퇴 API
**엔드포인트**:
- GET `/api/v1/user-withdrawal/check`
- POST `/api/v1/user-withdrawal`

**현재 상태**: 구현되어 있을 가능성 있음  
**확인 필요**: API 명세 및 동작 확인

---

### 16. Push 알림 설정 API
**엔드포인트**: PUT `/api/v1/push`  
**현재 상태**: 구현되어 있을 가능성 있음  
**확인 필요**: API 명세 및 동작 확인

---

### 17. 검색 관련 API
**엔드포인트**:
- GET `/api/v1/search`
- GET `/api/v1/search-history`

**현재 상태**: 구현되어 있을 가능성 있음  
**확인 필요**: API 명세 및 동작 확인

---

## 우선순위 요약

| 우선순위 | 작업 | 예상 시간 |
|---------|------|----------|
| P1 | 공지 조회 API 구현 | 2시간 |
| P1 | 차단 해제 API 파라미터 확인 | 1시간 |
| P1 | 회차 모드 전환 API 구현 | 3시간 |
| P2 | 알림 API 경로 통일 | 1시간 |
| P2 | 스터디 멤버 목록 API | 2시간 |
| P2 | 스터디원 상세 정보 API | 3시간 |
| P2 | 스터디원 참여 상세 API | 2시간 |
| P3 | 리더 권한 위임 API | 2시간 |
| P3 | 강제 퇴출 API | 2시간 |
| P3 | 미인증자 일괄 처리 API | 2시간 |
| P3 | 스터디 규칙 API | 3시간 |
| P3 | 스터디명 변경 API | 1시간 |

**총 예상 시간**: 약 24시간

---

## 참고 정보

### Swagger 문서
http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/

### 백엔드 소스 위치
- Notice: `com.join.core.notice.controller.NoticeController`
- Block: `com.join.core.block.controller.BlockController`
- Meeting: `com.join.core.meeting.controller.MeetingController`
- Enrollment: `com.join.core.enrollment.controller.EnrollmentController`
- Study: `com.join.core.study.controller.StudyController`
