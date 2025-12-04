export class ResourceAlreadyExists extends Error {
  constructor(message: string) {
    super(),
    this.message = message,
    this.cause = "Conflict"
    this.name = "ResourceAlreadyExists"
  }
}
