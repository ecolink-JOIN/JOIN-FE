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
