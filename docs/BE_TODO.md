# 백엔드 미구현 작업 목록

> 업데이트: 2025년 1월 22일  
> 코드 근거 추가: 각 항목에 프론트엔드 TODO 주석과 Alert 메시지 포함

---

## 🔴 긴급 - 즉시 수정 필요

### 1. 공지 조회 API 미구현
**현재 상태**:
- POST `/api/v1/study/{studyToken}/notice` - ✅ 구현됨
- GET `/api/v1/study/{studyToken}/notice` - ❌ 미구현

**프론트엔드 코드 근거**:
```tsx
// components/organisms/MyPage/Manage.tsx:151
export const StudyAnnouncement = () => {
  useEffect(() => {
    Alert.alert(
      '기능 준비 중',
      '스터디 공지 조회 기능은 백엔드 API 개발 중입니다.\n\nAPI: GET /api/v1/study/{studyToken}/notice',
      [{ text: '확인' }],
    );
  }, []);
};

// app/(tabs)/(my)/manage/[token]/notice.tsx:20
useEffect(() => {
  // TODO: 백엔드 API 미구현 - GET /api/v1/study/{studyToken}/notice
  Alert.alert(
    '안내',
    '현재 공지 조회 기능은 백엔드 API 개발 대기 중입니다.',
    [{ text: '확인' }],
  );
}, []);
```

**필요 작업**:
```java
@GetMapping("/{studyToken}/notice")
public ApiResponse<NoticeResponse> getNotice(@PathVariable String studyToken) {
    // 공지 조회 로직 구현
}
```

**Response 타입**:
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
- `components/organisms/MyPage/Manage.tsx:151` - StudyAnnouncement
- `app/(tabs)/(my)/manage/[token]/notice.tsx:20`

**프론트엔드 대응**: Alert 표시 중

**예상 작업 시간**: 2시간

---

### 2. 차단 해제 API 파라미터 확인
**현재 상태**: DELETE `/api/v1/blocks/{???}` - 500 Error  
**문제**: 파라미터 타입 불명확 (blockId vs avatarToken)

**프론트엔드 코드 근거**:
```tsx
// app/(tabs)/(my)/myinfo/block-manage.tsx:38,47
try {
  // TODO: 백엔드 차단 해제 API 확인 필요
  // DELETE /api/v1/blocks/{id} 또는 DELETE /api/v1/blocks/{avatarToken}
  // 현재 엔드포인트: /api/v1/blocks/{blockId}
  await BlocksService().deleteBlock(blockId);
} catch (error) {
  // TODO: 백엔드 API 확인 필요 - DELETE /api/v1/blocks/{blockId} 파라미터 타입
  Alert.alert(
    '기능 오류',
    '차단 해제 기능에 일시적인 문제가 발생했습니다.\n\n백엔드 API 파라미터 확인이 필요합니다.\n(blockId vs avatarToken)',
  );
}

// apis/service/blocks.ts
deleteBlock: (blockId: number) => API.delete(`/blocks/${blockId}`)
```

**확인 및 수정 필요**:
```java
// 현재 (추정)
@DeleteMapping("/{blockId}")  // blockId(Long)?

// 또는
@DeleteMapping("/{avatarToken}")  // avatarToken(String)?

// 프론트엔드 코드와 일치하도록 명확히
```

**프론트엔드 현재 코드**:
```typescript
// apis/service/blocks.ts
deleteBlock: (blockId: number) => API.delete(`/blocks/${blockId}`)
```

**영향받는 화면**:
- `app/(tabs)/(my)/myinfo/block-manage.tsx:38,47`

**프론트엔드 대응**: 에러 안내 Alert 표시

**예상 작업 시간**: 1시간

---

### 3. 스터디 회차 자동/수동 생성 모드 전환 API
**현재 상태**:
- Study 엔티티: `isRegular` 필드만 존재 (정기/비정기)
- `MeetingAutoService`: 자동 생성 로직 존재
- 모드 전환 API: ❌ 미구현

