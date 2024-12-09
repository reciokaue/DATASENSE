import { QRCodeSVG } from 'qrcode.react'
import React, { useRef } from 'react'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ExportLinkProps {
  formId: number | string
}

export function ExportLink({ formId }: ExportLinkProps) {
  const link = `${process.env.NEXT_PUBLIC_APP_URL}/answer/${formId}`
  const qrCodeRef = useRef<SVGSVGElement>(null)

  // Função para baixar como SVG
  const downloadQrCodeAsSvg = () => {
    const svgElement = qrCodeRef.current
    if (!svgElement) {
      toast.error('Erro ao gerar o SVG do QR Code.')
      return
    }

    const serializer = new XMLSerializer()
    const svgData = serializer.serializeToString(svgElement)
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const downloadLink = document.createElement('a')
    downloadLink.href = url
    downloadLink.download = 'qrcode.svg'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)

    URL.revokeObjectURL(url)
    toast.success('QR Code SVG baixado com sucesso!')
  }

  // Função para baixar como PNG
  const downloadQrCodeAsPng = async () => {
    const svgElement = qrCodeRef.current
    if (!svgElement) {
      toast.error('Erro ao gerar o PNG do QR Code.')
      return
    }

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const svgData = new XMLSerializer().serializeToString(svgElement)

    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const svgUrl = URL.createObjectURL(svgBlob)

    const image = new Image()
    image.onload = () => {
      canvas.width = image.width
      canvas.height = image.height
      context?.drawImage(image, 0, 0)
      URL.revokeObjectURL(svgUrl)

      const pngUrl = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.href = pngUrl
      downloadLink.download = 'qrcode.png'
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)

      toast.success('QR Code PNG baixado com sucesso!')
    }
    image.src = svgUrl
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
          ref={qrCodeRef}
          value={link}
          height="300"
          width="300"
          fgColor="#000"
          bgColor="#fff"
        />
        <Label className="self-start">Fazer download</Label>
        <div className="flex w-full gap-2">
          <Button
            onClick={downloadQrCodeAsSvg}
            variant="outline"
            className="w-full"
          >
            SVG
          </Button>
          <Button
            onClick={downloadQrCodeAsPng}
            variant="outline"
            className="w-full"
          >
            PNG
          </Button>
        </div>
        <div className="flex w-full items-center justify-between gap-2">
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
