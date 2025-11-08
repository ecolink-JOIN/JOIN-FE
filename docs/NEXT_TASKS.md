# 🚀 다음 개발 작업 리스트

> **최종 업데이트:** 2025년 1월 9일  
> **현재 브랜치:** `70-feat-스터디-관리---진행-중`

---

## ✅ 방금 완료된 작업
- ✅ 출석 상태 조회 API 엔드포인트 오타 수정 (`/attendances` → `/attendance`)
- ✅ 출석/인증 상태 실시간 표시 기능 활성화
- ✅ 이미지 업로드 API 연동 (`ProofService.uploadProofImage`)
- ✅ FormData를 사용한 multipart/form-data 업로드 구현

---

## 🔴 긴급 작업 (오늘~내일)

### 1. 이미지 업로드 테스트 및 디버깅
**우선순위:** 🔴 CRITICAL  
**예상 시간:** 1-2시간  
**상태:** 구현 완료, 테스트 필요

#### 테스트 항목
- [ ] **갤러리에서 이미지 선택 → 업로드 → 인증 제출** (전체 플로우)
- [ ] **카메라로 사진 촬영 → 업로드 → 인증 제출** (전체 플로우)
- [ ] 업로드 실패 시 에러 메시지 확인
- [ ] 네트워크 타임아웃 처리
- [ ] 대용량 이미지 (5MB+) 업로드 테스트
- [ ] 로딩 상태 UI 확인

#### 예상 문제 및 해결 방안
```typescript
// 문제 1: 업로드 중 로딩 표시 없음
// 해결: Alert.alert 또는 ActivityIndicator 추가

// 문제 2: 대용량 이미지 타임아웃
// 해결: 이미지 압축 기능 추가 (다음 작업)

// 문제 3: FormData 타입 에러
// 해결: 'form-data' 패키지 사용, as any 타입 캐스팅
```

#### 디버깅 팁
```bash
# Metro 로그 확인
npm start

# 에러 발생 시 재시작
Ctrl+C → npm start

# 캐시 클리어 후 재시작
npm start -- --reset-cache
```

---

## 🟡 중요 작업 (이번 주)

### 2. 이미지 압축 기능 구현
**우선순위:** 🟡 HIGH  
**예상 시간:** 1-2시간  
**효과:** 업로드 속도 60-80% 향상

#### 필요한 이유
- 모바일 사진은 보통 3-5MB (너무 큼)
- 업로드 시간 단축 (3G/4G 환경)
- 서버 트래픽 및 저장 공간 절약
- 사용자 데이터 요금 절약

#### 구현 단계

**1단계: 패키지 설치**
```bash
npx expo install expo-image-manipulator
```

**2단계: 압축 함수 구현**
```typescript
// utils/imageUpload.ts
import * as ImageManipulator from 'expo-image-manipulator';

export const compressImage = async (
  uri: string, 
  quality: number = 0.7
): Promise<string> => {
  const manipulatedImage = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 1024 } }], // 너비를 1024px로 제한
    { 
      compress: quality, // 0.7 = 70% 품질
      format: ImageManipulator.SaveFormat.JPEG 
    }
  );
  
  return manipulatedImage.uri;
};
```

**3단계: 적용**
```typescript
// app/(tabs)/(certified)/index.tsx
const handleProofConfirm = async (imageUri: string) => {
  try {
    // 이미지 압축
    const compressedUri = await compressImage(imageUri, 0.7);
    
    // FormData 생성
    const formData = new FormData();
    formData.append('file', {
      uri: compressedUri, // 압축된 이미지 사용
      type: 'image/jpeg',
      name: `proof_${Date.now()}.jpg`,
    });
    
    // 업로드...
  }
}
```

#### 테스트 항목
- [ ] 원본 이미지 크기 vs 압축 후 크기 비교
- [ ] 업로드 시간 측정 (압축 전/후)
- [ ] 이미지 품질 확인 (육안 검사)
- [ ] 다양한 해상도 테스트 (4K, FHD, HD)

---

### 3. 스터디 선택 기능 구현
**우선순위:** 🟡 MEDIUM  
**예상 시간:** 3-4시간  
**위치:** `app/(tabs)/(certified)/index.tsx`

#### 현재 문제
```typescript
// 🚨 문제: 첫 번째 스터디만 하드코딩으로 선택됨
const currentStudy = studiesData?.joinStudyInfos?.[0];
const studyToken = currentStudy?.studyToken;
```

**사용자가 여러 스터디에 참여 중일 때 다른 스터디 선택 불가능!**

#### 구현 방안

