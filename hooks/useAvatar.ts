import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/apis/service/user';

/**
 * 아바타 상세 정보 조회 Hook
 * @param avatarToken - 조회할 아바타 토큰
 * @param enabled - 쿼리 활성화 여부 (기본값: true)
 */
export const useAvatarDetail = (avatarToken: string, enabled = true) => {
  return useQuery({
    queryKey: ['avatar-detail', avatarToken],
    queryFn: () => UserService().getAvatarDetail(avatarToken),
    enabled: enabled && !!avatarToken,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
