"use client"

import type { PersonData } from "@/src/lib/person-data"
import { generateCardUrl } from "@/src/lib/person-data"
import { generateVCard, downloadVCard } from "@/src/lib/vcard-utils"

import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Download, QrCode, Mail, Phone, Share2, ExternalLink } from "lucide-react"
import { QRCodeGenerator } from "./qr-code-generator"
import { useState } from "react"

interface SmartCardProps {
  person: PersonData
}

export function SmartCard({ person }: SmartCardProps) {
  const [showQR, setShowQR] = useState(false)
  const [showShareQR, setShowShareQR] = useState(false)

  const cardUrl = generateCardUrl(person, typeof window !== "undefined" ? window.location.origin : "")

  const handleDownloadContact = () => {
    const vCard = generateVCard(person)
    downloadVCard(vCard, `${person.name.replace(/\s+/g, "_")}.vcf`)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${person.name} - ${person.position}`,
          text: `Contacto de ${person.name}`,
          url: cardUrl,
        })
      } catch (err) {
        console.log("Error sharing:", err)
        setShowShareQR(true)
      }
    } else {
      setShowShareQR(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        {/* Header with space background */}
        <div className="space-gradient text-white text-center py-8 px-6 rounded-t-2xl relative overflow-hidden">
          <h1 className="text-2xl font-bold tracking-wider mb-8">SMARTCARD</h1>

          {/* Logo Circle */}
          <div className="w-24 h-24 bg-black rounded-full mx-auto mb-6 flex items-center justify-center relative">
            <div className="flex items-center justify-center space-x-2">
              <QrCode className="w-6 h-6 text-white" />
              <div className="w-6 h-6 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Person Info */}
          <h2 className="text-xl font-bold mb-2 text-balance">{person.name}</h2>
          <p className="text-lg mb-2 opacity-90">{person.position}</p>
          <p className="text-sm opacity-80 text-balance">{person.company}</p>
        </div>

        {/* Card Body */}
        <Card className="rounded-t-none rounded-b-2xl border-t-0 p-6 space-y-6">
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="flex items-center gap-2 py-3 bg-transparent"
              onClick={handleDownloadContact}
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Descargar</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 py-3 bg-transparent"
              onClick={() => setShowQR(!showQR)}
            >
              <QrCode className="w-4 h-4" />
              <span className="text-sm">Escanear QR</span>
            </Button>
          </div>

          {/* QR Code Display */}
          {showQR && (
            <div className="flex justify-center py-4">
              <QRCodeGenerator value={cardUrl} size={200} />
            </div>
          )}

          {/* Contact Methods */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center text-muted-foreground">Metodos de Contacto</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <a href={`mailto:${person.email}`} className="text-foreground hover:text-accent transition-colors">
                  {person.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <a href={`tel:${person.phone}`} className="text-foreground hover:text-accent transition-colors">
                  {person.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Share Button */}
          <div className="pt-4 border-t space-y-0.5">
            <Button onClick={handleShare} className="w-full flex items-center gap-2" variant="default">
              <Share2 className="w-4 h-4" />
              Compartir Tarjeta
            </Button>
            <Button
              onClick={() => window.location.href = "https://asul-ti.com"}
              className="w-full flex items-center gap-2"
              variant="default"
            >
              <ExternalLink className="w-4 h-4" />
              Ir al Sitio Web
            </Button>
          </div>

          {/* Share QR Modal */}
          {showShareQR && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <Card className="p-6 max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4 text-center">Compartir Tarjeta</h3>
                <div className="flex justify-center mb-4">
                  <QRCodeGenerator value={cardUrl} size={200} />
                </div>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Escanea este código QR para acceder a la tarjeta
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => navigator.clipboard.writeText(cardUrl)}
                  >
                    Copiar Enlace
                  </Button>
                  <Button variant="default" className="flex-1" onClick={() => setShowShareQR(false)}>
                    Cerrar
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </Card>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">Versión 1.0.0</p>
        </div>
      </div>
    </div>
  )
}
