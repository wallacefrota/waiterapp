export class ResourceNotFound extends Error {
  constructor(message: string) {
    super(),
    this.message = message,
    this.cause = "NotFound"
    this.name = "ResourceNotFound"
  }
}
