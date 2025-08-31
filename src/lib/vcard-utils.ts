import type { PersonData } from "./person-data"

export function generateVCard(person: PersonData): string {
  const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${person.name}
ORG:${person.company}
TITLE:${person.position}
EMAIL:${person.email}
TEL:${person.phone}
URL:${typeof window !== "undefined" ? window.location.origin : ""}/card/${person.id}?h=${person.hash}
END:VCARD`

  return vCard
}

export function downloadVCard(vCardContent: string, filename: string): void {
  const blob = new Blob([vCardContent], { type: "text/vcard;charset=utf-8" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}
