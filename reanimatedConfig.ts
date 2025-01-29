import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

// Reanimated Logger 설정
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn, // 경고 레벨로 설정
  strict: false, // Strict Mode 비활성화
});
