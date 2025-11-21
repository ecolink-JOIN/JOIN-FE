/**
 * 날짜 포맷 유틸리티
 */

/**
 * 현재 시간을 ISO 8601 형식으로 반환
 * @returns YYYY-MM-DDTHH:mm:ss
 */
export const getCurrentISOString = (): string => {
  return new Date().toISOString().slice(0, 19); // 2024-01-01T12:00:00
};

/**
 * Date를 ISO 8601 형식으로 변환
 */
export const toISOString = (date: Date): string => {
  return date.toISOString().slice(0, 19);
};

/**
 * YYYY-MM-DD 형식으로 날짜 반환
 */
export const formatDateOnly = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * HH:mm 형식으로 시간 반환
 */
export const formatTimeOnly = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * YYYY.MM.DD HH:mm 형식으로 변환
 */
export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

/**
 * MM/DD(요일) HH:mm 형식으로 변환
 */
export const formatDateTimeShort = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];
  return `${month}/${day}(${dayOfWeek}) ${hours}:${minutes}`;
};

/**
 * 두 시간 사이의 차이 계산 (분 단위)
 */
export const getTimeDifferenceInMinutes = (start: Date | string, end: Date | string): number => {
  const startDate = typeof start === 'string' ? new Date(start) : start;
  const endDate = typeof end === 'string' ? new Date(end) : end;
  return Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60));
};

/**
 * 시간이 특정 범위 내에 있는지 확인
 */
export const isWithinTimeRange = (current: Date | string, start: Date | string, end: Date | string): boolean => {
  const currentTime = typeof current === 'string' ? new Date(current).getTime() : current.getTime();
  const startTime = typeof start === 'string' ? new Date(start).getTime() : start.getTime();
  const endTime = typeof end === 'string' ? new Date(end).getTime() : end.getTime();
  return currentTime >= startTime && currentTime <= endTime;
};

/**
 * 날짜가 오늘인지 확인
 */
export const isToday = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return (
    d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate()
  );
};

/**
 * 상대 시간 표시 (방금, n분 전, n시간 전 등)
 */
export const getRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) return '방금';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}일 전`;

  return formatDateTime(d);
};
