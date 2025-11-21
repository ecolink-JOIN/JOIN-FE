/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace ProofResponse {
  export interface GetProof extends Shared.HttpResponse {
    data: {
      proofId: number;
      proofType: ProofType;
      proofStatus: ProofStatus;
      proofPhotoUrl: string | null;
      provenTime: string; // ISO 8601 format
      rejectedReason: string | null;
    };
  }

  export interface ProofList extends Shared.HttpResponse {
    data: ProofItem[];
  }

  export interface ProofItem {
    proofId: number;
    avatarToken: string;
    avatarNickname: string;
    proofType: ProofType;
    proofStatus: ProofStatus;
    proofPhotoUrl: string | null;
    provenTime: string;
  }

  export interface CreateProofResponse extends Shared.HttpResponse {
    data: {
      proofId: number;
    };
  }

  // 인증 상세 조회 응답
  export interface ProofDetail extends Shared.HttpResponse {
    data: {
      proofId: number;
      proofPhotoUrl: string;
      provenTime: string; // ISO 8601 format
    };
  }

  // 사용자별 인증 목록 응답
  export interface UserProofs extends Shared.HttpResponse {
    data: {
      studyToken: string;
      avatar: {
        avatarToken: string;
        nickname: string;
        profileUrl: string;
      };
      proofs: {
        proofId: number;
        meetingNo: number;
        proofType: ProofType;
        proofStatus: ProofStatus;
        proofPhotoUrl: string | null;
        provenTime: string;
      }[];
    };
  }

  // 인증 대상 조회 응답
  export interface ProofSubjects extends Shared.HttpResponse {
    data: {
      studyToken: string;
      subjects: {
        avatarToken: string;
        nickname: string;
        profileImageUrl: string;
        hasProof: boolean;
      }[];
    };
  }

  export type ProofType = 'PHOTO' | 'TIMER';
  export type ProofStatus =
    | 'PENDING' // 승인 대기
    | 'APPROVED' // 승인 완료
    | 'REJECTED' // 반려
    | 'NOT_SUBMITTED'; // 미제출
}

declare namespace ProofRequest {
  export interface PostProof {
    proofType: ProofResponse.ProofType;
    proofPhotoUrl: string; // S3 URL or Base64
    provenDate: string; // ISO 8601 format (YYYY-MM-DDTHH:mm:ss)
  }

  export interface ApproveProof {
    proofId: number;
  }

  export interface RejectProof {
    proofId: number;
    rejectedReason: string;
  }
}
