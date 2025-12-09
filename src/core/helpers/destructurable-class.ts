export abstract class DestructurableClass {
  [key: string]: unknown;

  constructor() {
    for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      if (key !== "constructor" && typeof this[key] === "function") {
        this[key] = this[key].bind(this);
      }
    }
  }
}
