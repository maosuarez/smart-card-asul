"use client"

import { getAllPeople, generateCardUrl } from "@/src/lib/person-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { QRCodeGenerator } from "@/src/components/qr-code-generator"
import Link from "next/link"

export default function AdminPage() {
  const people = getAllPeople()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Panel de Administración - Tarjetas Digitales</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {people.map((person) => {
            const cardUrl = generateCardUrl(person, baseUrl)

            return (
              <Card key={person.id} className="overflow-hidden">
                <CardHeader className="space-gradient text-white">
                  <CardTitle className="text-lg text-center">{person.name}</CardTitle>
                  <p className="text-center opacity-90">{person.position}</p>
                </CardHeader>

                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-center">
                    <QRCodeGenerator value={cardUrl} size={150} />
                  </div>

                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Email:</strong> {person.email}
                    </p>
                    <p>
                      <strong>Teléfono:</strong> {person.phone}
                    </p>
                    <p>
                      <strong>Hash:</strong> {person.hash}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button asChild className="w-full">
                      <Link href={`/card/${person.id}?h=${person.hash}`}>Ver Tarjeta</Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => navigator.clipboard.writeText(cardUrl)}
                    >
                      Copiar URL
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto p-6">
            <h2 className="text-xl font-semibold mb-4">Instrucciones de Uso</h2>
            <div className="text-left space-y-2 text-sm text-muted-foreground">
              <p>• Cada tarjeta tiene un QR único con parámetro hash para seguridad</p>
              <p>• Los usuarios pueden descargar el contacto en formato vCard</p>
              <p>• Las tarjetas son completamente responsivas y profesionales</p>
              <p>• Acceso directo: /card/[id]?h=[hash]</p>
              <p>• Panel admin: /admin (esta página)</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
