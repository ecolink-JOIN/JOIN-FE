# 📋 다음 작업 리스트

> **업데이트:** 2025년 1월 9일  
> **현재 완료율:** 74% (62/84 API)

---

## 🔥 우선순위 P1 - 즉시 작업 (1-2일)

### 1. ⚠️ 스터디 종료 기능 UI 연동
- **파일**: `app/(tabs)/(my)/manage/[token]/progress.tsx`
- **API**: `POST /api/v1/study/{studyToken}/close` (코드 작성됨, StudyService.closeStudy)
- **현재 상태**: 
  - 종료 모달 UI 존재
  - API 서비스 함수 구현 완료
  - 버튼 클릭 시 API 호출만 연결하면 됨
- **예상 시간**: 1시간
- **작업 내용**:
  1. `handleCloseStudy` 함수 구현
  2. 종료 확인 후 StudyService().closeStudy(token) 호출
  3. 성공 시 Alert + 마이페이지로 이동
  4. 실패 시 에러 처리

```typescript
// 필요한 코드
const handleCloseStudy = async () => {
  try {
    await StudyService().closeStudy(token);
    Alert.alert('스터디 종료', '스터디가 종료되었습니다.', [
      {
        text: '확인',
        onPress: () => router.push('/(tabs)/(my)'),
      },
    ]);
  } catch (error) {
    Alert.alert('오류', '스터디 종료에 실패했습니다.');
  } finally {
    toggleModal();
  }
};
```

---

### 2. ✅ 모집 상태 변경 토글 (이미 구현됨)
- **파일**: `app/(tabs)/(my)/manage/[token]/progress-recruiting.tsx`
- **API**: `PATCH /api/v1/study/{studyToken}/recruitment`
- **현재 상태**: ✅ 완전 구현됨
  - StudyService.toggleRecruitStatus() 사용 중
  - "스터디 시작하기" 버튼에서 호출
  - 모달 UI 및 에러 처리 완료
- **추가 작업 불필요**

---

## 🟡 우선순위 P2 - 중요 작업 (3-5일)

### 3. ⚠️ 스터디 현황 조회 기능
- **파일**: 신규 또는 `app/(tabs)/(my)/manage/[token]/progress.tsx` 확장
- **API**: `GET /api/v1/study/{studyToken}/status`
- **예상 시간**: 2-3시간
- **작업 내용**:
  1. StudyService에 getStudyStatus 함수 추가
  2. 타입 정의 (StudyResponse.StudyStatus)
  3. 진행 현황 섹션에 통계 데이터 표시
  4. 출석률, 인증률, 회차 진행률 등 시각화

---

### 4. ⚠️ 검색 내역 기능 추가
- **파일**: `app/study/search.tsx`
- **API**: `GET /api/v1/search-histories` (백엔드 확인 필요)
- **예상 시간**: 2-3시간
- **현재 상태**: 
  - 로컬 AsyncStorage 사용 중
  - 서버 기반 검색 내역으로 변경 필요
- **작업 내용**:
  1. 백엔드 API 엔드포인트 확인
  2. StudyService에 검색 내역 관련 함수 추가
  3. UI 업데이트 (서버에서 불러오기)
  4. 검색 내역 삭제 기능 구현

---

### 5. ⚠️ 스터디 모집 입력값 조회 (수정 기능용)
- **파일**: `app/(form)/recruit-add.tsx` 확장
- **API**: `GET /api/v1/study/{studyToken}/recruit`
- **예상 시간**: 2시간
- **작업 내용**:
  1. StudyService에 getRecruitInfo 함수 추가
  2. 수정 모드 판별 로직 (studyToken 존재 여부)
  3. 기존 데이터 불러와서 폼에 채우기
  4. 저장 시 POST/PATCH 분기 처리

---

## 🟢 우선순위 P3 - 개선 작업 (1주일+)

### 6. ⚠️ 스터디원 조회 API 명세 확인 및 수정
- **파일**: `apis/service/study.ts`
- **현재 상태**: 
  - getMember 함수 존재하지만 백엔드 명세와 불일치 가능성
  - `POST /api/v1/study/{studyToken}/member` (명세)
- **예상 시간**: 1시간
- **작업 내용**:
  1. 백엔드 API 명세 확인
  2. 현재 getMember와 비교
  3. 불일치 시 수정 또는 새 함수 추가

---

### 7. 📱 UI/UX 개선 작업
- **예상 시간**: 지속적
- **작업 내용**:
  - 로딩 상태 개선 (스켈레톤 UI)
  - 에러 핸들링 강화
  - 애니메이션 추가
  - 접근성 개선

---

## 📊 작업 우선순위 요약

| 순위 | 작업 | 예상 시간 | 난이도 | 중요도 |
|------|------|----------|--------|--------|
| **P1-1** | 스터디 종료 UI 연동 | 1시간 | ⭐ 쉬움 | 🔥 높음 |
| **P1-2** | 모집 상태 변경 | 완료 ✅ | - | - |
| **P2-1** | 스터디 현황 조회 | 2-3시간 | ⭐⭐ 보통 | 🔥 높음 |
| **P2-2** | 검색 내역 기능 | 2-3시간 | ⭐⭐ 보통 | 🟡 중간 |
| **P2-3** | 모집글 수정 기능 | 2시간 | ⭐⭐ 보통 | 🟡 중간 |
| **P3-1** | 스터디원 조회 확인 | 1시간 | ⭐ 쉬움 | 🟢 낮음 |
| **P3-2** | UI/UX 개선 | 지속적 | ⭐⭐⭐ 어려움 | 🟢 낮음 |

---

## 🎯 권장 작업 순서

### 이번 주 목표
1. **스터디 종료 UI 연동** (즉시 - 1시간)
2. **스터디 현황 조회** (오늘 - 2-3시간)

### 다음 주 목표
3. **검색 내역 기능** (백엔드 확인 필요)
4. **모집글 수정 기능**
5. **스터디원 조회 API 확인**

---

## 📝 백엔드 확인 필요 사항

1. **검색 내역 API 존재 여부**
   - 엔드포인트: `/api/v1/search-histories` (추정)
   - 존재하지 않으면 백엔드에 요청 필요

2. **스터디원 조회 API 명세 확인**
   - 현재 구현과 Swagger 명세 일치 여부
   - POST vs GET 메서드 확인

3. **스터디 상태 변경 관련**
   - delegateStudy 버그 수정 여부 확인

---

## 🔄 완료된 작업 (2025-01-09)

- ✅ 회원 탈퇴 기능 연동
- ✅ 앱 공지사항 조회 기능
- ✅ 설정 페이지 UI 연동 (푸시 알림)
- ✅ 선호 설정 페이지 UI 개선 (완전 재구성)
- ✅ 모집 상태 변경 토글 (이미 구현되어 있었음)

---

## 📈 완료 후 예상 진행률

| 작업 완료 시점 | API 완료 개수 | 완료율 |
|---------------|--------------|--------|
| 현재 | 62/84 | 74% |
| P1 완료 후 | 63/84 | 75% |
| P2 완료 후 | 66/84 | 79% |
| 전체 완료 후 | 84/84 | 100% 🎉 |
