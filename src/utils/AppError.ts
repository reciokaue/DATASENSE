export class AppError {
  message: string
  description: string
  error?: any

  constructor(message: string, description: string, error?: string) {
    this.message = message
    this.description = description
    this.error = error
  }
}
