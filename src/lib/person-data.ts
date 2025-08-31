export interface PersonData {
  id: string
  hash: string
  name: string
  position: string
  company: string
  email: string
  phone: string
  avatar?: string
}

const PEOPLE_DATA: PersonData[] = [
  {
    id: "alejandra",
    hash: "56aee302-ca",
    name: "Alejandra Suárez Barrera",
    position: "Asistente Comercial",
    company: "Asul Tecnologías de información SAS",
    email: "alejandra.suarez@asul-ti.com",
    phone: "+573504576448",
  },
  {
    id: "alejandro",
    hash: "56aee302-cb",
    name: "Alejandro Suárez Lozano",
    position: "Gerente General",
    company: "Asul Tecnologías de información SAS",
    email: "alejandro.suarez@asul-ti.com",
    phone: "+573006160201",
  },
  {
    id: "luz",
    hash: "56aee302-cc",
    name: "Luz Miryan Barrera Díaz",
    position: "Gerente Comercial",
    company: "Asul Tecnologías de información SAS",
    email: "luz.barrera@asul-ti.com",
    phone: "+573006160200",
  },
]

export function getPersonData(id: string, hash?: string): PersonData | null {
  const person = PEOPLE_DATA.find((p) => p.id === id)

  if (!person) return null

  // If hash is provided, validate it
  if (hash && person.hash !== hash) {
    return null
  }

  return person
}

export function getAllPeople(): PersonData[] {
  return PEOPLE_DATA
}

export function generateCardUrl(person: PersonData, baseUrl = ""): string {
  return `${baseUrl}/card/${person.id}?h=${person.hash}`
}
