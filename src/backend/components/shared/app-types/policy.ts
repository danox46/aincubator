import { z } from "zod";

export enum ContentType {
  Public = "public",
  Draft = "draft",
  Private = "private",
}

export enum UserRole {
  Standard = "standard",
  Admin = "admin",
}

export enum PaymentPlan {
  Free = "free",
  Premium = "premium",
}

interface IAppObjectPolicy {
  getContetType(): ContentType;
  setContentType(contentType: ContentType): void;
  getPaymentPlan(): PaymentPlan;
  setPaymentPlan(paymentPlan: PaymentPlan): void;
}

export class AppObjectPolicy implements IAppObjectPolicy {
  #contentType: ContentType;
  #paymentPlan: PaymentPlan;

  constructor(contentType: ContentType, paymentPlan: PaymentPlan) {
    this.#contentType = contentType;
    this.#paymentPlan = paymentPlan;
  }

  getContetType = () => {
    return this.#contentType;
  };
  setContentType = (contentType: ContentType) => {
    this.#contentType = contentType;
  };
  getPaymentPlan = () => {
    return this.#paymentPlan;
  };
  setPaymentPlan = (paymentPlan: PaymentPlan) => {
    this.#paymentPlan = paymentPlan;
  };
}

export const UserPolicy = z.object({
  paymentPlan: z.nativeEnum(PaymentPlan),
  userRole: z.nativeEnum(UserRole),
});

export type UserPolicy = z.infer<typeof UserPolicy>;

export interface IUserPolicy {
  getUserRole(): UserRole;
  getPaymentPlan(): PaymentPlan;
  setPaymentPlan(paymentPlan: PaymentPlan): void;
}

export class AppUserPolicy implements IUserPolicy {
  #paymentPlan: PaymentPlan;
  #userRole: UserRole;

  constructor(paymentPlan: PaymentPlan) {
    this.#paymentPlan = paymentPlan;
    this.#userRole = UserRole.Standard;
  }

  getUserRole() {
    return this.#userRole;
  }
  getPaymentPlan() {
    return this.#paymentPlan;
  }
  setPaymentPlan(paymentPlan: PaymentPlan) {
    this.#paymentPlan = paymentPlan;
  }
}