**방법 1: 드롭다운 (추천)**
```typescript
import { Picker } from '@react-native-picker/picker';

const [selectedStudyToken, setSelectedStudyToken] = useState<string>('');

<Picker
  selectedValue={selectedStudyToken}
  onValueChange={(value) => setSelectedStudyToken(value)}
>
  {studiesData?.joinStudyInfos?.map((study) => (
    <Picker.Item 
      key={study.studyToken}
      label={study.studyName} 
      value={study.studyToken} 
    />
  ))}
</Picker>
```

**방법 2: 커스텀 드롭다운 (디자인 자유도 높음)**
```typescript
// components/molecules/StudySelector.tsx
export const StudySelector = ({ studies, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Pressable onPress={() => setIsOpen(!isOpen)}>
      <SelectedStudyView>
        <Typography>{selectedStudy?.studyName}</Typography>
        <ArrowIcon />
      </SelectedStudyView>
      
      {isOpen && (
        <DropdownList>
          {studies.map((study) => (
            <StudyItem onPress={() => handleSelect(study)}>
              <Typography>{study.studyName}</Typography>
            </StudyItem>
          ))}
        </DropdownList>
      )}
    </Pressable>
  );
};
```

#### 추가 기능: 선택 상태 저장
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// 저장
const saveSelectedStudy = async (studyToken: string) => {
  await AsyncStorage.setItem('lastSelectedStudyToken', studyToken);
};

// 복원
useEffect(() => {
  AsyncStorage.getItem('lastSelectedStudyToken').then((token) => {
    if (token) setSelectedStudyToken(token);
  });
}, []);
```

#### 테스트 항목
- [ ] 드롭다운 열기/닫기
- [ ] 스터디 선택 시 회차 정보 업데이트
- [ ] 선택 상태 AsyncStorage 저장
- [ ] 앱 재시작 후 마지막 선택 복원
- [ ] 스터디 없을 때 빈 상태 처리

---

### 4. 평가하기 페이지 제작
**우선순위:** 🟡 MEDIUM  
**예상 시간:** 4-5시간  
**위치:** `app/(tabs)/(my)/manage/[token]/evaluation.tsx` (신규 생성)

#### 현재 상태
```typescript
// member-detail.tsx (Line 115)
<Button onPress={() => {
  // TODO: [프론트엔드] 평가하기 페이지 제작
  // router.push(`/(tabs)/(my)/manage/${token}/evaluation?avartarToken=${avartarToken}`);
}}>
  평가하기
</Button>
```

#### API 명세
```
POST /api/v1/evaluation
스터디원 평가 API - 인증 필수
✅ 백엔드 구현 완료
```

#### 페이지 구조
```typescript
// app/(tabs)/(my)/manage/[token]/evaluation.tsx
export default function EvaluationPage() {
  const { token } = useLocalSearchParams(); // studyToken
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  
  return (
    <ManageView>
      {/* 1. 평가 대상자 정보 */}
      <ProfileSection>
        <Avatar source={{ uri: memberData?.profileImage }} />
        <Typography variant="heading3">{memberData?.nickname}</Typography>
      </ProfileSection>
      
      {/* 2. 별점 입력 (1-5점) */}
      <RatingSection>
        <Typography variant="subtitle1">평가 점수</Typography>
        <StarRating value={rating} onChange={setRating} />
      </RatingSection>
      
      {/* 3. 코멘트 입력 (선택사항) */}
      <CommentSection>
        <Typography variant="subtitle1">코멘트 (선택)</Typography>
        <TextInput
          multiline
          maxLength={500}
          value={comment}
          onChangeText={setComment}
          placeholder="스터디원에 대한 평가를 작성해주세요."
        />
        <Typography variant="caption">
          {comment.length}/500
        </Typography>
      </CommentSection>
      
      {/* 4. 제출 버튼 */}
      <Button 
        variant="contained" 
        onPress={handleSubmit}
        disabled={rating === 0}
      >
        평가 제출
      </Button>
    </ManageView>
  );
}
```

#### API 연동
```typescript
// hooks/useEvaluation.ts (신규 생성)
import { useMutation } from '@tanstack/react-query';

