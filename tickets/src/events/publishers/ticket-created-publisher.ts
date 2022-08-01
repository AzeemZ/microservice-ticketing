import { Publisher, TicketCreatedEvent, Subjects } from "@zamicro/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
