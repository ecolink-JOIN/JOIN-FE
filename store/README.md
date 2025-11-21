# User Store (avatarToken 관리 시스템)

## 📋 개요
Zustand를 사용한 사용자 인증 정보 관리 시스템입니다.  
AsyncStorage를 통해 영구 저장되며, 앱 재시작 후에도 로그인 상태가 유지됩니다.

## 🏗️ 구조

### Store 위치
```
/store
  ├── userStore.ts    # 사용자 상태 관리
  └── index.ts        # Export
```

### State
```typescript
interface UserState {
  avatarToken: string | null;    // 사용자 식별자
  nickname: string | null;        // 닉네임
  profileUrl: string | null;      // 프로필 이미지 URL
}
```

## 🔧 사용법

### 1. Store Import
```typescript
import { useUserStore } from '@/store';
```

### 2. 상태 가져오기
```typescript
const { avatarToken, nickname, profileUrl } = useUserStore();
```

### 3. 액션 사용하기

#### 3.1 avatarToken만 설정
```typescript
const { setAvatarToken } = useUserStore();
setAvatarToken('avt_xxxxxxxxxx');
```

#### 3.2 전체 사용자 정보 설정
```typescript
const { setUserInfo } = useUserStore();
setUserInfo({
  avatarToken: 'avt_xxxxxxxxxx',
  nickname: '홍길동',
  profileUrl: 'https://...',
});
```

#### 3.3 로그아웃 (상태 초기화)
```typescript
const { clearUser } = useUserStore();
clearUser();
```

#### 3.4 인증 상태 확인
```typescript
const { isAuthenticated } = useUserStore();
const isLoggedIn = isAuthenticated(); // true/false
```

## 📱 자동 초기화

### 1. 로그인 시 자동 저장
`app/(auth)/oauth.tsx`에서 로그인 성공 시 자동으로 사용자 정보를 저장합니다.

```typescript
// oauth.tsx
const userInfo = await UserService().avatars();
setUserInfo({
  avatarToken: userInfo.avatarToken,
  nickname: userInfo.nickname,
  profileUrl: userInfo.image.url,
});
```

### 2. 앱 시작 시 자동 로드
`app/_layout.tsx`에서 앱 시작 시 토큰이 있으면 사용자 정보를 자동으로 불러옵니다.

```typescript
// _layout.tsx
useEffect(() => {
  const initializeUser = async () => {
    const token = await TokenStorage.getToken();
    if (token && !avatarToken) {
      const userInfo = await UserService().avatars();
      setUserInfo({ ... });
    }
  };
  initializeUser();
}, []);
```

### 3. 로그아웃 시 자동 초기화
`app/(tabs)/(my)/myinfo/account-info.tsx`에서 회원 탈퇴 시 자동으로 초기화됩니다.

```typescript
// account-info.tsx
AvatarsService()
  .logout()
  .finally(() => {
    clearUser(); // Store 초기화
    router.replace('/(auth)');
  });
```

## 🎯 실제 사용 예시

### 예시 1: 출석 현황 조회
```typescript
// member/[id]/my-attendance.tsx
import { useUserStore } from '@/store';

const MyAttendance = () => {
  const { avatarToken } = useUserStore();

  const { data } = useQuery({
    queryKey: ['attendance', studyToken, avatarToken],
    queryFn: () => StudyEnrollmentsService().getMemberAttendance(studyToken, avatarToken),
    enabled: !!avatarToken, // avatarToken이 있을 때만 실행
  });

  if (!avatarToken) {
    return <Text>로그인이 필요합니다</Text>;
  }

  return <View>...</View>;
};
```

### 예시 2: 프로필 표시
```typescript
const Profile = () => {
  const { nickname, profileUrl, isAuthenticated } = useUserStore();

  if (!isAuthenticated()) {
    return <Text>로그인해주세요</Text>;
  }

  return (
    <View>
      <Image source={{ uri: profileUrl }} />
      <Text>{nickname}</Text>
    </View>
  );
};
```

## ⚠️ 주의사항

### 1. avatarToken이 필요한 API 호출 시
반드시 `enabled` 옵션으로 avatarToken 존재 여부를 확인하세요.

```typescript
// ❌ 잘못된 예시
const { data } = useQuery({
  queryKey: ['data'],
  queryFn: () => api(avatarToken), // avatarToken이 null일 수 있음
});

// ✅ 올바른 예시
const { data } = useQuery({
  queryKey: ['data', avatarToken],
  queryFn: () => api(avatarToken!),
  enabled: !!avatarToken, // avatarToken이 있을 때만 실행
});
```

### 2. 컴포넌트에서 직접 avatarToken 확인
```typescript
const { avatarToken } = useUserStore();

if (!avatarToken) {
  return <Text>로그인이 필요합니다</Text>;
}

// 이후 로직 실행
```

### 3. AsyncStorage 지속성
- 앱 삭제 시: 데이터 삭제됨
- 앱 업데이트 시: 데이터 유지됨
- 앱 재시작 시: 데이터 유지됨

## 🔍 디버깅

### Store 상태 확인
```typescript
const state = useUserStore.getState();
console.log('Current state:', state);
```

### Store 직접 업데이트 (테스트용)
```typescript
useUserStore.setState({
  avatarToken: 'test_token',
  nickname: '테스트',
  profileUrl: 'https://...',
});
```

## 📦 의존성

```json
{
  "zustand": "^4.x.x",
  "@react-native-async-storage/async-storage": "^1.x.x"
}
```

## 🚀 다음 단계

1. ✅ avatarToken 관리 시스템 구축
2. ⬜ 다른 API에서 avatarToken 활용
3. ⬜ 인증 필요 페이지에 가드 추가
4. ⬜ 에러 처리 개선

---

**작성일**: 2025년 1월 10일  
**작성자**: GitHub Copilot