export const useSubmitEvaluation = () => {
  return useMutation({
    mutationFn: async (data: {
      targetAvatarToken: string;
      rating: number;
      comment?: string;
    }) => {
      const response = await API.post('/evaluation', data);
      return response.data;
    },
    onSuccess: () => {
      Alert.alert('평가 완료', '평가가 성공적으로 제출되었습니다.');
    },
    onError: (error) => {
      Alert.alert('평가 실패', '평가 제출에 실패했습니다.');
    },
  });
};
```

#### 컴포넌트: 별점 입력
```typescript
// components/atoms/StarRating.tsx (신규 생성)
export const StarRating = ({ value, onChange, max = 5 }) => {
  return (
    <StarContainer>
      {Array.from({ length: max }).map((_, index) => (
        <Pressable key={index} onPress={() => onChange(index + 1)}>
          <StarIcon filled={index < value} />
        </Pressable>
      ))}
    </StarContainer>
  );
};
```

#### 테스트 항목
- [ ] 평가 대상자 정보 표시
- [ ] 별점 선택 (1-5점)
- [ ] 코멘트 입력 (500자 제한)
- [ ] 평가 제출 성공
- [ ] 중복 평가 방지 (이미 평가한 경우)
- [ ] 제출 후 이전 페이지로 이동
- [ ] 별점 미입력 시 버튼 비활성화

---

### 5. 관리자 기능 UI 연동
**우선순위:** 🟡 MEDIUM  
**예상 시간:** 2-3시간  
**위치:** `app/(tabs)/(my)/manage/[token]/member-detail.tsx`

#### 연동할 기능

**1. 출석 상태 변경**
```typescript
// hooks/useAttendance.ts 수정
export const useUpdateAttendance = () => {
  return useMutation({
    mutationFn: async ({
      studyToken,
      meetingNo,
      attendanceId,
      data,
    }: {
      studyToken: string;
      meetingNo: number;
      attendanceId: number;
      data: {
        targetAvatarToken: string;
        status: 'PRESENT' | 'LATENESS' | 'ABSENT';
      };
    }) => {
      const response = await API.patch(
        `/study/${studyToken}/meetings/${meetingNo}/attendance/${attendanceId}`,
        data
      );
      return response.data;
    },
  });
};
```

**2. 인증 승인/반려**
```typescript
// hooks/useProof.ts 수정
export const useUpdateProofStatus = () => {
  return useMutation({
    mutationFn: async ({
      studyToken,
      meetingNo,
      proofId,
      approved,
    }: {
      studyToken: string;
      meetingNo: number;
      proofId: number;
      approved: boolean;
    }) => {
      const response = await API.patch(
        `/study/${studyToken}/meetings/${meetingNo}/proofs/${proofId}`,
        { approved }
      );
      return response.data;
    },
  });
};
```

**3. member-detail.tsx 적용**
```typescript
// 출석 상태 변경 모달
const handleAttendanceUpdate = () => {
  const statusMap = ['PRESENT', 'LATENESS', 'ABSENT'];
  
  updateAttendance.mutate({
    studyToken: token,
    meetingNo: selectedMeetingNo,
    attendanceId: selectedAttendanceId,
    data: {
      targetAvatarToken: avartarToken,
      status: statusMap[selectedChip],
    },
  }, {
    onSuccess: () => {
      Alert.alert('변경 완료', '출석 상태가 변경되었습니다.');
      attendenceToggleModal();
      refetch(); // 데이터 다시 불러오기
    },
  });
};
```

#### 테스트 항목
- [ ] 출석 상태 변경 (출석/지각/결석)
- [ ] 인증 승인
- [ ] 인증 반려
- [ ] 변경 후 화면 업데이트
- [ ] 에러 처리 (권한 없음, 네트워크 에러)

---

## 🟢 선택 작업 (여유 있을 때)

### 6. MediaTypeOptions deprecated 경고 해결
**우선순위:** 🟢 LOW  
**예상 시간:** 10분

#### 경고 메시지
```
WARN [expo-image-picker] `ImagePicker.MediaTypeOptions` have been deprecated. 
Use `ImagePicker.MediaType` or an array of `ImagePicker.MediaType` instead.
```

#### 수정 방법
```typescript
// ❌ 기존 (deprecated)
const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
});

// ✅ 수정
const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ['images'], // 또는 ImagePicker.MediaType.Images
});
```

#### 수정 위치
- `utils/imageUpload.ts` (Line 48, 75)
- `components/molecules/ProofModal/index.tsx`
- `app/(tabs)/(my)/myinfo/account-info.tsx`

---

### 7. 안드로이드 로그인 처리
**우선순위:** 🟢 LOW  
**예상 시간:** 2-3시간

#### 현재 상태
```typescript
// app/index.tsx (Line 10)
// TODO: 안드로이드용 토큰 저장

// components/organisms/CTA/SignInCTA.tsx (Line 12)
// TODO: 안드로이드 로그인 처리
```

#### 작업 내용
- iOS Keychain 방식 적용됨
- Android SharedPreferences 또는 Keychain 적용 필요
- `expo-secure-store` 또는 `react-native-keychain` 사용

---

### 8. 스터디장 위임 기능
**우선순위:** 🟢 LOW  
**예상 시간:** 1-2시간

#### 위치
`app/(tabs)/(my)/manage/[token]/member-detail.tsx`

```typescript
<Chip 
  variant="simple" 
  value="스터디장 위임하기" 
  onPress={entrustToggleModal} 
