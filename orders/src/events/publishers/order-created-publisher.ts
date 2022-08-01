import { Publisher, OrderCreatedEvent, Subjects } from "@zamicro/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
