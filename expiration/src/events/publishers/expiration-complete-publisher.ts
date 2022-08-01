import { Publisher, Subjects, ExpirationCompleteEvent } from "@zamicro/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
