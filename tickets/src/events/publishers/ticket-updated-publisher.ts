import { Publisher, TicketUpdatedEvent, Subjects } from "@zamicro/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
