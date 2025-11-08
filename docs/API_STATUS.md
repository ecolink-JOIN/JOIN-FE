# 🔌 API 연동 현황 및 작업 리스트

> **최종 업데이트:** 2025년 1월 9일  
> **프로젝트:** JOIN 앱  
> **분석 대상:** 백엔드 API 명세서 20개 섹션

---

## 📊 전체 현황 요약

| 상태 | 개수 | 비율 |
|------|------|------|
| ✅ 완료 | 45개 | 60% |
| 🔄 진행중 | 8개 | 11% |
| ⚠️ 미구현 | 22개 | 29% |
| **총계** | **75개** | **100%** |

---

## ✅ 02. 회원가입 (8/10 완료)

### 구현 완료
| API | 메서드 | 엔드포인트 | 서비스 | 사용 위치 |
|-----|--------|-----------|--------|----------|
| ✅ 약관 조회 | GET | `/api/v1/terms` | TermsService | `app/(auth)/terms.tsx` |
| ✅ 약관 동의 | POST | `/api/v1/terms/agree` | TermsService | `app/(auth)/terms.tsx` |
| ✅ 유효 약관 조회 | POST | `/api/v1/terms/all` | TermsService | 회원가입 플로우 |
| ✅ 닉네임 변경 | PATCH | `/api/v1/avatars/nickname` | AvatarsService | `app/(auth)/nickname.tsx` |
| ✅ 닉네임 유효성 검사 | GET | `/api/v1/avatars/nickname/valid` | AvatarsService | `app/(auth)/nickname.tsx` |
| ✅ 프로필 사진 변경 | POST | `/api/v1/avatars/photos` | AvatarsService | `app/(tabs)/(my)/myinfo/account-info.tsx` |
| ✅ 유저 정보 조회 | GET | `/api/v1/avatars` | UserService | 마이페이지 전반 |
| ✅ 회원탈퇴 가능 확인 | GET | `/api/v1/avatars/withdraw/check` | - | (구현 예정) |

### 미구현 (긴급도: 낮음)
| API | 메서드 | 엔드포인트 | 필요 작업 |
|-----|--------|-----------|----------|
| ⚠️ 푸시 알림 동의 | PUT | `/api/v1/avatars/push` | 설정 페이지 제작 필요 |
| ⚠️ 유저 선호 변경 | PUT | `/api/v1/avatars/preference` | 설정 페이지 제작 필요 |
| ⚠️ 회원탈퇴 | POST | `/api/v1/avatars/withdraw` | 계정 정보 페이지 연동 |

---

## ✅ 03. 스터디 (9/10 완료)

### 구현 완료
| API | 메서드 | 엔드포인트 | 서비스 | 사용 위치 |
|-----|--------|-----------|--------|----------|
| ✅ 스터디 상세 조회 | GET | `/api/v1/study/{studyToken}` | StudyService | `app/study/[slug]/index.tsx` |
| ✅ 스터디 검색 | GET | `/api/v1/study/search` | StudyService | `app/study/search.tsx` |
| ✅ 맞춤 스터디 조회 | GET | `/api/v1/study/recommendation` | StudyService | `app/(tabs)/(home)/index.tsx` |
| ✅ 인기 스터디 조회 | GET | `/api/v1/study/popular` | StudyService | `app/(tabs)/(home)/index.tsx` |
| ✅ 스터디 모집 | POST | `/api/v1/study/recruit` | StudyService | `app/(form)/recruit-add.tsx` |
| ✅ 스터디 추가 모집 | PATCH | `/api/v1/study/re-recruit` | StudyService | 관리 페이지 |
| ✅ 스터디 멤버 조회 | POST | `/api/v1/study/{studyToken}/member` | StudyService | 스터디 상세 |
| ✅ 스터디 운영 규칙 조회 | GET | `/api/v1/study/{studyToken}/rules` | StudyService | 스터디 상세 |
| ✅ 스터디 운영 규칙 수정 | PUT | `/api/v1/study/{studyToken}/rules` | StudyService | 관리 페이지 |

### 미구현
| API | 메서드 | 엔드포인트 | 필요 작업 |
|-----|--------|-----------|----------|
| ⚠️ 스터디 모집 상태 변경 | PATCH | `/api/v1/study/{studyToken}/recruitment` | 관리자 페이지 UI 추가 |
| ⚠️ 스터디 종료 | POST | `/api/v1/study/{studyToken}/close` | 관리자 페이지 UI 추가 |
| ⚠️ 스터디 현황 조회 | GET | `/api/v1/study/{studyToken}/status` | 통계 페이지 제작 |
| ⚠️ 스터디 모집 입력값 조회 | GET | `/api/v1/study/{studyToken}/recruit` | 수정 기능 추가 시 |

