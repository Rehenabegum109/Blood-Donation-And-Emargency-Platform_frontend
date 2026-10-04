export type PaymentMethod = "BKASH";

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

export type BloodGroup =
  | "A_POSITIVE"
  | "A_NEGATIVE"
  | "B_POSITIVE"
  | "B_NEGATIVE"
  | "AB_POSITIVE"
  | "AB_NEGATIVE"
  | "O_POSITIVE"
  | "O_NEGATIVE";

export type UrgencyLevel =
  | "LOW"
  | "NORMAL"
  | "HIGH"
  | "CRITICAL";

export type BloodRequestStatus =
  | "PENDING"
  | "FULFILLED"
  | "CANCELLED"
  | "EXPIRED";

export interface IPaymentBloodRequest {
  id: string;
  bloodGroup: BloodGroup;
  units: number;
  hospitalName: string;
  hospitalAddress?: string | null;
  requiredDate: string;
  urgency: UrgencyLevel;
  status: BloodRequestStatus;
}

export interface IPaymentRecipient {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
}

export interface IPayment {
  id: string;
  bloodRequestId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string | null;
  bkashPaymentId?: string | null;
  receiptPdfUrl?: string | null;
  paidAt?: string | null;
  createdAt: string;
  updatedAt: string;

  bloodRequest: IPaymentBloodRequest & {
    recipient?: IPaymentRecipient;
  };
}

export interface IInitiatePaymentPayload {
  bloodRequestId: string;
}

export interface IInitiatePaymentResponse {
  success?: boolean;
  message?: string;
  data: {
    payment: IPayment;
    paymentID: string;
    paymentUrl: string;
  };
}

export interface IExecutePaymentResponse {
  success?: boolean;
  message?: string;
  data: IPayment | {
    transactionStatus?: string;
    trxID?: string;
    [key: string]: unknown;
  };
}

export type PaymentCallbackStatus =
  | "success"
  | "failure"
  | "cancel";

export interface IPaymentCallbackResponse {
  success?: boolean;
  message?: string;
  data: IPayment | null;
}

export interface IPaymentMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IGetMyPaymentsParams {
  page?: number;
  limit?: number;
  status?: PaymentStatus;
  method?: PaymentMethod;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IGetAllPaymentsParams
  extends IGetMyPaymentsParams {
  recipientEmail?: string;
}

export interface IGetMyPaymentsResponse {
  success: boolean;
  message: string;
  data: IPayment[];
  meta: IPaymentMeta;
}

export interface IGetAllPaymentsResponse {
  success: boolean;
  message: string;
  data: IPayment[];
  meta: IPaymentMeta;
}

export interface IGetSinglePaymentResponse {
  success: boolean;
  message: string;
  data: IPayment;
}