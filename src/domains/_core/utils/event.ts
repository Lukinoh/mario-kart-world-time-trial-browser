export function is<T extends typeof HTMLElement>(event: EventTarget | null, type: T): event is InstanceType<T> {
  return event instanceof type;
}

export function targetFromEvent<T extends typeof HTMLElement>(event: Event, expectedHTMLElement: T): InstanceType<T> {
  if (is(event.target, expectedHTMLElement)) {
    return event.target;
  }

  throw new Error(`The event does not target an element of type ${expectedHTMLElement.name}.`);
}