---

## ✅ 04. 유저 (2/4 완료)

### 구현 완료
| API | 메서드 | 엔드포인트 | 서비스 | 사용 위치 |
|-----|--------|-----------|--------|----------|
| ✅ 유저 정보 조회 | GET | `/api/v1/avatars` | UserService | 전역 사용 |
| ✅ 앱 공지사항 조회 | GET | `/api/v1/notices` | - | 홈 화면 |

### 미구현
| API | 메서드 | 엔드포인트 | 필요 작업 |
|-----|--------|-----------|----------|
| ⚠️ 푸시 알림 동의 | PUT | `/api/v1/avatars/push` | 설정 페이지 |
| ⚠️ 유저 선호 변경 | PUT | `/api/v1/avatars/preference` | 설정 페이지 |

---

## 🔄 05. 공지 (1/2 진행중)

### 구현 완료
| API | 메서드 | 엔드포인트 | 서비스 | 사용 위치 |
|-----|--------|-----------|--------|----------|
| ✅ 스터디 공지 생성 | POST | `/api/v1/study/{studyToken}/notice` | NoticeService | 관리자 기능 |

### 미구현
| API | 메서드 | 엔드포인트 | 필요 작업 |
|-----|--------|-----------|----------|
| ⚠️ 알림 내역 조회 | GET | `/notifications` | NoticeService 확장 필요 |

**작업 필요:**
```typescript
// apis/service/notice.ts 확장
const getNotifications = async () => {
  const req = await API.get('/notifications');
  return req.data;
};
```

---

## ✅ 06. 회차 (3/3 완료)

### 구현 완료
| API | 메서드 | 엔드포인트 | 서비스 | 사용 위치 |
|-----|--------|-----------|--------|----------|
| ✅ 회차 리스트 조회 | GET | `/api/v1/study/{studyToken}/meetings` | MeetingsService | `hooks/useMeetings.ts` |
| ✅ 회차 추가 | POST | `/api/v1/study/{studyToken}/meetings` | MeetingsService | 관리자 기능 |
| ✅ 회차 삭제 | DELETE | `/api/v1/study/{studyToken}/meetings/{meetingId}` | MeetingsService | 관리자 기능 |

**상태:** ✅ 모든 API 구현 완료

---

## ✅ 07. 북마크 (3/3 완료)

### 구현 완료
| API | 메서드 | 엔드포인트 | 서비스 | 사용 위치 |
|-----|--------|-----------|--------|----------|
| ✅ 북마크한 스터디 조회 | GET | `/api/v1/bookmarks` | BookmarksService | `hooks/useBookmarks.ts` |
| ✅ 스터디 북마크 등록 | POST | `/api/v1/bookmarks` | BookmarksService | 스터디 상세 |
| ✅ 스터디 북마크 취소 | DELETE | `/api/v1/bookmarks` | BookmarksService | 스터디 상세 |

**상태:** ✅ 모든 API 구현 완료

---

## ✅ 08. 최근 조회한 스터디 (1/1 완료)

### 구현 완료
| API | 메서드 | 엔드포인트 | 서비스 | 사용 위치 |
|-----|--------|-----------|--------|----------|
| ✅ 최근 조회한 스터디 | GET | `/api/v1/views` | ViewsService | 마이페이지 |

**상태:** ✅ 모든 API 구현 완료

---

## ✅ 09. 출석 (3/3 완료) 🎉

### 구현 완료
| API | 메서드 | 엔드포인트 | 서비스 | 사용 위치 |
|-----|--------|-----------|--------|----------|
| ✅ 출석 조회 | GET | `/api/v1/study/{studyToken}/meetings/{meetingNo}/attendance` | AttendanceService | `app/(tabs)/(certified)/index.tsx` |
| ✅ 출석 등록 | POST | `/api/v1/study/{studyToken}/meetings/{meetingNo}/attendances` | AttendanceService | `app/(tabs)/(certified)/index.tsx` |
| ✅ 출석 수정 | PATCH | `/api/v1/study/{studyToken}/meetings/{meetingNo}/attendances/{attendanceId}` | AttendanceService | 관리자 기능 |