**프론트엔드 코드 근거**:
```tsx
// app/(tabs)/(my)/manage/[token]/round.tsx:125
<Button
  variant="contained"
  onPress={() => {
    toggleModal();
    // TODO: 백엔드 API 미구현 - PATCH /api/v1/study/{studyToken}/meeting-mode
    Alert.alert(
      '기능 준비 중',
      '회차 자동/수동 생성 모드 전환 기능은 백엔드 API 개발 대기 중입니다.\n\n현재는 "회차 추가 및 제외" 메뉴에서 회차를 직접 추가/삭제할 수 있습니다.',
      [{ text: '확인' }],
    );
    // setAuto(false); // API 구현 후 활성화
  }}
>
  변경하기
</Button>
```

**필요 작업**:
```java
// 1. Study.java에 필드 추가
private boolean isAutoMeeting; // 회차 자동 생성 여부

// 2. StudyController.java에 엔드포인트 추가
@PatchMapping("/{studyToken}/meeting-mode")
public ApiResponse<Void> updateMeetingMode(
    @PathVariable String studyToken,
    @RequestBody MeetingModeRequest request
) {
    studyService.updateMeetingMode(studyToken, request.isAutoMeeting());
    return ApiResponse.ok();
}

// 3. Request DTO
public record MeetingModeRequest(
    @Schema(description = "회차 자동 생성 여부", example = "true")
    boolean isAutoMeeting
) {}
```

**영향받는 화면**:
- `app/(tabs)/(my)/manage/[token]/round.tsx:125`

**프론트엔드 대응**: 라디오 버튼 클릭 시 Alert 표시, 회차 추가/삭제는 정상 작동

**예상 작업 시간**: 3시간

---

## 🟡 중요 - 단기 수정 필요

### 4. 알림 API 경로 불일치
**현재 상태**:
- 다른 API: `/api/v1/...` (api.prefix 사용)
- 알림 API: `/notifications` (api.prefix 미사용)

**수정 권장**:
```java
// NotificationReadController.java
// 변경 전
@RequestMapping("/notifications")

// 변경 후 (통일 권장)
@RequestMapping("${api.prefix}/notifications")
```

**프론트엔드 대응**: 예외 처리로 정상 작동 중

**예상 작업 시간**: 0.5시간

---

### 5. 알림 조회 API - 라우팅 정보 누락
**현재 상태**: GET `/notifications` - studyToken 정보 미포함
**문제**: 알림 클릭 시 해당 스터디/인증/출석 화면으로 라우팅 불가

**백엔드 코드 근거**:
```java
// NotificationResponse.java (현재)
@Builder
public record NotificationResponse(
        Long notificationId,
        String title,
        String content,
        NotificationType type,  // STUDY_ANNOUNCEMENT, ATTENDANCE_CHECK, PROOF, OTHER
        LocalDateTime createdAt,
        boolean isRead
        // ❌ studyToken 없음 - 라우팅 불가
) {}

// Notification 엔티티에는 study 필드 존재
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "study_id", nullable = false)
private Study study;
```

**프론트엔드 코드 근거**:
```tsx
// app/(tabs)/(home)/alarm.tsx:84
const handleNotificationPress = (notification: NotificationResponse.Notification) => {
  // TODO: 알림 타입별 라우팅 처리
  // ❌ studyToken 없어서 라우팅 불가
  console.log('알림 클릭:', notification);
};
```

**필요 작업**:
```java
// NotificationResponse.java 수정
@Builder
public record NotificationResponse(
        Long notificationId,
        String title,
        String content,
        NotificationType type,
        LocalDateTime createdAt,
        boolean isRead,
        String studyToken        // ✅ 추가 필요
) {}

// NotificationTargetReaderImpl.java 수정
return NotificationResponse.builder()
        .notificationId(n.getId())
        .title(n.getTitle())
        .content(n.getContent())
        .type(n.getNotificationType())
        .createdAt(n.getCreatedDate())
        .isRead(nt.isRead())
        .studyToken(n.getStudy().getStudyToken())  // ✅ 추가
        .build();
```

