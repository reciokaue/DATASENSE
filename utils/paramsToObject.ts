/* eslint-disable prettier/prettier */
import { NextRequest } from 'next/server'

export function paramsToObject(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const obj = {};
  for (const [key, value] of params.entries()) {
      obj[key] = value;
  }
  return obj;
}