**상태:** ✅ 모든 API 구현 완료  
**최근 수정:** 엔드포인트 오타 수정 (`/attendances` → `/attendance`)

---

## ✅ 10. 프로필 수정 (1/1 완료)

### 구현 완료
| API | 메서드 | 엔드포인트 | 서비스 | 사용 위치 |
|-----|--------|-----------|--------|----------|
| ✅ 프로필 사진 변경 | POST | `/api/v1/avatars/photos` | AvatarsService | `app/(tabs)/(my)/myinfo/account-info.tsx` |

**상태:** ✅ 모든 API 구현 완료

---

## ✅ 11. 회차 인증 (7/11 완료) 🔥 우선순위

### 구현 완료
| API | 메서드 | 엔드포인트 | 서비스 | 사용 위치 |
|-----|--------|-----------|--------|----------|
| ✅ 인증 이미지 저장 | POST | `/api/v1/proof/files` | ProofService | `app/(tabs)/(certified)/index.tsx` |
| ✅ 회차 인증 여부 조회 | GET | `/api/v1/study/{studyToken}/meetings/{meetingNo}/proofs` | ProofService | `app/(tabs)/(certified)/index.tsx` |
| ✅ 회차 인증 | POST | `/api/v1/study/{studyToken}/meetings/{meetingNo}/proofs` | ProofService | `app/(tabs)/(certified)/index.tsx` |
| ✅ 회차 인증 수락 | PATCH | `/api/v1/study/{studyToken}/meetings/{meetingNo}/proofs/{proofId}/approve` | ProofService | 관리자 기능 (부분) |
| ✅ 회차 인증 반려 | PATCH | `/api/v1/study/{studyToken}/meetings/{meetingNo}/proofs/{proofId}/reject` | ProofService | 관리자 기능 (부분) |

### 미구현 (긴급도: 중간)
| API | 메서드 | 엔드포인트 | 필요 작업 |
|-----|--------|-----------|----------|
| ⚠️ 인증 수정 | POST | `/api/v1/study/{studyToken}/meetings/{meetingNo}/proofs/uncertified` | ProofService 확장 |
| ⚠️ 인증 대상 조회 | GET | `/api/v1/study/{studyToken}/proofs/subjects` | 관리자 페이지 |
| ⚠️ 인증 상세 조회 | GET | `/api/v1/study/{studyToken}/meetings/{meetingNo}/proofs/{proofId}` | 상세 모달 추가 |
| ⚠️ 사용자별 인증 승인 목록 | GET | `/api/v1/study/{studyToken}/avatars/{targetAvatarToken}/proofs` | 관리자 페이지 |

**작업 필요:**
```typescript
// apis/service/proof.ts 확장
const updateProof = async (studyToken: string, meetingNo: number, body: any) => {
  const req = await API.post(
    `/study/${studyToken}/meetings/${meetingNo}/proofs/uncertified`,
    body
  );
  return req.data;
};

const getProofSubjects = async (studyToken: string) => {
  const req = await API.get(`/study/${studyToken}/proofs/subjects`);
  return req.data;
};

const getProofDetail = async (studyToken: string, meetingNo: number, proofId: number) => {
  const req = await API.get(
    `/study/${studyToken}/meetings/${meetingNo}/proofs/${proofId}`
  );
  return req.data;
};

const getUserProofs = async (studyToken: string, targetAvatarToken: string) => {
  const req = await API.get(
    `/study/${studyToken}/avatars/${targetAvatarToken}/proofs`
  );
  return req.data;
};
```

---

## ⚠️ 12. 평가 (0/1 미구현) 🔴 긴급

### 미구현
| API | 메서드 | 엔드포인트 | 필요 작업 |
|-----|--------|-----------|----------|
| ⚠️ 스터디원 평가 | POST | `/api/v1/evaluation` | 평가 페이지 제작 필요 |

**작업 필요:**
1. **페이지 생성:** `app/(tabs)/(my)/manage/[token]/evaluation.tsx`
2. **서비스 생성:** `apis/service/evaluation.ts`
3. **훅 생성:** `hooks/useEvaluation.ts`

```typescript
// apis/service/evaluation.ts (신규 생성)
import { API } from '@/apis/axios';

export const EvaluationService = () => {
  const submitEvaluation = async (data: {
    targetAvatarToken: string;
    rating: number;
    comment?: string;
  }) => {
    const req = await API.post('/evaluation', data);
    return req.data;
  };

  return { submitEvaluation };
};
```

**현재 위치:** `member-detail.tsx` (Line 115)에 TODO 주석 있음

