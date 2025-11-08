# JOIN 프로젝트 TODO 리스트

> 마지막 업데이트: 2025년 1월 9일

## 📋 목차
- [백엔드 작업 필요 항목](#백엔드-작업-필요-항목)
- [프론트엔드 작업 항목](#프론트엔드-작업-항목)
- [완료된 작업](#완료된-작업)

---

## 1. 백엔드 작업 필요 항목 (Backend Required)

### 1.1 출석/인증 상태 조회 API 구현 ⚠️ 긴급
**우선순위:** 🔴 HIGH  
**상태:** 백엔드 미구현 확인

**문제 상황:**
```
GET /study/{studyToken}/meetings/{meetingNo}/attendances
→ 500 Error: "Request method 'GET' is not supported"
```

**현재:**
- 백엔드에서 GET 메서드를 지원하지 않음
- 프론트엔드는 POST(생성)만 가능하고 조회 불가
- 출석/인증 상태를 실시간으로 확인할 수 없음

**필요:**
1. **출석 상태 조회 API**
   ```typescript
   // Option 1: GET 메서드 지원
   GET /study/{studyToken}/meetings/{meetingNo}/attendances
   Response: {
     hasAttendance: boolean;
     attendanceStatus: 'PRESENT' | 'LATENESS' | 'ABSENT' | null;
     attendanceTime: string | null;
   }

   // Option 2: 별도 조회 엔드포인트
   GET /study/{studyToken}/meetings/{meetingNo}/my-attendance
   Response: 동일
   ```

2. **인증 상태 조회 API**
   ```typescript
   // 현재 동작하는 API
   GET /study/{studyToken}/meetings/{meetingNo}/proofs
   Response: {
     proofStatusResponse: 'APPROVED' | 'PENDING' | 'REJECTED' | 'NONE';
     provenTime: string | null;
   }
   ✅ 이미 작동 중
   ```

**영향:**
- 사용자가 출석/인증을 완료했는지 확인 불가
- UI에 항상 "미완료", "미제출"로 표시됨
- 중복 출석/인증 방지 불가

**프론트엔드 준비 상태:**
- useAttendance Hook 구현 완료
- 상태 표시 UI 구현 완료
- 백엔드 API만 구현되면 즉시 연동 가능

---

### 1.2 출석 상태 API 응답 개선 (선택사항)
**우선순위:** � MEDIUM

#### 현재 상태
- ✅ `GET /api/v1/study/{studyToken}/meetings/{meetingNo}/attendance` - 백엔드 구현 확인 필요
- ✅ `GET /api/v1/study/{studyToken}/meetings/{meetingNo}/proofs` - 이미 구현됨

#### 개선 제안
현재 출석 API가 단순히 `hasAttendance: boolean`만 반환한다면,  
더 상세한 정보가 필요할 경우 다음 필드 추가를 고려해주세요:

**출석 API 응답 개선안:**
```json
{
  "data": {
    "hasAttendance": true,
    "attendanceTime": "2025-01-09T19:05:00",
    "status": "PRESENT",  // 추가: PRESENT, LATENESS, ABSENT
    "isLate": false       // 추가: 지각 여부
  }
}
```

---

### 1.3 평가 기능 API 확인
**우선순위:** 🟢 LOW

#### 현재 상태
```
POST /api/v1/evaluation
스터디원 평가 API - 인증 필수
```

✅ **API 구현 확인됨** - 프론트엔드에서 연동만 하면 됨

---

## 2. 프론트엔드 작업 항목 (Frontend Tasks)

### 1.3 Meetings API 데이터 반환 확인
**우선순위:** � LOW  
**위치:** Meetings API 관련

#### 현상
- 2025년 11월 9일 기준: Meetings API는 정상 작동 중
- 로그 확인 결과:
```json
"currentMeetingsData": [{
  "endTime": "18:00:00",
  "id": 1,
  "meetingNo": 1,
  "stTime": "14:00:00",
  "status": "WAITING",
  "studyDate": "2025-03-10"
}]
```

#### 결론
✅ **해결됨** - Meetings API는 정상적으로 데이터를 반환하고 있습니다.

---

### 1.4 평가 기능 API (우선순위: 낮음)
**우선순위:** 🟢 LOW  
**위치:** `app/(tabs)/(my)/manage/[token]/member-detail.tsx`

#### 필요한 API
1. **평가 제출**
   - `POST /study/{studyToken}/evaluations`
   - 별점, 코멘트 등 평가 데이터 전송

2. **평가 조회**
   - `GET /study/{studyToken}/evaluations/{avartarToken}`
   - 이미 평가한 회원인지 확인

3. **평가 통계**
   - `GET /study/{studyToken}/evaluations/stats`
   - 스터디원별 평균 평점 조회

---

## 2. 프론트엔드 작업 항목 (Frontend Tasks)

### 2.1 이미지 업로드 API 연동 ⚠️ 긴급
**우선순위:** 🔴 HIGH  
**위치:** `utils/imageUpload.ts`, `app/(tabs)/(certified)/index.tsx`

#### 백엔드 API (✅ 이미 구현됨)
```
POST /api/v1/proof/files
인증 이미지 저장 - 인증 필수
```

#### 프론트엔드 구현 필요
```typescript
// utils/imageUpload.ts
import { API } from '@/apis/axios';

export const uploadProofImage = async (image: ImagePickerResult): Promise<string> => {
  const formData = new FormData();
  formData.append('file', {
    uri: image.uri,
    type: 'image/jpeg',
    name: image.name,
  } as any);

  const response = await API.post('/proof/files', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  
  return response.data.url;
};
```

#### 사용 위치
- `app/(tabs)/(certified)/index.tsx`의 `handleProofConfirm`
- 이미지 선택 → 업로드 → URL 받기 → 인증 제출

---

### 2.2 이미지 압축 기능 구현
**우선순위:** 🟡 MEDIUM  
**위치:** `utils/imageUpload.ts`

#### 작업 내용
1. **패키지 설치**
```bash
npx expo install expo-image-manipulator
```

2. **함수 구현**
```typescript
import * as ImageManipulator from 'expo-image-manipulator';

export const compressImage = async (uri: string, quality: number = 0.7): Promise<string> => {
  const manipulatedImage = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 1024 } }], // 최대 너비 1024px
    { compress: quality, format: ImageManipulator.SaveFormat.JPEG }
  );
  return manipulatedImage.uri;
};
```

3. **사용 위치**
   - `components/molecules/ProofModal/index.tsx`
   - 이미지 선택 후 업로드 전 압축 처리

#### 예상 효과
- 업로드 속도 향상
- 서버 트래픽 감소
- 사용자 데이터 절약

---

### 2.3 평가하기 페이지 제작
**우선순위:** 🟡 MEDIUM  
**위치:** `app/(tabs)/(my)/manage/[token]/evaluation.tsx` (신규 생성)

#### 작업 내용
1. **페이지 생성**
   - 경로: `/(tabs)/(my)/manage/[token]/evaluation.tsx`
   - 파라미터: `token` (studyToken), `avartarToken`

2. **UI 구성**
   - 평가 대상자 정보 표시
   - 별점 입력 (1-5점)
   - 코멘트 입력 (선택)
   - 제출 버튼

3. **API 연동** (백엔드 API 완성 후)
   - 평가 제출 API 호출
   - 성공/실패 알림
   - 이전 페이지로 이동

#### 참고 파일
- `member-detail.tsx` - 평가하기 버튼 위치

---

### 2.4 스터디 선택 기능 구현
**우선순위:** 🟡 MEDIUM  
**위치:** `app/(tabs)/(certified)/index.tsx`

#### 현재 문제
```typescript
// 첫 번째 스터디만 자동 선택 (하드코딩)
const currentStudy = studiesData?.joinStudyInfos?.[0];
```

#### 개선 방안
1. **드롭다운 UI 추가**
   - 참여 중인 스터디 목록 표시
   - 스터디 선택 시 meetingNo 업데이트

2. **선택 상태 저장**
   - AsyncStorage에 마지막 선택 스터디 저장
   - 앱 재실행 시 복원

3. **구현 예시**
```typescript
const [selectedStudyToken, setSelectedStudyToken] = useState<string | null>(null);

useEffect(() => {
  // AsyncStorage에서 마지막 선택 불러오기
  AsyncStorage.getItem('selectedStudyToken').then(setSelectedStudyToken);
}, []);

const handleStudySelect = (token: string) => {
  setSelectedStudyToken(token);
  AsyncStorage.setItem('selectedStudyToken', token);
};
```

---

---

### 2.5 관리자 기능 UI 연동
**우선순위:** 🟡 MEDIUM  
**위치:** `app/(tabs)/(my)/manage/[token]/member-detail.tsx`

#### 작업 내용
1. **출석 수정 모달 연동**
   - 이미 UI는 구현되어 있음
   - `useUpdateAttendance` Hook 사용
   - 출석/지각/결석 선택 후 API 호출

2. **인증 승인/반려 연동**
   - `useApproveProof` Hook 사용
   - `useRejectProof` Hook 사용
   - 반려 시 사유 입력 모달 추가 고려

3. **구현 예시**
```typescript
const updateAttendance = useUpdateAttendance();

const handleUpdateAttendance = () => {
  updateAttendance.mutate({
    studyToken: token,
    meetingNo: selectedMeetingNo,
    attendanceId: selectedAttendanceId,
    data: {
      targetAvatarToken: avartarToken,
      status: selectedChip === 0 ? 'PRESENT' : selectedChip === 1 ? 'LATENESS' : 'ABSENT',
    },
  });
};
```

---

### 2.6 에러 처리 개선
**우선순위:** 🟢 LOW

#### 개선 항목
1. **네트워크 오류 재시도**
   - React Query의 retry 옵션 활용
   - 재시도 버튼 UI 추가

2. **로딩 상태 개선**
   - 스켈레톤 UI 추가
   - 더 나은 로딩 인디케이터

3. **오프라인 감지**
   - `@react-native-community/netinfo` 사용
   - 오프라인 상태 알림 표시

---

### 2.7 코드 정리 및 리팩토링
**우선순위:** 🟢 LOW

#### 작업 항목
1. **사용하지 않는 파일 삭제**
   - `app/(tabs)/(certified)/proof.tsx` - 모달로 대체됨

2. **중복 코드 제거**
   - `formatCurrentDateTime` - 공통 유틸로 이동
   - 날짜 포맷팅 함수 통일

3. **TypeScript 오류 수정**
   - strict 모드 활성화
   - any 타입 제거

4. **컴포넌트 분리**
   - `index.tsx` 파일이 너무 큼 (300+ 줄)
   - 출석 섹션, 인증 섹션 컴포넌트로 분리

---

## ✅ 완료된 작업

### 2025-01-09
- [x] 출석 모달 구현 (AttendanceModal)
- [x] 사진 인증 모달 구현 (ProofModal)
- [x] 출석 상태 조회 기능 추가
- [x] 인증 상태 조회 기능 추가
- [x] BottomSheetModalProvider 추가
- [x] Modal 스타일 통일 (ModalWrapper 패턴)
- [x] useMyPage Hook 생성
- [x] useAttendance Hook 생성
- [x] useProof Hook 생성
- [x] useMeetings Hook 생성
- [x] imageUpload 유틸 함수 생성
- [x] dateFormatter 유틸 함수 생성
- [x] API 경로 수정 (앞에 / 추가)
- [x] TODO 주석 정리 및 문서화

---

## 📊 진행 상황

### 우선순위별 통계
- 🔴 HIGH (긴급): 2개
- 🟡 MEDIUM (중요): 5개
- 🟢 LOW (낮음): 3개

### 담당별 분류
- **백엔드 필요**: 4개
- **프론트엔드 단독**: 6개
- **완료**: 15개

---

## 🎯 다음 스프린트 추천 작업

### 1주차 (긴급)
1. 🔴 백엔드: Meetings API 데이터 반환 이슈 해결
2. 🔴 백엔드: 이미지 업로드 API 구현
3. 🟡 프론트엔드: 이미지 압축 기능 구현

### 2주차 (중요)
4. 🟡 프론트엔드: 스터디 선택 기능 구현
5. 🟡 프론트엔드: 관리자 기능 UI 연동
6. 🟡 프론트엔드: 평가하기 페이지 제작

### 3주차 (개선)
7. 🟢 프론트엔드: 에러 처리 개선
8. 🟢 프론트엔드: 코드 리팩토링

---

## 📝 참고 자료

### API 문서
- Swagger: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/

### 주요 파일 위치
- 출석/인증 메인: `app/(tabs)/(certified)/index.tsx`
- 출석 모달: `components/molecules/AttendanceModal/index.tsx`
- 인증 모달: `components/molecules/ProofModal/index.tsx`
- 이미지 유틸: `utils/imageUpload.ts`
- API 서비스: `apis/service/`
- Hooks: `hooks/`

### 관련 타입 정의
- 출석: `apis/@types/attendance.ts`
- 인증: `apis/@types/proof.ts`
- 회차: `apis/@types/meetings.ts`