**라우팅 예시** (프론트엔드):
```tsx
// 알림 타입별 라우팅
switch (notification.type) {
  case 'STUDY_ANNOUNCEMENT':
    router.push(`/study/${notification.studyToken}/notice`);
    break;
  case 'ATTENDANCE_CHECK':
    router.push(`/study/${notification.studyToken}/attendance`);
    break;
  case 'PROOF':
    router.push(`/study/${notification.studyToken}/proof`);
    break;
}
```

**영향받는 화면**:
- `app/(tabs)/(home)/alarm.tsx:84` - 알림 목록 및 클릭 처리

**프론트엔드 대응**: 라우팅 미구현, console.log만 출력 중

**예상 작업 시간**: 1시간

---

## ✅ 완료된 작업

### 6. ~~스터디 상세 조회 API - 평점 정보~~ ✅ 완료
**API**: GET `/api/v1/study/{studyToken}`  
**상태**: ✅ 완료 (2025-01-22)
- 평점 정보가 이미 API에 포함되어 있었음
- 백엔드: `StudyDetailResponse.evaluationScore` (EvaluationScore)
- 필드: `leaderScore`, `memberScore`
- 파일: 
  - `StudyReadController.java` - GET /{studyToken} 엔드포인트
  - `StudyDetailResponse.java` - evaluationScore 필드
  - `EvaluationScore.java` - leaderScore, memberScore 필드

**완료 작업**:
- ✅ 백엔드 소스 코드 직접 확인
- ✅ EvaluationScore DTO 존재 확인
- ✅ 프론트엔드 타입 업데이트 완료 (`apis/@types/study.ts`)
- ✅ 하드코딩 제거 및 실제 데이터 연동

---

## 🟡 중요 - 기능 개선 (단기)

### 6. 스터디 멤버 목록 조회 API
**필요 엔드포인트**: GET `/api/v1/study/{studyToken}/enrollments/members`

**프론트엔드 코드 근거**:
```tsx
// components/organisms/MyPage/Manage.tsx:529
// TODO: 백엔드 API 연동 필요
// API Endpoint: GET /api/v1/study/{studyToken}/enrollments/members
// Current Issue: Mock 데이터 5명 하드코딩 (김지수, 박지수, 이지수, 홍지수, 미지수)
export const StudyEvaluation = ({ studyToken }: { studyToken: string }) => {
  const { data: members, isLoading, error } = useStudyMembers(studyToken);
  // ...
}

// hooks/useStudyEnrollments.ts:9
export const useStudyMembers = (studyToken: string, enabled = true) => {
  return useQuery({
    queryKey: ['study-members', studyToken],
    queryFn: () => StudyEnrollmentsService().getStudyEnrollments(studyToken),
    // ...
  });
};

// apis/service/study-enrollments.ts
const getStudyEnrollments = async (studyToken: string) => {
  const req = (await API.get(`${url}/${studyToken}/enrollments/members`)) 
    as StudyEnrollmentsResponse.GetMembers;
  return req.data;
};
```

**실제 상황**: 프론트엔드는 이미 API 호출 코드가 구현되어 있음. 백엔드 API 구현 여부 확인 필요.

**Response 타입**:
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
- `components/organisms/MyPage/Manage.tsx:529` - StudyEvaluation (Mock 데이터 5명)

**프론트엔드 대응**: 하드코딩 (김지수, 박지수, 이지수, 홍지수, 미지수)

**예상 작업 시간**: 3시간

---

### 6. 스터디원 상세 정보 조회 API
**필요 엔드포인트**: GET `/api/v1/avatars/{avatarToken}`

**Response 타입**:
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