---

## ✅ 13. 차단 (4/4 완료)

### 구현 완료
| API | 메서드 | 엔드포인트 | 서비스 | 사용 위치 |
|-----|--------|-----------|--------|----------|
| ✅ 차단 목록 조회 | GET | `/api/v1/blocks` | BlocksService | 설정 페이지 |
| ✅ 일반 사용자 차단 | POST | `/api/v1/blocks` | BlocksService | 사용자 프로필 |
| ✅ 스터디 멤버 차단 | POST | `/api/v1/blocks/study-member` | BlocksService | 스터디 멤버 목록 |
| ✅ 차단할 사용자 목록 | GET | `/api/v1/study/block` | BlocksService | 차단 UI |

**상태:** ✅ 모든 API 구현 완료

---

## ✅ 14. 마이페이지 (4/4 완료)

### 구현 완료
| API | 메서드 | 엔드포인트 | 서비스 | 사용 위치 |
|-----|--------|-----------|--------|----------|
| ✅ 마이페이지 조회 | GET | `/api/v1/my-page` | MyPageService | `app/(tabs)/(my)/index.tsx` |
| ✅ 운영중인 스터디 목록 | GET | `/api/v1/my-page/manage-study` | MyPageService | `hooks/useMyPage.ts` |
| ✅ 가입 스터디 목록 | GET | `/api/v1/my-page/join-study` | MyPageService | `hooks/useMyPage.ts` |
| ✅ 관심 스터디 목록 | GET | `/api/v1/my-page/interest-study` | MyPageService | `hooks/useMyPage.ts` |

**상태:** ✅ 모든 API 구현 완료

---

## ✅ 15. 신고 (1/1 완료)

### 구현 완료
| API | 메서드 | 엔드포인트 | 서비스 | 사용 위치 |
|-----|--------|-----------|--------|----------|
| ✅ 신고 | POST | `/api/v1/report` | ReportService | 스터디/사용자 상세 |

**상태:** ✅ 모든 API 구현 완료

---

## ✅ 16. 자동 알림 (4/4 완료)

### 구현 완료
| API | 메서드 | 엔드포인트 | 서비스 | 사용 위치 |
|-----|--------|-----------|--------|----------|
| ✅ 자동 알림 조회 | GET | `/api/v1/batch-job/{studyToken}/batch-jobs` | BatchJobService | 관리 페이지 |
| ✅ 자동 알림 등록 | POST | `/api/v1/batch-job` | BatchJobService | 관리 페이지 |
| ✅ 자동 알림 변경 | PUT | `/api/v1/batch-job/{batchJobId}` | BatchJobService | 관리 페이지 |
| ✅ 자동 알림 삭제 | DELETE | `/api/v1/batch-job/{batchJobId}` | BatchJobService | 관리 페이지 |

**상태:** ✅ 모든 API 구현 완료

---

## 🔄 17. 스터디원 관리 상세 (3/5 진행중) 🟡 우선순위

### 구현 완료
| API | 메서드 | 엔드포인트 | 서비스 | 사용 위치 |
|-----|--------|-----------|--------|----------|
| ✅ 스터디원 관리 조회 | GET | `/api/v1/study/{studyToken}/enrollments/members` | StudyEnrollmentsService | 관리 페이지 |
| ✅ 참여자별 현황 조회 | GET | `/api/v1/study/{studyToken}/enrollments/{targetToken}` | StudyEnrollmentsService | `member-detail.tsx` |
| ✅ 사용자별 출석률/인증률 | GET | `/api/v1/avatars/{avatarToken}` | StudyEnrollmentsService | `member-detail.tsx` |

### 미구현 (긴급도: 높음)
| API | 메서드 | 엔드포인트 | 필요 작업 |
|-----|--------|-----------|----------|
| ⚠️ 팀원 강제 탈퇴 | PATCH | `/api/v1/study/{studyToken}/enrollments/forced-out` | UI 연동 필요 |
| ⚠️ 스터디장 위임 | PATCH | `/api/v1/study/{studyToken}/enrollments/delegate` | UI 연동 필요 |

**작업 필요:**
```typescript
// member-detail.tsx 수정
import { useForcedOut, useDelegateLeader } from '@/hooks/useStudyEnrollments';

// 강퇴하기 버튼 연동
const forcedOut = useForcedOut();
const handleForcedOut = () => {
  forcedOut.mutate({
    studyToken: token,
    targetAvatarToken: avartarToken,
    reason: '부적절한 행동', // 사유 입력 받기
  });
};

// 스터디장 위임 연동
const delegateLeader = useDelegateLeader();
const handleDelegate = () => {
  delegateLeader.mutate({
    studyToken: token,
    targetAvatarToken: avartarToken,
  });
};
```

