export class AppError {
  message: string
  description: string

  constructor(message: string, description: string) {
    this.message = message
    this.description = description
  }
}
