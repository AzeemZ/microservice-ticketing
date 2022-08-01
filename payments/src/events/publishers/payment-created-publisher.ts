import { Publisher, Subjects, PaymentCreatedEvent } from "@zamicro/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