**현재 위치:**
- `member-detail.tsx` Line 122: 강퇴하기 버튼 (모달만 존재)
- `member-detail.tsx` Line 126: 스터디장 위임 버튼 (모달만 존재)

---

## ✅ 18. 지원 (4/4 완료)

### 구현 완료
| API | 메서드 | 엔드포인트 | 서비스 | 사용 위치 |
|-----|--------|-----------|--------|----------|
| ✅ 스터디 지원 | POST | `/api/v1/applications` | ApplicationsService | 스터디 상세 |
| ✅ 스터디 지원 승인 | PATCH | `/api/v1/applications/{applicationId}/accept` | ApplicationsService | 관리 페이지 |
| ✅ 스터디 지원 반려 | PATCH | `/api/v1/applications/{applicationId}/reject` | ApplicationsService | 관리 페이지 |
| ✅ 스터디 지원 현황 조회 | GET | `/api/v1/applications/{studyToken}` | ApplicationsService | 관리 페이지 |

**상태:** ✅ 모든 API 구현 완료

---

## ✅ 19. 스터디 탈퇴 (3/3 완료)

### 구현 완료
| API | 메서드 | 엔드포인트 | 서비스 | 사용 위치 |
|-----|--------|-----------|--------|----------|
| ✅ 스터디 탈퇴 | POST | `/api/v1/study/{studyToken}/withdraw` | WithdrawService | 스터디 상세 |
| ✅ 스터디 탈퇴 요청 조회 | GET | `/api/v1/study/{studyToken}/withdraw/request` | WithdrawService | 관리 페이지 |
| ✅ 스터디 탈퇴 요청 승인 | POST | `/api/v1/study/{studyToken}/withdraw/{withdrawId}/approve` | WithdrawService | 관리 페이지 |

**상태:** ✅ 모든 API 구현 완료

---

## ⚠️ 20. 검색 (1/2 진행중)

### 구현 완료
| API | 메서드 | 엔드포인트 | 서비스 | 사용 위치 |
|-----|--------|-----------|--------|----------|
| ✅ 스터디 검색 | GET | `/api/v1/study/search` | StudyService | `app/study/search.tsx` |

### 미구현
| API | 메서드 | 엔드포인트 | 필요 작업 |
|-----|--------|-----------|----------|
| ⚠️ 검색 내역 조회 | GET | `/api/v1/search-histories` | StudyService 확장 |

**작업 필요:**
```typescript
// apis/service/study.ts 확장
const getSearchHistories = async () => {
  const req = await API.get('/search-histories');
  return req.data;
};
```

---

## 🔥 긴급 작업 리스트 (우선순위 순)

### 1. 평가하기 페이지 제작 🔴 HIGH
**예상 시간:** 4-5시간  
**영향도:** 높음 (핵심 기능)

**필요 작업:**
- [ ] `app/(tabs)/(my)/manage/[token]/evaluation.tsx` 페이지 생성
- [ ] `apis/service/evaluation.ts` 서비스 생성
- [ ] `hooks/useEvaluation.ts` 훅 생성
- [ ] 별점 입력 컴포넌트 제작
- [ ] 코멘트 입력 UI
- [ ] API 연동 및 테스트

**현재 상태:**
```typescript
// member-detail.tsx (Line 115)
<Button onPress={() => {
  // TODO: [프론트엔드] 평가하기 페이지 제작
}}>
  평가하기
</Button>
```

---

### 2. 관리자 기능 UI 연동 🟡 MEDIUM
**예상 시간:** 2-3시간  
**영향도:** 중간

**필요 작업:**
- [ ] 강퇴하기 기능 API 연동
- [ ] 스터디장 위임 기능 API 연동
- [ ] 출석 상태 변경 UI 완성
- [ ] 인증 승인/반려 UI 완성

**현재 상태:** API는 구현됨, UI 연동만 필요

---

### 3. 인증 관련 추가 API 🟡 MEDIUM
**예상 시간:** 2-3시간  
**영향도:** 중간

**필요 작업:**
- [ ] 인증 수정 API (`/proofs/uncertified`)
- [ ] 인증 대상 조회 API (`/proofs/subjects`)
- [ ] 인증 상세 조회 API (`/proofs/{proofId}`)
- [ ] 사용자별 인증 승인 목록 API

