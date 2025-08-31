"use client"

import { useEffect, useRef } from "react"

interface QRCodeGeneratorProps {
  value: string
  size?: number
  className?: string
}

export function QRCodeGenerator({ value, size = 200, className }: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Simple QR code placeholder - in production, use a proper QR library
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, size, size)

    // Draw QR pattern (simplified)
    ctx.fillStyle = "#000000"
    const moduleSize = size / 25

    // Create a simple QR-like pattern
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        // Create a pattern based on the value hash
        const hash = value.split("").reduce((a, b) => {
          a = (a << 5) - a + b.charCodeAt(0)
          return a & a
        }, 0)

        if ((i + j + hash) % 3 === 0 || (i < 7 && j < 7) || (i < 7 && j > 17) || (i > 17 && j < 7)) {
          ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize)
        }
      }
    }

    // Add finder patterns (corners)
    const drawFinderPattern = (x: number, y: number) => {
      ctx.fillStyle = "#000000"
      ctx.fillRect(x, y, moduleSize * 7, moduleSize * 7)
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(x + moduleSize, y + moduleSize, moduleSize * 5, moduleSize * 5)
      ctx.fillStyle = "#000000"
      ctx.fillRect(x + moduleSize * 2, y + moduleSize * 2, moduleSize * 3, moduleSize * 3)
    }

    drawFinderPattern(0, 0)
    drawFinderPattern(0, size - moduleSize * 7)
    drawFinderPattern(size - moduleSize * 7, 0)
  }, [value, size])

  return <canvas ref={canvasRef} width={size} height={size} className={`border rounded-lg ${className}`} />
}
