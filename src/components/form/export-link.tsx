import { QRCodeSVG } from 'qrcode.react'
import React, { useRef } from 'react'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { Input } from '../ui/input'

interface ExportLinkProps {
  formId: number | string
}

export function ExportLink({ formId }: ExportLinkProps) {
  const link = `${process.env.NEXT_PUBLIC_APP_URL}/answer/${formId}`
  const qrCodeRef = useRef<SVGSVGElement>(null)

  function handleDownloadQRCode() {
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

  function handleCopyLink() {
    navigator.clipboard.writeText(link)
    toast('Link copiado')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Compartilhar</Button>
      </DialogTrigger>
      <DialogContent className="flex w-64 min-w-[340px] flex-col items-center pt-10">
        <QRCodeSVG
          value="https://github.com/dral/react-qrcode-svg"
          height="300"
          width="300"
          fgColor="#000"
          bgColor="#fff"
        />
        <Button
          onClick={handleDownloadQRCode}
          variant="outline"
          className="w-full"
        >
          Baixar QR Code
        </Button>
        <div className="flex items-center justify-between gap-2">
          <Input type="text" readOnly value={link} />
          <Button onClick={handleCopyLink}>Copiar link</Button>
        </div>
        <Button
          link={`/answer/${formId}?view=true&backTo=/form/${formId}/config`}
          className="w-full"
        >
          Visualizar
        </Button>
      </DialogContent>
    </Dialog>
  )
}