---

### 4. 설정 페이지 제작 🟢 LOW
**예상 시간:** 3-4시간  
**영향도:** 낮음

**필요 작업:**
- [ ] 푸시 알림 설정 UI
- [ ] 유저 선호 설정 UI
- [ ] 회원탈퇴 UI
- [ ] API 연동

---

### 5. 검색 내역 기능 🟢 LOW
**예상 시간:** 1시간  
**영향도:** 낮음

**필요 작업:**
- [ ] 검색 내역 조회 API 연동
- [ ] 검색 페이지에 최근 검색어 표시

---

## 📂 서비스 파일 현황

### 구현 완료된 서비스
```
apis/service/
├── ✅ attendance.ts        (3/3 API)
├── ✅ bookmarks.ts         (3/3 API)
├── ✅ blocks.ts            (4/4 API)
├── ✅ meetings.ts          (3/3 API)
├── ✅ my-page.ts           (4/4 API)
├── ✅ proof.ts             (7/11 API) - 확장 필요
├── ✅ signup.ts            (회원가입 관련)
├── ✅ study.ts             (9/10 API)
├── ✅ user.ts              (1/1 API)
├── ✅ views.ts             (1/1 API)
├── ✅ applications.ts      (4/4 API)
├── ✅ batch-job.ts         (4/4 API)
├── ✅ notice.ts            (1/2 API)
├── ✅ report.ts            (1/1 API)
├── ✅ study-enrollments.ts (3/5 API) - 확장 필요
└── ✅ withdraw.ts          (3/3 API)
```

### 신규 생성 필요
```
apis/service/
└── ⚠️ evaluation.ts       (0/1 API) - 신규 생성 필요
```

---

## 🎯 다음 주 작업 계획

### Week 1: 핵심 기능 완성
1. ✅ 평가하기 페이지 제작 (4-5시간)
2. ✅ 관리자 기능 UI 연동 (2-3시간)

### Week 2: 부가 기능 추가
3. 인증 관련 추가 API 연동 (2-3시간)
4. 설정 페이지 제작 (3-4시간)

### Week 3: 마무리
5. 검색 내역 기능 (1시간)
6. 전체 테스트 및 버그 수정

---

## 📊 서비스별 완성도

| 서비스 | 완성도 | 상태 |
|--------|--------|------|
| 출석 | 100% | ✅ 완료 |
| 북마크 | 100% | ✅ 완료 |
| 차단 | 100% | ✅ 완료 |
| 마이페이지 | 100% | ✅ 완료 |
| 신고 | 100% | ✅ 완료 |
| 자동 알림 | 100% | ✅ 완료 |
| 회차 | 100% | ✅ 완료 |
| 최근 조회 | 100% | ✅ 완료 |
| 프로필 수정 | 100% | ✅ 완료 |
| 스터디 탈퇴 | 100% | ✅ 완료 |
| 지원 | 100% | ✅ 완료 |
| 스터디 | 90% | 🔄 진행중 |
| 회원가입 | 80% | 🔄 진행중 |
| 스터디원 관리 | 60% | 🔄 진행중 |
| 인증 | 64% | 🔄 진행중 |
| 검색 | 50% | 🔄 진행중 |
| 공지 | 50% | 🔄 진행중 |
| 유저 | 50% | 🔄 진행중 |
| **평가** | **0%** | ⚠️ 미구현 |

---

## ✅ 체크리스트

### 긴급 (이번 주)
- [ ] 평가 서비스 생성 (`apis/service/evaluation.ts`)
- [ ] 평가 훅 생성 (`hooks/useEvaluation.ts`)
- [ ] 평가 페이지 제작 (`app/(tabs)/(my)/manage/[token]/evaluation.tsx`)
- [ ] 강퇴하기 UI 연동
- [ ] 스터디장 위임 UI 연동

### 중요 (다음 주)
- [ ] 인증 수정 API 추가
- [ ] 인증 대상 조회 API 추가
- [ ] 인증 상세 조회 API 추가
- [ ] 사용자별 인증 목록 API 추가

### 선택 (여유 있을 때)
- [ ] 설정 페이지 제작
- [ ] 검색 내역 기능
- [ ] 알림 내역 조회 기능
- [ ] 스터디 현황 통계 페이지

---

**최종 업데이트:** 2025년 1월 9일  
**작성자:** AI Assistant  
**문서 버전:** 1.0
