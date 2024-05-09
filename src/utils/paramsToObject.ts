import { URLSearchParams } from 'url'

interface NextRequest {
  nextUrl: URL
}

export function paramsToObject(req: NextRequest) {
  const params = new URLSearchParams(req.nextUrl.search)

  const obj: Record<string, string> = {}

  // Convert the iterable result to an array
  const entriesArray = Array.from(params.entries())

  for (const [key, value] of entriesArray) {
    obj[key] = value
  }
  return obj
}