**프론트엔드 대응**: 닉네임, 출석률, 인증률 하드코딩

**요구사항**: 출석률/인증률 계산 로직 포함 필요

**예상 작업 시간**: 2시간

---

### 7. 스터디원 참여 상세 정보 API
**필요 엔드포인트**: GET `/api/v1/study/{studyToken}/enrollments/{targetToken}`

**Response 타입**:
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

**예상 작업 시간**: 2시간

---

## 🟢 보통 - 중기 수정 필요

### 8. 스터디명 변경 API
**필요 엔드포인트**: PATCH `/api/v1/study/{studyToken}/name`

**Request 타입**:
```typescript
{
  name: string;
}
```

**영향받는 화면**:
- `components/organisms/MyPage/Main/StudyTabs/ManageStudy.tsx:66`

**예상 작업 시간**: 1시간

---

### 9. 리더 권한 위임 API
**필요 엔드포인트**: PATCH `/api/v1/study/{studyToken}/enrollments/delegate`

**Request 타입**:
```typescript
{
  targetToken: string; // 새 리더의 avatarToken
}
```

**예상 작업 시간**: 2시간

---

### 10. 강제 퇴출 API
**필요 엔드포인트**: PATCH `/api/v1/study/{studyToken}/enrollments/forced-out`

**Request 타입**:
```typescript
{
  targetToken: string; // 퇴출 대상 avatarToken
  reason?: string; // 퇴출 사유 (선택)
}
```

**예상 작업 시간**: 2시간

---

### 11. 미인증 상태 수정 API 버그 수정 🐛
**엔드포인트**: POST `/api/v1/study/{studyToken}/meetings/{meetingNo}/proofs/uncertified`  
**파일**: `ProofMapper.java`, `Proof.java`

**문제 상황**:
```
Column 'photo_id' cannot be null
```

**원인**:
- `ProofMapper.toEntity(UpdateProofParams)` 메서드에서 `photo` 필드를 설정하지 않음
- `Proof` 엔티티의 `photo` 필드가 `@OneToOne(cascade = CascadeType.ALL)`로 설정되어 있음
- DB 스키마에서 `photo_id`가 NOT NULL 제약조건을 가지고 있을 가능성

**현재 코드** (`ProofMapper.java:42-51`):
```java
public Proof toEntity(UpdateProofParams param, Avatar avatar, Meeting meeting) {
    return Proof.builder()
            .type(ProofType.PHOTO)
            .provenDate(param.provenTime())
            .avatar(avatar)
            .meeting(meeting)
            .status(ProofStatus.APPROVED)
            .build();  // photo 필드 누락
}
```

**해결 방법 옵션**:

**옵션 1**: `photo` 필드를 nullable로 변경 (권장)
```java
// Proof.java
@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
private ProofPhoto photo;  // @NotNull 제거

// DB 마이그레이션
ALTER TABLE proof MODIFY COLUMN photo_id BIGINT NULL;
```

**옵션 2**: 더미 `ProofPhoto` 생성
```java
public Proof toEntity(UpdateProofParams param, Avatar avatar, Meeting meeting) {
    ProofPhoto dummyPhoto = ProofPhoto.builder()
            .photoUrl("MANUAL_APPROVAL")  // 관리자 수동 승인 표시
            .build();
    
    return Proof.builder()
            .type(ProofType.PHOTO)
            .provenDate(param.provenTime())
            .avatar(avatar)
            .meeting(meeting)
            .status(ProofStatus.APPROVED)
            .photo(dummyPhoto)
            .build();
}
```

**옵션 3**: 새로운 `ProofType.MANUAL` 추가
```java
public enum ProofType {
    PHOTO, TIMER, MANUAL  // 관리자 수동 승인
}

public Proof toEntity(UpdateProofParams param, Avatar avatar, Meeting meeting) {
    return Proof.builder()
            .type(ProofType.MANUAL)
            .provenDate(param.provenTime())
            .avatar(avatar)
            .meeting(meeting)
            .status(ProofStatus.APPROVED)
            .photo(null)  // MANUAL 타입은 photo 불필요
            .build();
}
```

