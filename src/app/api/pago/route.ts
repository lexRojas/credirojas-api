import { NextRequest } from 'next/server'
import { createHandler, listHandler } from '@/lib/crud'

export async function GET(req: NextRequest) {
  return listHandler(req, 'pago', { idPago: 'desc' })
}

export async function POST(req: NextRequest) {
  return createHandler(req, 'pago')
}