/>
```

#### 구현 내용
- 확인 모달 추가
- API 연동 (백엔드 확인 필요)
- 성공 시 스터디 목록으로 이동

---

### 9. 강퇴하기 기능
**우선순위:** 🟢 LOW  
**예상 시간:** 1시간

#### 위치
`app/(tabs)/(my)/manage/[token]/member-detail.tsx`

```typescript
<Button 
  variant="outlined" 
  onPress={() => setIsForcedOutModalVisible(true)}
>
  강퇴하기
</Button>
```

#### 구현 내용
- 확인 모달 추가
- 강퇴 사유 입력 (선택)
- API 연동 (백엔드 확인 필요)

---

## 📊 작업 우선순위 요약

| 순위 | 작업 | 예상 시간 | 중요도 | 난이도 |
|------|------|-----------|--------|--------|
| 🔴 1 | 이미지 업로드 테스트 | 1-2시간 | CRITICAL | ⭐ |
| 🟡 2 | 이미지 압축 구현 | 1-2시간 | HIGH | ⭐⭐ |
| 🟡 3 | 스터디 선택 기능 | 3-4시간 | MEDIUM | ⭐⭐⭐ |
| 🟡 4 | 평가하기 페이지 | 4-5시간 | MEDIUM | ⭐⭐⭐ |
| 🟡 5 | 관리자 기능 연동 | 2-3시간 | MEDIUM | ⭐⭐ |
| 🟢 6 | MediaType 경고 해결 | 10분 | LOW | ⭐ |
| 🟢 7 | 안드로이드 로그인 | 2-3시간 | LOW | ⭐⭐⭐ |
| 🟢 8 | 스터디장 위임 | 1-2시간 | LOW | ⭐⭐ |
| 🟢 9 | 강퇴하기 | 1시간 | LOW | ⭐ |

**총 예상 시간:** 15-22시간 (약 2-3주 스프린트)

---

## 🎯 추천 작업 순서

### Week 1: 핵심 기능 안정화
1. ✅ **이미지 업로드 테스트** (1-2시간)
2. ✅ **이미지 압축 구현** (1-2시간)
3. ✅ **MediaType 경고 해결** (10분)

### Week 2: 사용자 경험 개선
4. 🔄 **스터디 선택 기능** (3-4시간)
5. 🔄 **평가하기 페이지** (4-5시간)

### Week 3: 관리자 기능 완성
6. 🔄 **관리자 기능 연동** (2-3시간)
7. 🔄 **스터디장 위임** (1-2시간)
8. 🔄 **강퇴하기** (1시간)

### 추후: 플랫폼 확장
9. 🔄 **안드로이드 로그인 처리** (2-3시간)

---

## 📝 체크리스트

### 오늘 해야 할 일 (긴급)
- [ ] 이미지 업로드 전체 플로우 테스트
- [ ] 에러 케이스 확인 및 수정
- [ ] 로딩 상태 UI 개선

### 이번 주 목표 (중요)
- [ ] 이미지 압축 기능 구현
- [ ] 스터디 선택 드롭다운 추가
- [ ] 평가하기 페이지 80% 완성

### 다음 주 목표 (선택)
- [ ] 관리자 기능 UI 연동
- [ ] 스터디장 위임/강퇴 기능

---

## 💡 개발 팁

### 디버깅 명령어
```bash
# Metro 재시작
npm start -- --reset-cache

# iOS 시뮬레이터 재시작
i (Metro에서)

# Android 에뮬레이터 재시작
a (Metro에서)

# 빌드 에러 시
rm -rf node_modules
npm install
```

### 유용한 도구
```bash
# API 테스트
curl -X POST http://localhost:8080/api/v1/proof/files \
  -H "Content-Type: multipart/form-data" \
  -F "file=@test.jpg"

# 이미지 크기 확인
ls -lh /path/to/image.jpg

# AsyncStorage 확인
# React Native Debugger > AsyncStorage 탭
```

---

## 🎉 완료 시 체크포인트

모든 작업 완료 후 확인할 사항:

- [ ] 모든 테스트 케이스 통과
- [ ] 에러 처리 완료
- [ ] 로딩 상태 표시
- [ ] 코드 리뷰 완료
- [ ] 문서 업데이트
- [ ] CHANGELOG.md 작성
- [ ] PR 생성 및 머지

---

**Good Luck! 🚀**
