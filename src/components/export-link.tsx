import React, { useRef } from 'react'
import QrCode from 'react-qrcode-svg'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { Input } from './ui/input'

export function ExportLink() {
  const link = 'https://example.com/form' // Substitua pelo seu link dinâmico
  const qrCodeRef = useRef<SVGSVGElement>(null)

  const handleDownloadQRCode = () => {
    if (!qrCodeRef.current) return

    const svgElement = qrCodeRef.current
    const svgData = new XMLSerializer().serializeToString(svgElement)
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'qrcode.svg'
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Compartilhar</Button>
      </DialogTrigger>
      <DialogContent className="flex w-64 min-w-[400px] flex-col items-center p-4">
        <div className="mb-4 flex flex-col justify-center">
          <QrCode
            data="https://github.com/dral/react-qrcode-svg"
            height="300"
            width="300"
            fgColor="#000"
            bgColor="#fff"
          />
          <Button onClick={handleDownloadQRCode} variant="outline">
            Baixar QR Code
          </Button>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <Input
            type="text"
            readOnly
            value={link}
            className="w-full rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={() => navigator.clipboard.writeText(link)}>
            Copiar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
