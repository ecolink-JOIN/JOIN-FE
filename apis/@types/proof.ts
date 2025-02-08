/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace ProofResponse {
  export interface GetProof extends Shared.HttpResponse {
    data: {
      proofStatusResponse: string;
      provenTime: Date;
    };
  }
}

declare namespace ProofRequest {
  export interface PostProof {
    proofType: string;
    proofPhotoUrl: string;
    provenDate: Date;
  }
}