**권장 사항**: 옵션 1 + 옵션 3 조합
- `photo` 필드를 nullable로 변경
- `ProofType.MANUAL` 추가하여 관리자 수동 승인과 일반 인증 구분
- 프론트엔드에서도 MANUAL 타입 인증은 사진 없이 표시

**예상 작업 시간**: 1시간

---

### 12. 스터디 규칙 수정 API
**필요 엔드포인트**: PUT `/api/v1/study/{studyToken}/rules`

**Request 타입**:
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

## 📊 우선순위 요약

### 🔴 긴급 (1주 내) - 7시간
1. 공지 조회 API (2시간)
2. 차단 해제 API 파라미터 (1시간)
3. 회차 모드 전환 API (3시간)
4. 미인증 상태 수정 API 버그 수정 🐛 (1시간) ⭐ 신규

### 🟡 중요 (1-2주) - 10.5시간
5. 알림 API 경로 통일 (0.5시간)
6. 알림 조회 API - studyToken 추가 (1시간)
7. 스터디 멤버 목록 API (3시간)
8. 스터디원 상세 정보 API (2시간)
9. 스터디원 참여 상세 API (2시간)

### 🟢 보통 (1개월) - 6시간
10. 스터디명 변경 API (1시간)
11. 권한 위임 API (2시간)
12. 강제 퇴출 API (2시간)
13. 스터디 규칙 수정 API (2시간)

### ⚪ 확인 필요 - TBD
14-18. 프로필, 선호도, 탈퇴, Push, 검색 API

**총 예상 시간**: 25.5시간 (확인 필요 제외)

---

## 📝 체크리스트

### 긴급
- [ ] 공지 조회 API 구현
- [ ] 차단 해제 API 파라미터 타입 확인 및 수정
- [ ] 회차 모드 전환 API 구현 (Study 엔티티 필드 추가 포함)

### 중요
- [ ] 알림 API 경로 통일
- [ ] 알림 조회 API - studyToken 추가 ⭐ 신규
- [ ] 스터디 멤버 목록 조회 API 구현
- [ ] 스터디원 상세 정보 조회 API 구현
- [ ] 스터디원 참여 상세 정보 API 구현

### 완료
- [x] 스터디 상세 - 평점 정보 추가 (2025-01-22)

### 긴급
- [ ] 공지 조회 API 구현
- [ ] 차단 해제 API 파라미터 수정
- [ ] 회차 모드 전환 API 구현
- [ ] 미인증 상태 수정 API 버그 수정 🐛

### 중요
- [ ] 알림 API 경로 통일
- [ ] 알림 조회 API - studyToken 추가
- [ ] 스터디 멤버 목록 API 구현
- [ ] 스터디원 상세 정보 API 구현
- [ ] 스터디원 참여 상세 API 구현

### 보통
- [ ] 스터디명 변경 API 구현
- [ ] 리더 권한 위임 API 구현
- [ ] 강제 퇴출 API 구현
- [ ] 스터디 규칙 수정 API 구현

### 확인 필요
- [ ] 프로필 사진 업로드 API 확인
- [ ] 선호 카테고리 수정 API 확인
- [ ] 회원 탈퇴 API 확인
- [ ] Push 알림 설정 API 확인
- [ ] 검색 관련 API 확인

---

## 🔗 참고 정보

### Swagger 문서
http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/

### 백엔드 소스 위치
- Notice: `com.join.core.notice.controller.NoticeController`
- Block: `com.join.core.block.controller.BlockController`
- Meeting: `com.join.core.meeting.controller.MeetingController`
- Enrollment: `com.join.core.enrollment.controller.EnrollmentController`
- Study: `com.join.core.study.controller.StudyController`
