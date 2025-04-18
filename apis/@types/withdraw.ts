/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace WithdrawResponse {
  export interface RequestList extends Shared.HttpResponse {
    data: Request[];
  }
  export interface Request {
    withdrawId: number;
    nickname: string;
  }
}

declare namespace WithdrawRequest {
  export interface PostWithdraw {
    withdraw_type: 'APPROVAL_REQUIRED' | 'SELF_WITHDRAW';
    reason: string;
  }
}
